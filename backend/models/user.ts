import mongoose from "mongoose";
import { User } from "@shared/types/types";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      default: "User",
    },
    profilePicture: {
      type: String,
      default: undefined,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be at least 4 characters"],
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export default User;
