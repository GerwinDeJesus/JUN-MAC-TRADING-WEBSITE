// src/lib/db.ts
import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGO_URL || "", {
      dbName: "Jun-Mac-Trading",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
}
