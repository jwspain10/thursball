import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import prisma from "./lib/prisma";
import { NextAuthConfig } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // On first login, fetch role from DB
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        token.role = dbUser?.role ?? "USER";
        token.id = dbUser?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig);
