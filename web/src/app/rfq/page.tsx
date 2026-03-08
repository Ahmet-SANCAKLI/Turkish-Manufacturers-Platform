import Link from "next/link";
import type { Metadata } from "next";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type Company = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
};

export const metadata: Metadata = {
  title: "Request a Quotation | Turkey Manufacturers Platform",
  description:
    "Submit your RFQ to connect with Turkish manufacturers and receive supplier quotations.",
};

export default async function RfqPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const [companies, products] = await Promise.all([
    fetchFromSupabase<Company[]>("companies?select=id,name&order=name.asc"),
    fetchFromSupabase<Product[]>("products?select=id,name&order=name.asc"),
  ]);

  const showSuccess = params.success === "1";
  const showError = params.error === "1";

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-6">
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            &larr; Back to home
          </Link>
        </div>

        <h1 className="text-3xl font-bold">Request for Quotation (RFQ)</h1>
        <p className="mt-2 text-zinc-600">
          Fill out this form and we will forward your request to the right supplier.
        </p>

        {showSuccess ? (
          <p className="mt-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800">
            RFQ saved successfully.
          </p>
        ) : null}

        {showError ? (
          <p className="mt-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800">
            RFQ could not be saved. Please check your fields and try again.
          </p>
        ) : null}

        <form action="/api/rfqs" method="post" className="mt-8 space-y-4 rounded-xl bg-white p-6 ring-1 ring-zinc-200">
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

          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Submit RFQ
          </button>
        </form>
      </div>
    </main>
  );
}
