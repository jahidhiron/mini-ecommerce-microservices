import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_SECRET is required");
    }
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connect to MondoDB successfully");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
