import axios from "axios";
import { getAccessToken } from "./getAccessToken";
import { getOAuthAccessToken } from "./getOAuthAccessToken";

let accessToken = null;
let tokenExpiresAt = null;

const loadTokenFromStorage = () => {
  const storedToken = localStorage.getItem("accessToken");
  const storedExpiry = localStorage.getItem("tokenExpiresAt");

  if (storedToken && storedExpiry) {
    accessToken = storedToken;
    tokenExpiresAt = parseInt(storedExpiry);
  }
};

const saveTokenToStorage = (token, expiresIn) => {
  const currentTime = new Date().getTime();
  const expiryTime = currentTime + expiresIn * 1000;

  localStorage.setItem("accessToken", token);
  localStorage.setItem("tokenExpiresAt", expiryTime.toString());

  accessToken = token;
  tokenExpiresAt = expiryTime;
};

loadTokenFromStorage();

const api = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    accept: "application/json",
  },
});





api.interceptors.request.use(
  
  async (config) => {
    const code = localStorage.getItem("code");
    const currentTime = new Date().getTime();

    
    if (code) {
      try {
        const { token, expiresIn } = await getOAuthAccessToken(code);
        saveTokenToStorage(token, expiresIn);
        localStorage.removeItem("code");
      } catch (error) {
        console.error("Failed to refresh token with code:", error);
        localStorage.removeItem("code");
      }
    } else {
      if (!accessToken || currentTime >= tokenExpiresAt) {
        try {
          const { token, expiresIn } = await getAccessToken();
          saveTokenToStorage(token, expiresIn);
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }
    }

    if (!accessToken || currentTime >= tokenExpiresAt) {
      localStorage.removeItem("code");
      try {
        const { token, expiresIn } = await getAccessToken();
        saveTokenToStorage(token, expiresIn);
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);










// 응답 인터셉터 추가하기
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
