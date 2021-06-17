import mongoose from 'mongoose';

/* ---------- User Schema ---------- */

const UserSchema = new mongoose.Schema({
  discordId: {
    type: String,
    unique: true,
    required: true,
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
});

/* -------- User interface -------- */

export interface UserType extends mongoose.Document {
  discordId: string;
  username: string;
  upvotes: Number;
  avatar: string;
  violations: Array<string>;
}

const User = mongoose.model<UserType>('User', UserSchema);

export default User;
