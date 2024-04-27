import NextAuth from "next-auth/next";
import { type NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";

const nextAuth: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GIT_HUB_ID!,
      clientSecret: process.env.GIT_HUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(nextAuth);
export { handler as GET, handler as POST };
