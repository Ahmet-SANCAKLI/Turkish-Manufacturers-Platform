import type { Metadata } from "next";
import Link from "next/link";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export const metadata: Metadata = {
  title: "Categories | Turkey Manufacturers Platform",
  description: "Browse product categories and discover Turkish manufacturers by industry.",
};

export default async function CategoriesPage() {
  const categories = await fetchFromSupabase<Category[]>(
    "categories?select=id,name,slug&order=name.asc",
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Categories</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            &larr; Back to home
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="rounded-xl bg-white p-4 ring-1 ring-zinc-200 transition hover:bg-zinc-100"
            >
              <h2 className="font-semibold">{category.name}</h2>
              <p className="mt-1 text-sm text-zinc-600">View products in this category</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
