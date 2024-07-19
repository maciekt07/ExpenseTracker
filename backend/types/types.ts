import { Request } from "express";
// Extend the Request interface to include user
export interface CustomRequest extends Request {
  user: {
    id: string;
  };
}
