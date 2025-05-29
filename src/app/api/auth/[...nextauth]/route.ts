import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs"; // to verify password
import { connectDB } from "@/libs/db"; // your MongoDB connection
import User from "@/libs/models/User"; // your User model

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate credentials
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          // Connect to the database
          await connectDB();

          // Look for user by email
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with this email");
          }

          // Compare hashed passwords
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Incorrect password");
          }

          // Return user info
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role, // optional
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT sessions
  },
  pages: {
    signIn: "/admin", // Optional: redirect to your custom login page
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure this is set in .env
});

export { handler as GET, handler as POST };
