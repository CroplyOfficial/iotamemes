import Meme, { MemeType } from '../models/Meme';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import User from '../models/User';

const newMeme = asyncHandler(async (req: Request, res: Response) => {
  try {
    let { memeTags }: any = req.body;
    memeTags = memeTags.split(',');

    const meme: MemeType = await Meme.create({
      memeAuthor: req.user._id,
      memeTags,
      imgURL: `/uploads/${req.file.filename}`,
    });

    const user: any = await User.findById(req.user._id);
    user.totalMemes++;
    await user.save();

    res.json(meme);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const getMemes = asyncHandler(async (req: Request, res: Response) => {
  try {
    const memes = await Meme.find({})
      .populate('users')
      .exec((error, foundMemes) => {
        if (error) throw new Error('memes not found');
        res.json(foundMemes);
      });
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

const getMemeById = asyncHandler(async (req: Request, res: Response) => {
  const meme = await Meme.findById(req.params.id).catch((error) => {
    throw new error('unable to load this meme :(');
  });
  res.json(meme);
});

export { newMeme, getMemes, toggleLike, getMemeById };
