import mongoose from "mongoose";
import { config } from "../config/index.js";

export async function connectDB() {
  try {
    await mongoose.connect(config.DB_URL);
    console.log("DB jag gya hai");
  } catch (error) {
    console.error("DB ki gaand phat gyi hai", error);
    throw error;
  }
}