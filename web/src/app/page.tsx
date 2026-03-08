import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { fetchFromSupabase } from "@/lib/supabase-rest";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

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
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(ADMIN_COOKIE_NAME)?.value === "1";

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
        <form action="/search" method="get" className="mt-4 flex gap-2">
          <input
            name="q"
            placeholder="Search suppliers or products..."
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Search
          </button>
        </form>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/rfq"
              className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              Request a Quotation
            </Link>
            <Link
              href="/supplier/apply"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
            >
              Supplier Apply
            </Link>
            <Link
              href="/suppliers"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
            >
              Suppliers
            </Link>
            <Link
              href="/products"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
            >
              Categories
            </Link>
            {isAdmin ? (
              <details className="relative">
                <summary className="cursor-pointer list-none rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100">
                  Admin
                </summary>
                <div className="absolute z-10 mt-2 w-52 rounded-lg bg-white p-2 ring-1 ring-zinc-200">
                  <Link href="/admin/rfqs" className="block rounded px-2 py-1 text-sm hover:bg-zinc-100">
                    RFQs
                  </Link>
                  <Link href="/admin/suppliers" className="block rounded px-2 py-1 text-sm hover:bg-zinc-100">
                    Suppliers
                  </Link>
                  <Link href="/admin/products" className="block rounded px-2 py-1 text-sm hover:bg-zinc-100">
                    Products
                  </Link>
                  <Link href="/admin/categories" className="block rounded px-2 py-1 text-sm hover:bg-zinc-100">
                    Categories
                  </Link>
                  <form action="/api/admin/logout" method="post" className="mt-1 border-t border-zinc-200 pt-1">
                    <button
                      type="submit"
                      className="block w-full rounded px-2 py-1 text-left text-sm text-red-700 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </form>
                </div>
              </details>
            ) : null}
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Categories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-zinc-200"
              >
                {category.name}
              </Link>
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
