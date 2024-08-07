import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  password: string;
  googleId?: string;
  createdAt: Date;
  getjwtToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

// Define a TypeScript interface for the request body
export interface LoginRequestBody {
  email: string;
  password: string;
}
