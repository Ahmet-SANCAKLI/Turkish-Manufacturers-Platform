import type { Metadata } from "next";
import Link from "next/link";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type Product = {
  id: string;
  name: string;
  slug: string;
  moq: number | null;
  category: { name: string; slug: string } | null;
  company: { name: string; slug: string } | null;
};

export const metadata: Metadata = {
  title: "Products | Turkey Manufacturers Platform",
  description: "Browse Turkish products and connect with suppliers.",
};

export default async function ProductsPage() {
  const products = await fetchFromSupabase<Product[]>(
    "products?select=id,name,slug,moq,category:categories(name,slug),company:companies(name,slug)&order=created_at.desc",
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            &larr; Back to home
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="rounded-xl bg-white p-4 ring-1 ring-zinc-200">
              <Link href={`/products/${product.slug}`} className="font-semibold underline">
                {product.name}
              </Link>
              <p className="mt-1 text-sm text-zinc-600">MOQ: {product.moq ?? "-"}</p>
              <p className="mt-1 text-xs text-zinc-500">Category: {product.category?.name ?? "-"}</p>
              <p className="mt-2 text-sm">
                Supplier:{" "}
                {product.company ? (
                  <Link href={`/suppliers/${product.company.slug}`} className="underline">
                    {product.company.name}
                  </Link>
                ) : (
                  "-"
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
