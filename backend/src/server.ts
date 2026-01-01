import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  });
