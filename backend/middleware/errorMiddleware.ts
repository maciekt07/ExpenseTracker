import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  message: string;
  stack: string;
}

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({ message: err.message, stack: err.stack });
};
