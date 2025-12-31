import mongoose from "mongoose";
import app from "./app";

mongoose.connect("mongodb+srv://ausiemass_db_user:XGNghIDYb2H4BGn5@cluster0.oyexoxj.mongodb.net/")
  .then(() => {
    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  });
