export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

let products: Product[] = [
  { id: "1", name: "Wireless Headphones", description: "Noise-cancelling over-ear headphones.", price: 199.99 },
  { id: "2", name: "Smart Watch", description: "Track fitness, notifications, and more.", price: 149.0 },
  { id: "3", name: "Portable Speaker", description: "Water-resistant Bluetooth speaker.", price: 89.5 },
];

export function listProducts(): Product[] {
  return products;
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function addProduct(input: Omit<Product, "id">): Product {
  const id = Date.now().toString();
  const product = { id, ...input };
  products = [product, ...products];
  return product;
}