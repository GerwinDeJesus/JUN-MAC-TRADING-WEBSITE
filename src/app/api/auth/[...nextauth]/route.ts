import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs"; // to verify password
import { connectDB } from "@/libs/db"; // your MongoDB connection
import User from "@/libs/models/User"; // your User model

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Check if credentials exist
          if (!credentials) {
            throw new Error("Missing credentials");
          }

          // Connect to DB
          await connectDB();

          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with this email");
          }

          // Verify password
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Incorrect password");
          }

          // Return user object for session
          return { id: user._id.toString(), name: user.name, email: user.email };
        } catch (error) {
          console.error("Authorize error:", error);
          return null; // Return null for failed login to trigger 401
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
