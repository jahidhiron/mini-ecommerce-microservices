import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

/* previous version */
// declare global {
//   namespace NodeJs {
//     interface Global {
//       signup(): Promise<string[]>; // this signup function will return a promise and that resolve array of string
//     }
//   }
// }

/**
 * Remove NodeJS.Global and fully rely on globalThis,
 * this reduces overhead when new global are introduced and is generally redundant now
 */
declare global {
  function signup(): Promise<string[]>; // this signup function will return a promise and that resolve array of string
}

/* same as above */
declare module globalThis {
  const signup: () => string[];
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "test_key";

  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = async () => {
  const email = "test@test.com";
  const password = "Test1234?";

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
