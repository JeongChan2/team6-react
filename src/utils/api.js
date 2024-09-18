import axios from "axios";
import { getAccessToken } from "./getAccessToken";

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
    const currentTime = new Date().getTime();

    // 토큰이 없거나 만료되었을 때만 새로운 토큰을 가져옴
    if (!accessToken || currentTime >= tokenExpiresAt) {
      const { token, expiresIn } = await getAccessToken();

      // 새로운 토큰과 만료 시간 저장
      saveTokenToStorage(token, expiresIn);
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
