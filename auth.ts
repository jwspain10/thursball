import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    ...authConfig.callbacks,
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
  },
} satisfies NextAuthConfig);
