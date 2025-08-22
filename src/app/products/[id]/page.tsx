import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Product } from "@/lib/products";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

async function fetchProduct(id: string): Promise<Product | null> {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const product = await fetchProduct(params.id);
  if (!product) return { title: "Product not found" };
  return { title: `${product.name} • Products` };
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/products" className="text-sm hover:underline underline-offset-4">
        ← Back to Products
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">{product.name}</h1>
      <p className="mt-2 text-black/70 dark:text-white/70">{product.description}</p>
      <p className="mt-4 text-lg font-semibold">
        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price)}
      </p>
    </div>
  );
}