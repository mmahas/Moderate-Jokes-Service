import mongoose from "mongoose";
import { IUserInputDto } from "../interfaces/IUser";
import { required } from "joi";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    role: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUserInputDto & mongoose.Document>(
  "IUser",
  User,
  "users"
);
