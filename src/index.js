import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import MenuRouter from "./routes/menuItem.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use("/api/menu", MenuRouter);
async function main() {
  try {
    console.log("chuẩn bị connect tới DB");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("connect tới database thành công");
    console.log("chuẩn bị start server");

    app.listen(process.env.PORT, () => {
      console.log(`Server start thành công ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("error connect to database with error: " + error.message);
  }
}
main();
