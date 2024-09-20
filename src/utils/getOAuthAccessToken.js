import axios from "axios";

// Base URL for fetching the access token
const BASE_URL = 'https://accounts.spotify.com/api/token';

// Function to get the access token
export const getOAuthAccessToken = async (code) => {
  const authParams = new URLSearchParams();
  
  authParams.append('grant_type', 'authorization_code');
  authParams.append('code', code);
  // authParams.append('redirect_uri', 'http://localhost:3000/callback');
  authParams.append('redirect_uri', 'https://dev-radion-react-project.vercel.app/callback');
  authParams.append('client_id', process.env.REACT_APP_CLIENT_ID);
  authParams.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);

  console.log(authParams.toString());

  try {
    const response = await axios.post(BASE_URL, authParams.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    const data = response.data;
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    const expiresIn = data.expires_in;
    console.log("getOauth : ", accessToken)
    return { token: accessToken, refreshToken, expiresIn };
  } catch (error) {
    console.log('Error fetching access token:', error);
  }
};