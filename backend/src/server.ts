import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 4000;
const WEB_URL = process.env.WEB_URL;

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${WEB_URL}:${PORT}`);
    });
  });
