// import mongoose from "mongoose";

// // Define user schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String,
//   password: String,
//   googleId: String,
//   githubId: String,

//   // Add role field
//   role: {
//     type: String,
//     enum: ["user", "admin"], // allowed roles
//     default: "user", // default role when registering
//   },
// });

// // Prevent model overwrite if it’s already compiled
// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
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
    password: { type: String, required: true, select: false  },
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

export default mongoose.model<IUser>("User", userSchema);




