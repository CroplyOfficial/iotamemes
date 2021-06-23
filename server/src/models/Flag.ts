import mongoose from 'mongoose';

const FlagSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  meme: {
    unique: true,
    required: true, 
    type: mongoose.Types.ObjectId
  },
  flagCount: {
    required: true, 
    type: Number, 
    default: 1
  },
  flaggers: {
    required: true, 
    type: Array
  }
});

/* -------------------- interface ------------------------- */

export interface FlagType extends mongoose.Document {
  username: string;
  user: mongoose.Types.ObjectId;
  meme: mongoose.Types.ObjectId;
  flagCount: number;
  flaggers: Array<mongoose.Types.ObjectId>
}

/* -------------------------------------------------------- */

const Flag = mongoose.model('Flag', FlagSchema);

export default Flag;
