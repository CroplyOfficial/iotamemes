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
  accessToken: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

/* -------- User interface -------- */

export interface UserType extends mongoose.Document {
  discordId: string;
  username: string;
  accessToken: string;
  avatar: string;
}

const User = mongoose.model<UserType>('User', UserSchema);

export default User;
