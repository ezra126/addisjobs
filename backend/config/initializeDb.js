import mongoose from "mongoose";
import "dotenv/config";

const connectToDatabase = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 10000,
    })
    .then(() => {
      console.log("DB connected succesfully");
    })
    .catch((error) => {
      console.log("DB connection failed");
    });
};

export default connectToDatabase;
