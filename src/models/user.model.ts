import { IUser } from "@/types/user.types";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocs extends Omit<IUser, "_id">, Document {
  comparePassword(password: string): boolean;
}

let userSchema = new mongoose.Schema<UserDocs>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      required: [true, "Password is required"],
    },
    mobile: {
      type: String,
      minlength: [10, "Mobile number must be at least 10 characters"],
      maxlength: [10, "Mobile number must be at most 10 characters"],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function (): void {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

export default (mongoose.models.User as mongoose.Model<UserDocs>) || mongoose.model<UserDocs>("User", userSchema);

