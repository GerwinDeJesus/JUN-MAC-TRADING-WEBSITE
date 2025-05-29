import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/libs/models/User";

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!); // Ensure this matches your .env
    const hashed = await bcrypt.hash("Admin12345", 10);
    await User.create({
      name: "Admin",
      email: "admin12345@gmail.com",
      password: hashed,
      role: "admin",
    });
    console.log("✅ Admin user created");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
    process.exit(1);
  }
};

createAdmin();
