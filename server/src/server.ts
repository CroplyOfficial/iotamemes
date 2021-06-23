import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectToDB } from './config/db';
import userRoutes from './routes/userRoutes';
import memeRoutes from './routes/memeRoutes';
import flagRoutes from './routes/flagRoutes';

import { errorHandler } from './middleware/errors';

dotenv.config();

connectToDB(process.env.MONGO_URI || '');
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/memes', memeRoutes);
app.use('/api/flags', flagRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.info(`--> Server running on port ${PORT}`);
});
