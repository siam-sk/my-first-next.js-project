import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;
        if (
          email === process.env.DEMO_USER_EMAIL &&
          password === process.env.DEMO_USER_PASSWORD
        ) {
          return { id: "demo-user", name: "Demo User", email };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async redirect({ url, baseUrl }) {
      try {
        const next = new URL(url, baseUrl);
        if (next.origin === baseUrl) return next.toString();
      } catch {}
      return `${baseUrl}/products`;
    },
  },
};