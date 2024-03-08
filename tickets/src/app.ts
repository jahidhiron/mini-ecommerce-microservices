import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@jahidticketing/common";

const app = express();

// traffic is proxied to our app through ingress-nginx
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false, // don't need to encrypt
    secure: process.env.NODE_ENV !== "test", // cookie will use if user visit by https connection
  })
);

app.use("", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
