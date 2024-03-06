import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

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
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use("", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
