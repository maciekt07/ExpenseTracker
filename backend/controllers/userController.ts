import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import { Types } from "mongoose";
import { AuthenticatedRequest } from "../types/types";

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Missing required fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create user");
    }
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//https://www.youtube.com/watch?v=UXjMo25Nnvc&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=4&ab_channel=TraversyMedia
export const getUserData = asyncHandler(async (req: Request, res: Response) => {
  if (!(req as AuthenticatedRequest).user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const user = await User.findById((req as AuthenticatedRequest).user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { _id, name, email } = user;
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});
