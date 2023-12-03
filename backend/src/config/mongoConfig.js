import "dotenv/config";
import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.gd7v733.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (err) {
    throw Error(err);
  }
};

export default connectToDatabase;
