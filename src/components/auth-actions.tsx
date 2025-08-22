"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

export default function AuthActions({ session }: { session: Session | null }) {
  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/add-product"
          className="text-sm hover:underline underline-offset-4"
        >
          Add Product
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex items-center rounded-md border border-black/15 dark:border-white/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex items-center rounded-md border border-black/15 dark:border-white/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
    >
      Log in
    </Link>
  );
}