import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex items-center justify-between text-sm">
        <p className="text-black/70 dark:text-white/70">
          © {new Date().getFullYear()} My Store
        </p>
        <div className="flex items-center gap-4">
          <Link href="/products" className="hover:underline underline-offset-4">
            Products
          </Link>
          <Link href="/login" className="hover:underline underline-offset-4">
            Log in
          </Link>
        </div>
      </div>
    </footer>
  );
}