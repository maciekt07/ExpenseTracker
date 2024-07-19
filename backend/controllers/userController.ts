import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import { Types } from "mongoose";
import { CustomRequest } from "../types/types";

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
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
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
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
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const getUserData = asyncHandler(async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;

  if (!customReq.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const user = await User.findById(customReq.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { _id, username, email } = user;
  res.status(200).json({
    id: _id,
    username,
    email,
  });
});
