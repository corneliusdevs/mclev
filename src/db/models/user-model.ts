import mongoose, { model, Schema } from "mongoose";

export interface User {
  email: string;
  userRole: "admin" | "user";
  kindeId: string;
}

export interface MongoUser extends User, mongoose.Document {}

export type TUser = User & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique:  true,
  },
  kindeId: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
  },
});

// export default mongoose.model<User>("User", UserSchema);

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
