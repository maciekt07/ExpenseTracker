import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import type { Request } from "express";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

interface CustomRequest extends Request {
  user?: any;
}

const protect = asyncHandler(async (req: CustomRequest, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
      // get user from token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized, no token");
  }
});

export default protect;
