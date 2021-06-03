import mongoose from 'mongoose';

/*
 * @params    none
 * @desc      take the connection string from the env file and instantiate a connection
 * @return    none
 * @output    if all goes well then it shall print that the conneciton has taken place
 */

const connectToDB = async () => {
  try {
    // await the connection from the URI
    // Set some recommended options
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    // print the hostname of the connection to show the connection succeeded
    console.log(`--> Connected to MongoDB on ${conn.connection.host}`);
  } catch (err) {
    console.log(`Can't connect to Mongo DB\nError: ${err}`);
    process.exit(1);
  }
};

export { connectToDB };
