import mongoose from 'mongoose';

/* ---------- Meme Schema ---------- */

const MemeSchema = new mongoose.Schema({
  memeAuthor: {
    type: String,
    required: true,
  },
  memeTags: {
    type: Array,
    default: [],
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    required: true,
    default: 0,
  },
  hasVoted: {
    tyep: Array,
    required: true,
    default: 0,
  },
  flags: {
    type: Array,
    required: true,
    default: [],
  },
});

/* -------- User interface -------- */

export interface MemeType extends mongoose.Document {
  memeAuthor: string;
  memeTag: Array<string>;
  imgURL: string;
  upvotes: number;
  hasVoted: Array<string>;
  flags: Array<string>;
}

const Meme = mongoose.model<MemeType>('Meme', MemeSchema);

export default Meme;
