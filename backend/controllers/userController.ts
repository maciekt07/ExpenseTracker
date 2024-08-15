import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import { Types } from "mongoose";
import { AuthenticatedRequest } from "../types/types";
import fs from "fs/promises";
import path from "path";

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
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
      profilePicture: user.profilePicture,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      profilePicture: user.profilePicture,
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

  const { _id, name, email, profilePicture } = user;
  res.status(200).json({
    id: _id,
    name,
    email,
    profilePicture,
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById((req as AuthenticatedRequest).user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (req.body.name && typeof req.body.name !== "string") {
    res.status(400);
    throw new Error("Invalid name");
  }

  if (req.body.email && typeof req.body.email !== "string") {
    res.status(400);
    throw new Error("Invalid email");
  }

  const updatedUser = await User.findByIdAndUpdate(
    (req as AuthenticatedRequest).user.id,
    req.body,
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    res.status(400);
    throw new Error("Failed to update user");
  }

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    token: generateToken(updatedUser._id),
    profilePicture: updatedUser.profilePicture,
  });
});

export const uploadProfilePicture = asyncHandler(async (req: Request, res: Response) => {
  if (!(req as AuthenticatedRequest).user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const user = await User.findById((req as AuthenticatedRequest).user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  user.profilePicture = req.file.path;

  await user.save();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    profilePicture: user.profilePicture,
  });
});

export const removeProfilePicture = asyncHandler(async (req: Request, res: Response) => {
  if (!(req as AuthenticatedRequest).user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const user = await User.findById((req as AuthenticatedRequest).user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const uploadDir = "uploads";

  // Delete profile picture file
  if (user.profilePicture) {
    const filePath = path.join(uploadDir, path.basename(user.profilePicture));
    try {
      await fs.unlink(filePath);
      console.log(`Deleted profile picture file: ${filePath}`);
    } catch (err) {
      console.error("Failed to delete file:", err);
    }
  }

  // Clear profile picture reference in the database
  user.profilePicture = undefined;
  await user.save();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    profilePicture: undefined,
  });
});
