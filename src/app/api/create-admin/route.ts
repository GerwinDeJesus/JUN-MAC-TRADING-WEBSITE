// /app/api/create-admin/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/libs/models/User";

export async function GET(req: Request) {
  if (process.env.CREATE_ADMIN_SECRET !== req.headers.get("x-secret")) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await mongoose.connect(process.env.MONGO_URI!);
  const hashed = await bcrypt.hash("Admin12345", 10);
  await User.create({
    name: "Admin",
    email: "admin12345@gmail.com",
    password: hashed,
    role: "admin",
  });

  return NextResponse.json({ message: "Admin created" });
}
