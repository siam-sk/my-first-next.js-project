import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/dashboard/add-product")}`);
  }

  async function createProduct(formData: FormData) {
    "use server";
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const priceStr = String(formData.get("price") || "").trim();
    const price = Number.parseFloat(priceStr);
    if (!name || !description || Number.isNaN(price)) return;

    const h = headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "http";
    const base = `${proto}://${host}`;

    const res = await fetch(`${base}/api/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie: cookies().toString(),
      },
      body: JSON.stringify({ name, description, price }),
    });
    if (!res.ok) throw new Error("Failed to create product");

    revalidatePath("/products");
    redirect("/products");
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Add a New Product</h1>

      <form action={createProduct} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm">Name</span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm">Description</span>
          <textarea
            name="description"
            required
            rows={4}
            className="mt-1 w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm">Price (USD)</span>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            className="mt-1 w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}