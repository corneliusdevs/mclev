import mongoose, { model, Schema } from "mongoose";

export interface AdminUser {
  email: string;
  userRole: "admin" | "user";
  password: string;
}

export interface MongoUser extends AdminUser, mongoose.Document {}

export type TAdminUser = AdminUser & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const AdminUserSchema = new mongoose.Schema<AdminUser>({
  email: {
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

// export default mongoose.model<AdminUser>("AdminUser", AdminUserSchema);

export default mongoose.models.AdminUser || mongoose.model<AdminUser>("AdminUser", AdminUserSchema);
