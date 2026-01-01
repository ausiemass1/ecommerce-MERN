import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";



mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  });
