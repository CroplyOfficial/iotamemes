import Meme, { MemeType } from '../models/Meme';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

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

export { newMeme, getMemes };
