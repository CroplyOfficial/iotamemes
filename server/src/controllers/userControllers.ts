import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getDiscordUserInfo } from '../utils/discord';
import User from '../models/User';

const createNewUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { code }: any = req.body;
    const userInfo = await getDiscordUserInfo(code).catch((error) => {
      throw error;
    });

    const userExists = await User.findOne({ discordId: userInfo.id }).catch(
      (error) => {
        throw new error();
      }
    );

    if (!userExists) {
      const user = await User.create({
        discordId: userInfo.id,
        username: userInfo.username,
        accessToken: userInfo.access_token,
        avatar: userInfo.avatar,
      });

      res.json(user);
    } else {
      throw new Error('User already exists');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Failed to authorize user');
  }
});

export { createNewUser };
