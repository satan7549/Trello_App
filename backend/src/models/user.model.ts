import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { IUser } from "../types/user";

const userSchema: Schema<IUser> = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lastName: {
    type: String,
    required: [false, "Please enter email"],
    default: "",
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  profileImage: {
    type: String,
    default: "",
  },
  googleId: { type: String, unique: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// JWT Token generate method of userSchema
userSchema.methods.getjwtToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_SECRET_KEY_EXPIRE,
  });
};

// compare password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
