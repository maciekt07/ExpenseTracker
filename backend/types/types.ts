import { Request } from "express";
export interface UserData {
  id: string;
  name: string;
  email: string;
}
export interface AuthenticatedRequest extends Request {
  user: UserData;
}
