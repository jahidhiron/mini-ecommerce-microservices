import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validate, BadRequestError } from "@jahidticketing/common";
import { User } from "../models/user";
import { Password } from "../service/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  validate,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: accessToken,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
