import Link from "next/link";
import { headers } from "next/headers";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";

function formatPrice(v: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
}

async function fetchProducts(): Promise<Product[]> {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link href="/" className="text-sm hover:underline underline-offset-4">
          Back to Home
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="rounded-lg border border-black/10 dark:border-white/15 p-5">
            <h2 className="text-lg font-medium">{p.name}</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">{p.description}</p>
            <div className="mt-3 text-sm font-semibold">{formatPrice(p.price)}</div>
            <div className="mt-4">
              <Link
                href={`/products/${p.id}`}
                className="inline-flex items-center rounded-md border border-black/15 dark:border-white/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}