import mongoose from 'mongoose';

/* ---------- User Schema ---------- */

const UserSchema = new mongoose.Schema({
  discordId: {
    type: String,
    unique: true,
    required: true,
  },
  bio: {
    type: String,
    default: 'An IOTAMEMES users',
  },
  username: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    required: true,
    default: 0,
  },
  avatar: {
    type: String,
    required: true,
  },
  violations: {
    type: Array,
    required: true,
    default: [],
  },
  isBanned: {
    required: true,
    default: false,
    type: Boolean,
  },
  wallet: {
    type: String,
  },
  totalMemes: {
    type: Number,
    required: true,
    default: 0,
  },
  likedMemes: {
    required: true,
    type: Array,
    default: [],
  },
});

/* -------- User interface -------- */

export interface UserType extends mongoose.Document {
  discordId: string;
  bio: string;
  username: string;
  upvotes: Number;
  totalMemes: Number;
  avatar: string;
  violations: Array<string>;
  isBanned: boolean;
  wallet: string;
  likedMemes: Array<string>;
}

const User = mongoose.model<UserType>('User', UserSchema);

export default User;
