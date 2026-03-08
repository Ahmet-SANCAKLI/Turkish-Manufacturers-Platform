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
    fetchFromSupabase<Company[]>("companies?select=id,name,slug,city,country,verified&order=created_at.desc"),
    fetchFromSupabase<Product[]>("products?select=id,name,slug,moq&order=created_at.desc"),
  ]);
  const featuredCompanies = companies.slice(0, 6);
  const latestProducts = products.slice(0, 6);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-4 flex items-center justify-between">
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100">
              Menu
            </summary>
            <div className="absolute z-20 mt-2 w-44 rounded-lg bg-white p-2 ring-1 ring-zinc-200">
              <Link href="/about" className="block rounded px-2 py-1 text-sm hover:bg-zinc-100">
                About
              </Link>
              <Link href="/how-we-work" className="block rounded px-2 py-1 text-sm hover:bg-zinc-100">
                How we work
              </Link>
              <Link href="/contact" className="block rounded px-2 py-1 text-sm hover:bg-zinc-100">
                Contact
              </Link>
            </div>
          </details>
          <div className="flex gap-2">
            <button className="rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white">TUR</button>
            <button className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-zinc-900 ring-1 ring-zinc-300">
              ENG
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold">Turkey Manufacturers Platform</h1>
        <p className="mt-2 text-zinc-600">
          Turkish manufacturers and products for global buyers.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/products"
            className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
          >
            Products
          </Link>
          <Link
            href="/suppliers"
            className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
          >
            Suppliers
          </Link>
          <Link
            href="/categories"
            className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100"
          >
            Categories
          </Link>
        </div>
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
            {featuredCompanies.map((company) => (
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
            {latestProducts.map((product) => (
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

        <section className="mt-12 rounded-xl bg-white p-6 ring-1 ring-zinc-200">
          <h2 className="text-xl font-semibold">Request a Quotation Form</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Submit this form at the bottom of the page to send an RFQ.
          </p>
          <form action="/api/rfqs" method="post" className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Your Name</label>
              <input
                name="buyer_name"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Your Email</label>
              <input
                type="email"
                name="buyer_email"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Company Name (Optional)</label>
              <input
                name="company_name"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Country</label>
              <input
                name="country"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Supplier</label>
              <select
                name="supplier_id"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              >
                <option value="">Select supplier</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Product</label>
              <select
                name="product_id"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Quantity</label>
              <input
                type="number"
                min={1}
                name="quantity"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Submit RFQ
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
