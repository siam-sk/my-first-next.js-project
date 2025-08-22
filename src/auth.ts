import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyUser } from "@/lib/users";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
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

        const user = await verifyUser(email, password);
        if (user) return user;

        // Optional demo fallback via env
        if (
          process.env.DEMO_USER_EMAIL &&
          process.env.DEMO_USER_PASSWORD &&
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