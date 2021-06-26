import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getDiscordUserInfo } from '../utils/discord';
import User, { UserType } from '../models/User';
import Meme from '../models/Meme';
import { tokenize } from '../utils/jwt';

/**
 *  @route  POST /api/users/authorize
 *  @access public
 *  @desc   route to login or register with discord user
 */

const authorizeDiscordUser = asyncHandler(
  async (req: Request, res: Response) => {
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
          id: user.id,
          token: token,
          username: user.username,
          discordId: user.discordId,
          avatar: user.avatar,
          isAdmin: user.isAdmin
        });
      } else {
        const token = tokenize(userExists.id);

        res.json({
          token: token,
          id: userExists.id,
          username: userExists.username,
          discordId: userExists.discordId,
          avatar: userExists.avatar,
          isAdmin: userExists.isAdmin
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error('Failed to authorize user');
    }
  }
);

/**
 *  @route    GET /api/users/:id
 *  @access   public
 *  @desc     get the user by ID
 */

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).catch((error) => {
      throw new Error('User not found');
    });
    res.json(user);
  } catch (error) {
    throw error;
  }
});

/**
 *  @route    GET /api/users/@me/liked
 *  @access   restricted (bearer token)
 *  @desc     get a list of liked memes
 */

const getLikedMemes = asyncHandler(async (req: Request, res: Response) => {
  const user: any = await User.findById(req.user.id).catch((error) => {
    console.log(error);
    throw new Error('user not found');
  });
  res.json(user.likedMemes);
});

/**
 *  @route    GET /api/users
 *  @access   public
 *  @desc     get all the users list
 */

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users: any = await User.find({}).catch((error) => {
    res.status(404);
    throw new Error('no meme-ists found');
  });

  const userDataToSend = users.map((user: any) => {
    return {
      username: user.username,
      avatar: user.avatar,
      id: user._id,
      upvotes: user.upvotes,
      totalMemes: user.totalMemes,
      bio: user.bio,
    }
  });

  const filtered: any = await userDataToSend.filter((user: any) => user.totalMemes > 0);
  res.json(filtered);
});

/**
 *  @route    PUT /api/users
 *  @access   restricted (Bearer token)
 *  @desc     find logged in user and update
 */

const updateUserData = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { wallet, tagline }: any = req.body;
    const user: any = await User.findById(req.user.id);
    user.wallet = wallet;
    user.bio = tagline;

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    throw new Error('Unable to update :(');
  }
});

/**
 * get memes filtered by artist
 *
 * @route  GET /api/users/:id/memes
 * @access public
 */

const getMemesForUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const memes = await Meme.find({ memeAuthor: req.params.id }).catch(error => {
      throw new Error('unable to source memes :(');
    //@ts-ignore
    });
    res.json(memes);
  } catch (error) {
    throw error;
  }
});

/**
 * Delete the user by ID and all the corresponding
 * memes that the user had created, this is an admin only
 * route
 *
 * @route   DELETE /api/users/:id
 * @access  restricted admin only
 */

const deleteMemeUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user: any = await User.findById(req.params.id).catch((error) => {
      res.status(404);
      throw new Error('user not found');
    })
    user.isBanned = true;
    const savedUser = user.save();
    await Meme.deleteMany({ memeAuthor: user._id }).catch((error) => {
      res.status(404);
      throw new Error('Unable to find memes to delete');
    });
    res.json(savedUser);
  } catch (error) {
    throw error;
  }
})

/**
 * Delete the user and remove data, this route is meant to be
 * called by the user themselves not an admin so the way it differs
 * is that the memes created by the user DO NOT get nuked
 *
 * @route   DELETE /api/users
 * @access  restricted
 * */

const replaceUserData = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user: any = await User.findById(req.user._id).catch((error: any) => {
      res.status(404);
      throw new Error('User not found');
    });
    user.username = `Deleted User #${Math.floor(100000 + Math.random() * 900000)}`;
    user.discordId = req.user._id;
    user.wallet = '';
    user.likedMemes = [];
    user.bio = 'deleted user';
    user.avatar = `/images/defaults/${Math.floor(Math.random() * 60) + 1}.png`;
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    throw error;
  }
})

/**
 * checks if the user is banned and returns whether the user is
 * banned or not for now.
 *
 * @route   GET /api/users/@me/isBanned
 * @access  restricted
 * @retuns  { isBanned: true/false }
 */

const checkIsBanned = asyncHandler(async (req: Request, res: Response) => {
  res.json({
    isBanned: req.user.isBanned
  });
});

/**
 * gets the user with the most amount of upvotes, basically returns
 * data for the most popular user.
 *
 * @route   GET /api/users/@bot/popular
 * @access  public
 */

const mostLikedUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).catch((error: any) => {
      res.status(404);
      throw new Error('no artists found');
    });
    const cleanUsers = users.filter((user: any) => !user.isBanned)
    cleanUsers.sort((a: any, b: any) => b.upvotes - a.upvotes);
    res.json(cleanUsers[0]);
  } catch (error: any) {
    throw error;
  }
});

export {
  authorizeDiscordUser,
  getUserById,
  getLikedMemes,
  getAllUsers,
  updateUserData,
  getMemesForUser,
  deleteMemeUser,
  replaceUserData,
  checkIsBanned,
  mostLikedUser
};
