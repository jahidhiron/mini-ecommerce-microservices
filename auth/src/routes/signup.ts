import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError, validate } from "@jahidticketing/common";
import { body } from "express-validator";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password should be between 4 and 20 characters long"),
  ],
  validate,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: accessToken,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
