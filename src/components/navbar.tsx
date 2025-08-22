import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import AuthActions from "./auth-actions";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          My Store
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="text-sm hover:underline underline-offset-4"
          >
            Products
          </Link>
          <AuthActions session={session} />
        </div>
      </nav>
    </header>
  );
}