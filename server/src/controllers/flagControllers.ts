import asyncHandler from "express-async-handler";
import Flag from "../models/Flag";
import User from "../models/User";
import { Request, Response } from "express";
import Meme from "../models/Meme";
import fs from 'fs';
import path from 'path';

/**
 * get all the flags that have been raised. each flag belongs to a 
 * meme so we can see each meme by fetching them later. and taking an 
 * action.
 *
 * @route  GET /api/flags
 * @access restricted [admin only]
 */

const getAllFlags = asyncHandler(async (req: Request, res: Response) => {
  try {
    const flags = await Flag.find({}).catch((error: any) => {
      throw new Error('no flags found');
    });
    res.json(flags);
  } catch (error) {
    throw error;
  }
});

/** 
 * create a new flag for an account on grounds of some violation 
 * right now it is still pretty barebones but this just exists to 
 * make it easier to expand shall we need more elaborate system later
 * down the line 
 *
 * @route  POST /api/flags
 * @access restricted (bearer token)
 */

const createFlag = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { memeId }: any = req.body;
    const flagExists = await Flag.findOne({ meme: memeId });
    if (!flagExists) {
      // meme has not been flagged yet, i.e. flag doesn't exist yet 
      // so create a new one 
      const meme: any = await Meme.findById(memeId).catch((error) => {
        throw new Error('meme not found');
      });
      const userId = meme.memeAuthor;
      const user: any = await User.findById(userId).catch((error) => {
        throw new Error(`user not found`);
      });
      const flag = await Flag.create({
        username: user.username,
        user: userId,
        meme: memeId,
        flaggers: [req.user._id]
      }).catch((error: any) => {
        throw new Error("unable to create flag");
      });
      user.violations.push(flag._id);
      await user.save();
      res.status(200);
      res.json({
        flag
      })
    } else {
      console.log(flagExists)
      // meme has already been flagged so add unto the flag document
      if (flagExists.flaggers.includes(req.user._id)) {
        throw new Error("This meme has already been flagged")
      } else {
        flagExists.flaggers.push(req.user._id);
        flagExists.flagCount++;
        const flagSaved = await flagExists.save();
        res.json(flagSaved);
      }
    }
  } catch (error) {
    res.status(400);
    throw error;
  }
});

/**
 * delete any wrongly set flag and update the user to remove the biolation from 
 * their account.
 *
 * @route  DELETE /api/flags
 * @access admin only
 */

const removeFlag = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { flagId } = req.body;
    const deletedFlag = await Flag.findByIdAndDelete(flagId).catch((error: any) => {
      throw new Error('flag not found');
    });
    const user: any = await User.findById(deletedFlag.user).catch((error: any) => {
      throw new Error('flag not found');
    });
    user.violations = user.violations.filter((violation: string) => {
      return violation !== deletedFlag._id
    });
    await user.save();
    res.json(deletedFlag)

  } catch (error) {
    res.status(400);
    throw error;
  }
});

/**
 * Delete the trouble causing meme from both the db and the filesystem
 * this would delete the meme and flag document but the violation on the
 * user document would still stay
 *
 * @route   DELETE /api/flags/meme
 * @access  retricted to admins
 */

const removeMeme = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { flagId }: any = req.body;
    const flag: any = await Flag.findByIdAndDelete(flagId);
    const meme: any = await Meme.findByIdAndDelete(flag.meme);
    fs.unlink(path.join(__dirname, `..${meme.imgURL}`), (error: any) => {
      if (error) throw error;
    });
    res.json(flag)
  } catch (error) {
    throw error;
  }
})

export { createFlag, removeFlag, removeMeme, getAllFlags };
