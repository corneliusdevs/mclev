import mongoose, { model, Schema } from "mongoose";

export interface User {
  username: string;
  userRole: "admin" | "user";
  password: string;
}

export interface MongoUser extends User, mongoose.Document {}

export type TUser = User & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const UserSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique:  true,
  },
  password: {
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
