import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_SECRET is required');
    }
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is required');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connect to MondoDB successfully');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
