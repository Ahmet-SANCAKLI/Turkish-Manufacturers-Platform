import Link from "next/link";
import type { Metadata } from "next";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Company = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  country: string | null;
  verified: boolean;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  moq: number | null;
};

export const metadata: Metadata = {
  title: "Turkey Manufacturers Platform | Turkish Suppliers",
  description:
    "Discover Turkish manufacturers, explore products, and submit RFQs in one B2B sourcing platform.",
};

export default async function Home() {
  const [categories, companies, products] = await Promise.all([
    fetchFromSupabase<Category[]>("categories?select=id,name,slug&order=name.asc"),
    fetchFromSupabase<Company[]>(
      "companies?select=id,name,slug,city,country,verified&order=created_at.desc&limit=6",
    ),
    fetchFromSupabase<Product[]>(
      "products?select=id,name,slug,moq&order=created_at.desc&limit=6",
    ),
  ]);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold">Turkey Manufacturers Platform</h1>
        <p className="mt-2 text-zinc-600">
          Turkish manufacturers and products for global buyers.
        </p>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/rfq"
              className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              Request a Quotation
            </Link>
            <Link
              href="/admin/rfqs"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
            >
              Open Admin RFQs
            </Link>
            <Link
              href="/supplier/apply"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
            >
              Supplier Apply
            </Link>
            <Link
              href="/admin/suppliers"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
            >
              Open Admin Suppliers
            </Link>
            <Link
              href="/admin/products"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
            >
              Open Admin Products
            </Link>
            <Link
              href="/suppliers"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
            >
              Browse Suppliers
            </Link>
            <Link
              href="/search"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
            >
              Search
            </Link>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Categories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category.id}
                className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-zinc-200"
              >
                {category.name}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Featured Companies</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <article key={company.id} className="rounded-xl bg-white p-4 ring-1 ring-zinc-200">
                <h3 className="font-semibold">{company.name}</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  {company.city}, {company.country}
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  {company.verified ? "Verified Supplier" : "Pending Verification"}
                </p>
                <Link
                  href={`/suppliers/${company.slug}`}
                  className="mt-3 inline-block text-sm font-medium underline"
                >
                  View Supplier
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Latest Products</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="rounded-xl bg-white p-4 ring-1 ring-zinc-200">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-zinc-600">Slug: {product.slug}</p>
                <p className="mt-2 text-xs text-zinc-500">
                  MOQ: {product.moq ?? "-"}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-3 inline-block text-sm font-medium underline"
                >
                  View Product
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
