import Meme, { MemeType } from '../models/Meme';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import User, { UserType } from '../models/User';

const newMeme = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { memeTags } = req.body;

    const meme: MemeType = await Meme.create({
      memeAuthor: req.user._id,
      memeTags,
      imgURL: `/uploads/${req.file.filename}`,
    });

    res.json(meme);
  } catch (error) {
    throw error;
  }
});

const getMemes = asyncHandler(async (req: Request, res: Response) => {
  try {
    const memes = await Meme.find({}).catch((error) => {
      res.status(404);
      throw new Error('No memes found ;_;');
    });

    res.json(memes);
  } catch (error) {
    throw error;
  }
});

const toggleLike = asyncHandler(async (req: Request, res: Response) => {
  try {
    const meme: any = await Meme.findById(req.params.id).catch((error) => {
      throw new Error('Meme not found :(');
    });
    const user: any = await User.findById(meme.memeAuthor).catch((error) => {
      throw new Error('Meme-ist doesnt exist ( o _ o )');
    });
    const self: any = await User.findById(req.user.id);

    if (self.likedMemes.includes(meme._id)) {
      const result: any = await self.likedMemes.filter(
        (memeId: any) => meme.id != memeId
      );
      self.likedMemes = result;
      meme.upvotes--;
      user.upvotes--;
    } else {
      self.likedMemes.push(meme._id);
      meme.upvotes++;
      user.upvotes++;
    }

    const savedMeme = await meme.save();
    const savedUser = await user.save();
    const savedSelf = await self.save();
    res.json({
      ...savedMeme._doc,
      likedMemes: savedSelf.likedMemes,
    });
  } catch (error) {
    throw error;
  }
});

export { newMeme, getMemes, toggleLike };
