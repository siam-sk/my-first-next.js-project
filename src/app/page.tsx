import Link from "next/link";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-background to-black/[.03] dark:to-white/[.05]">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Discover products you’ll love
        </h1>
        <p className="mt-4 text-balance text-base sm:text-lg text-black/70 dark:text-white/70">
          Browse our catalog and explore product details. Sign in to manage and
          add new products.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/products"
            className="rounded-md bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90"
          >
            View Products
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-black/15 dark:border-white/20 px-5 py-2.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductHighlights() {
  const items = [
    {
      title: "Fast Shipping",
      desc: "Quick delivery on all orders.",
      emoji: "🚀",
    },
    {
      title: "Quality Assured",
      desc: "Top-rated items curated for you.",
      emoji: "✅",
    },
    {
      title: "Great Support",
      desc: "We’re here to help 24/7.",
      emoji: "💬",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center">
        Product Highlights
      </h2>
      <p className="mt-2 text-center text-black/70 dark:text-white/70">
        A glimpse of what we offer
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.title}
            href="/products"
            className="group rounded-lg border border-black/10 dark:border-white/15 p-6 hover:shadow-sm transition-shadow"
          >
            <div className="text-4xl">{item.emoji}</div>
            <h3 className="mt-4 text-lg font-medium group-hover:underline underline-offset-4">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">
              {item.desc}
            </p>
            <span className="mt-4 inline-block text-sm text-blue-600 dark:text-blue-400">
              Explore products →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ProductHighlights />
    </>
  );
}