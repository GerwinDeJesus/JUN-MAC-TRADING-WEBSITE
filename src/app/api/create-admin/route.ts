// app/api/create-admin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const client = new MongoClient(process.env.MONGO_URI!);

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_CREATION_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await client.connect();
    const db = client.db();

    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await db.collection("users").insertOne({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "Admin created", id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating admin", error }, { status: 500 });
  } finally {
    await client.close();
  }
}
