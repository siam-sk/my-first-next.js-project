"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "register") {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Registration failed");
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // handle errors manually
      callbackUrl: "/products",
    });

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }
    // Successful login
    window.location.assign(result?.url ?? "/products");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">
            {mode === "login" ? "Log in" : "Create an account"}
          </h1>
          <p className="text-sm text-black/70 dark:text-white/70">
            {mode === "login"
              ? "Sign in with your email and password."
              : "Register with your name, email, and password."}
          </p>
        </div>

        {error && (
          <div className="rounded-md border border-red-300/60 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "register" && (
            <label className="block">
              <span className="text-sm">Name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
              />
            </label>
          )}
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
            className="w-full rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            {mode === "login" ? "Continue" : "Create account"}
          </button>
        </form>

        <div className="text-center text-sm">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="hover:underline underline-offset-4"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="hover:underline underline-offset-4"
              >
                Log in
              </button>
            </>
          )}
        </div>

        <div className="text-center text-sm">
          <Link href="/" className="hover:underline underline-offset-4">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}