import axios from "axios";

const Base_URL = 'https://accounts.spotify.com/api/token';

export const getAccessToken = async () => {
  const authParams = new URLSearchParams();

  authParams.append('grant_type', 'client_credentials');
  authParams.append('client_id', process.env.REACT_APP_CLIENT_ID);
  authParams.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);

  try {
    const response = await axios.post(Base_URL, authParams.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = response.data;
    const accessToken = data.access_token;
    const expiresIn = data.expires_in; // 토큰 유효 시간 (초 단위)
    console.log("getAccessToken : ",accessToken)
    return { token: accessToken, expiresIn };
  } catch (error) {
    console.log('Error fetching access token:', error);
  }
};
