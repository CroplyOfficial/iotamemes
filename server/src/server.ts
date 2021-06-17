import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectToDB } from './config/db';
import userRoutes from './routes/userRoutes';
import memeRoutes from './routes/memeRoutes';

dotenv.config();

connectToDB(process.env.MONGO_URI || '');
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/memes', memeRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.info(`--> Server running on port ${PORT}`);
});
