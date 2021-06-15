import mongoose from 'mongoose';

/*
 * @params    none
 * @desc      take the connection string from the env file and instantiate a connection
 * @return    none
 * @output    if all goes well then it shall print that the conneciton has taken place
 */

const connectToDB = async (connString: string): Promise<void> => {
  try {
    // await the connection from the URI
    const conn = await mongoose.connect(connString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`--> Connected to MongoDB on ${conn.connection.host}`);
  } catch (err) {
    console.log(`Can't connect to Mongo DB\nError: ${err}`);
    process.exit(1);
  }
};

export { connectToDB };
