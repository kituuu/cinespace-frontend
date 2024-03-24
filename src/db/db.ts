import { MONGO_URL } from "@/contants";
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
    });
    connection.on("error", (error) => {
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}