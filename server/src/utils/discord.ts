import axios from 'axios';
import queryString from 'querystring';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const getUserTokens = async (code: string) => {
  const payload = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    code,
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const { data }: any = await axios
      .post(
        `https://discord.com/api/oauth2/token?grant_type=authorization_code`,
        queryString.stringify({ ...payload }),
        config
      )
      .catch((error) => {
        console.error(error);
      });
    return data;
  } catch (error) {
    return null;
  }
};

const getDiscordUserInfo = async (code: string) => {
  const tokens = await getUserTokens(code);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.access_token}`,
    },
  };

  const { data }: any = await axios.get(
    'http://discordapp.com/api/users/@me',
    config
  );

  return {
    ...tokens,
    ...data,
  };
};

export { getDiscordUserInfo, getUserTokens };
