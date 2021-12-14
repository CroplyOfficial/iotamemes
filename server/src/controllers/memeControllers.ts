import Meme, { MemeType } from "../models/Meme";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/User";

/**
 * Create a new meme route
 *
 * @route   POST /api/memes
 * @access  restricted
 */

const newMeme = asyncHandler(async (req: Request, res: Response) => {
  try {
    let { memeTags }: any = req.body;
    memeTags = memeTags.split(",");

    if (!req.file) {
      throw new Error("No file found");
    }
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

/**
 * Get all the memes
 *
 * @route   GET /api/memes
 * @access  public
 */

const getMemes = asyncHandler(async (req: Request, res: Response) => {
  try {
    const memes = await Meme.find({})
      .populate("users")
      .exec((error: any, foundMemes: MemeType[]) => {
        if (error) throw new Error("memes not found");
        res.json(foundMemes);
      });
  } catch (error) {
    throw error;
  }
});

/**
 * Toggle the like that a meme has received, so if the
 * user likes then a like would be added and if they try
 * to like again the meme would be unliked
 *
 * @route   /api/memes/toggleLike/:id
 * @access  restricted
 */

const toggleLike = asyncHandler(async (req: Request, res: Response) => {
  try {
    const meme: any = await Meme.findById(req.params.id).catch(() => {
      throw new Error("Meme not found :(");
    });
    const user: any = await User.findById(meme.memeAuthor).catch(() => {
      throw new Error("Meme-ist doesnt exist ( o _ o )");
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

/**
 * Get a meme by a single ID and return the data
 *
 * @route   /api/memes/:id
 * @access  public
 */

const getMemeById = asyncHandler(async (req: Request, res: Response) => {
  const meme = await Meme.findById(req.params.id).catch(() => {
    throw new Error("unable to load this meme :(");
  });
  res.json(meme);
});

/**
 * Get the most popular meme
 *
 * @route   GET /api/memes/@bot/popular
 * @access  public
 */

const getPopularMeme = asyncHandler(async (req: Request, res: Response) => {
  try {
    const memes = await Meme.find({}).catch((error: any) => {
      res.status(404);
      throw new Error("Memes not found");
    });
    memes.sort((a: any, b: any) => b.upvotes - a.upvotes);
    res.json(memes[0]);
  } catch (error) {
    throw error;
  }
});

/**
 * Get newest meme
 *
 * @route   GET /api/memes/@bot/newest
 * @access  public
 */

const getNewestMeme = asyncHandler(async (req: Request, res: Response) => {
  try {
    const memes = await Meme.find({}).catch((error: any) => {
      res.status(404);
      throw new Error("Memes not found");
    });
    memes.sort(
      (a: any, b: any) =>
        new Date(b.uploaded).valueOf() - new Date(a.uploaded).valueOf()
    );
    res.json(memes[0]);
  } catch (error) {
    throw error;
  }
});

/**
 * get most popular memes in a date period. Use start and
 * end date and then return the most popular meme.
 *
 * @route   /api/memes/@bot/popular
 * @access  public
 */

const getMostPopularInRange = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { start, end }: any = req.body;
      if (start && end) {
        const memes = await Meme.find({});
        const filteredMemes = memes.map((meme: any) => {
          const dateStart = new Date(start).getTime();
          const dateEnd = new Date(end).getTime();
          const dateUploaded = new Date(meme.uploaded).getTime();
          if (dateUploaded < dateEnd && dateUploaded > dateStart) {
            return meme;
          }
        });
        filteredMemes.sort((a: any, b: any) => b.upvotes - a.upvotes);
        const cleanedMemes = filteredMemes.filter((meme: any) => meme);
        res.json(cleanedMemes);
      } else {
        res.status(400);
        throw new Error("Start and end date are required");
      }
    } catch (error) {
      throw error;
    }
  }
);

/**
 * Get the meme and then update it
 *
 * make sure the author of the meme actually is the owner
 *
 * @route PATCH /api/memes/:id
 */

const editMeme = asyncHandler(async (req: Request, res: Response) => {
  const meme = await Meme.findById(req.params.id);
  if (meme && String(meme.memeAuthor) === String(req.user._id)) {
    const { memeTags } = req.body;
    meme.memeTags = memeTags ?? meme.memeTags;
    const savedMeme = await meme.save();
    res.json(savedMeme);
  } else {
    throw new Error("you do not own this meme :weirdsmileguy:");
  }
});

/**
 * Delete the meme
 *
 * @route DEL /api/memes/:id
 */

const deleteMeme = asyncHandler(async (req: Request, res: Response) => {
  const meme = await Meme.findById(req.params.id);
  if (meme && String(meme.memeAuthor) === String(req.user._id)) {
    const deleted = await Meme.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } else {
  }
});

export {
  newMeme,
  getMemes,
  editMeme,
  deleteMeme,
  toggleLike,
  getMemeById,
  getNewestMeme,
  getPopularMeme,
  getMostPopularInRange,
};
