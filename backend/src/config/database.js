import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.Mongo_DB_URI}`,
    );
    console.log(`Connection Successfull ${connectInstance.connection.host}`);
  } catch (error) {
    console.log("Error connecting database to server", error);
    process.exit(1);
  }
};

export default connectDB;
