import mongoose, { Schema } from 'mongoose';

/* ---------- Meme Schema ---------- */

const MemeSchema = new mongoose.Schema({
  memeAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'users',
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
  flags: {
    type: Array,
    required: true,
    default: [],
  },
  uploaded: {
    type: Date,
    required: true,
    default: Date.now
  }
});

/* -------- Meme interface -------- */

export interface MemeType extends mongoose.Document {
  memeAuthor: Schema.Types.ObjectId;
  memeTag: Array<string>;
  imgURL: string;
  upvotes: number;
  flags: Array<string>;
  uploaded: Date;
}

const Meme = mongoose.model<MemeType>('Meme', MemeSchema);

export default Meme;
