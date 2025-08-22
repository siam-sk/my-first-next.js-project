"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/products",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Log in</h1>
          <p className="text-sm text-black/70 dark:text-white/70">
            Use Google or demo credentials
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/products" })}
          className="w-full rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Continue with Google
        </button>

        <div className="relative text-center">
          <span className="px-2 text-xs text-black/60 dark:text-white/60 bg-background relative z-10">
            or
          </span>
          <div className="absolute inset-x-0 top-1/2 border-t border-black/10 dark:border-white/10" />
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="text-sm">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-md border border-black/15 dark:border-white/20 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
          >
            Continue with email
          </button>
        </form>

        <div className="text-center text-sm">
          <Link href="/" className="hover:underline underline-offset-4">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}