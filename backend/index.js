import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use("/api/user", userRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("App is listening");
});
