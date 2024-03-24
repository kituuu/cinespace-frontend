import { MONGO_URL } from "@/contants";
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });
    connection.on("error", (error) => {
      console.log("MongoDB is not connecting");
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}