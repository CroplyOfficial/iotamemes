// + Import NPM Modules
import express from 'express';
import dotenv from 'dotenv';

// our functions/modules
import { connectToDB } from './config/connectMongo.js';
import userRoutes from './routes/usersRoutes.js';

// middlewares
import { errorHandler } from './middleware/errors.js';

// + initialize the dotenv module so that we can access variables in .env file via `process.env`
dotenv.config();

// + call the connect to DB method that reads the connection string from the .env file and connects
connectToDB();

// + initialise the express instance
// + set the app to use JSON so that we can accept JSON data in body
const app = express();
app.use(express.json());

// + set all the routes
app.use('/api/users', userRoutes);

// + use the error handler middleware
app.use(errorHandler);

// + Set port to either the one in ENV vars or 5000 as a fallback
const PORT = process.env.PORT || 5000;

// + start the express server on the said PORT
app.listen(PORT, () => {
  console.log(`--> Server started on port : ${PORT}`);
});
