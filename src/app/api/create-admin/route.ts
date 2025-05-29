// scripts/createAdmin.ts
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/libs/models/User"; // your Mongoose User model
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const createAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Missing MONGO_URI environment variable");
    }

    await mongoose.connect(process.env.MONGO_URI);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin12345@gmail.com" });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    const hashed = await bcrypt.hash("Admin12345", 10);
    await User.create({
      name: "Admin",
      email: "admin12345@gmail.com",
      password: hashed,
      role: "admin", // optional
    });
    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin user:", error);
    process.exit(1);
  }
};

createAdmin();
