import { NextResponse } from "next/server";
import { addProduct, listProducts } from "@/lib/products";

export async function GET() {
  return NextResponse.json(listProducts());
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.name !== "string" || typeof body.description !== "string" || typeof body.price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const created = addProduct({ name: body.name, description: body.description, price: body.price });
  return NextResponse.json(created, { status: 201 });
}