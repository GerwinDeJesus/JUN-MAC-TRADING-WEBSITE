// pages/api/create-admin.ts (or app/api/create-admin/route.ts for app router)
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const client = new MongoClient(process.env.MONGO_URI!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  // Add a simple secret key check to protect this route
  if (req.headers.authorization !== `Bearer ${process.env.ADMIN_CREATION_SECRET}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await client.connect();
    const db = client.db();

    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await db.collection("users").insertOne({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Admin created", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  } finally {
    await client.close();
  }
}
