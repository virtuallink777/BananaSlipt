import mongoose, { MongooseError } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";
import { MongoError } from "mongodb";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v?: string;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Pick<
    UserDocument,
    "_id" | "email" | "verified" | "createdAt" | "updatedAt" | "__v"
  >;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hashValue(this.password);
  return next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.post("save", function (error: any, doc: any, next: Function) {
  if (error.code === 11000) {
    const duplicatedField = Object.keys(error.keyPattern || {})[0] || "campo";
    next(new Error(`El ${duplicatedField} ya está registrado`));
  } else {
    next(error);
  }
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
