import type { Metadata } from "next";
import Link from "next/link";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type Category = {
  id: string;
  name: string;
};

type Supplier = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  country: string | null;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  moq: number | null;
  category: { id: string; name: string } | null;
};

export const metadata: Metadata = {
  title: "Search | Turkey Manufacturers Platform",
  description: "Search suppliers and products, and filter results by category.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const categoryId = (params.category ?? "").trim();
  const ilikeValue = q ? encodeURIComponent(`*${q}*`) : "";

  const categories = await fetchFromSupabase<Category[]>(
    "categories?select=id,name&order=name.asc",
  );

  const suppliersPath =
    "companies?select=id,name,slug,city,country" +
    (q ? `&name=ilike.${ilikeValue}` : "") +
    "&order=created_at.desc&limit=20";

  const productsPath =
    "products?select=id,name,slug,moq,category:categories(id,name)" +
    (q ? `&name=ilike.${ilikeValue}` : "") +
    (categoryId ? `&category_id=eq.${encodeURIComponent(categoryId)}` : "") +
    "&order=created_at.desc&limit=20";

  const [suppliers, products] = await Promise.all([
    fetchFromSupabase<Supplier[]>(suppliersPath),
    fetchFromSupabase<Product[]>(productsPath),
  ]);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Search</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            &larr; Back to home
          </Link>
        </div>

        <form className="rounded-xl bg-white p-4 ring-1 ring-zinc-200">
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search suppliers or products..."
              className="sm:col-span-2 rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            />
            <select
              name="category"
              defaultValue={categoryId}
              className="rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Search
          </button>
        </form>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Suppliers ({suppliers.length})</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier) => (
              <Link
                key={supplier.id}
                href={`/suppliers/${supplier.slug}`}
                className="rounded-xl bg-white p-4 ring-1 ring-zinc-200 transition hover:bg-zinc-100"
              >
                <h3 className="font-semibold">{supplier.name}</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  {supplier.city}, {supplier.country}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Products ({products.length})</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="rounded-xl bg-white p-4 ring-1 ring-zinc-200 transition hover:bg-zinc-100"
              >
                <h3 className="font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-zinc-600">MOQ: {product.moq ?? "-"}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Category: {product.category?.name ?? "-"}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
