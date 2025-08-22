import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}