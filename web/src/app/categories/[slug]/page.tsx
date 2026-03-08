import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  moq: number | null;
  company: { name: string; slug: string } | null;
};

async function getCategoryBySlug(slug: string) {
  const categories = await fetchFromSupabase<Category[]>(
    `categories?select=id,name,slug&slug=eq.${encodeURIComponent(slug)}&limit=1`,
  );
  return categories[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Turkey Manufacturers Platform",
      description: "Requested category page could not be found.",
    };
  }

  return {
    title: `${category.name} Manufacturers | Turkey Manufacturers Platform`,
    description: `Explore ${category.name.toLowerCase()} products and suppliers from Turkey.`,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await fetchFromSupabase<Product[]>(
    `products?select=id,name,slug,moq,company:companies(name,slug)&category_id=eq.${category.id}&order=created_at.desc`,
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <Link href="/categories" className="text-sm text-zinc-600 hover:text-zinc-900">
            &larr; Back to categories
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl bg-white p-6 ring-1 ring-zinc-200">
            <p className="text-zinc-600">No products found in this category yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="rounded-xl bg-white p-4 ring-1 ring-zinc-200">
                <Link href={`/products/${product.slug}`} className="font-semibold underline">
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-zinc-600">MOQ: {product.moq ?? "-"}</p>
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
        )}
      </div>
    </main>
  );
}
