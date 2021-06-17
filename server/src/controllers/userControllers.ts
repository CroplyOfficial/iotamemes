import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getDiscordUserInfo } from '../utils/discord';
import User, { UserType } from '../models/User';
import { tokenize } from '../utils/jwt';

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
      const user: UserType = await User.create({
        discordId: userInfo.id,
        username: userInfo.username,
        avatar: `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.webp`,
      });

      const token = tokenize(user.id);

      res.json({
        token: token,
        username: user.username,
        discordId: user.discordId,
        avatar: user.avatar,
      });
    } else {
      throw new Error('User already exists');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Failed to authorize user');
  }
});

export { createNewUser };
