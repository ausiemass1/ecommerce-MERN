// import mongoose, { Document, Schema } from "mongoose";

// export interface IUser extends Document {
//   name?: string;
//   age?: number;
//   email: string;
//   password: string;
//   role: "user" | "admin";
//   googleId?: string;
//   githubId?: string;
// }

// const userSchema = new Schema<IUser>(
//   {
//     name: String,
//     age: Number,
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true, select: false  },
//     googleId: String,
//     githubId: String,
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

// export default User;

import mongoose, { Schema, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name?: string;
  age?: number;
  email: string;
  password: string;
  role: "user" | "admin";
  googleId?: string;
  githubId?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    age: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    googleId: String,
    githubId: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;



