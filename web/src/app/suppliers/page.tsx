import Link from "next/link";
import type { Metadata } from "next";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type Supplier = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  country: string | null;
  verified: boolean;
};

export const metadata: Metadata = {
  title: "Suppliers | Turkey Manufacturers Platform",
  description: "Browse verified Turkish supplier companies by category and location.",
};

export default async function SuppliersPage() {
  const suppliers = await fetchFromSupabase<Supplier[]>(
    "companies?select=id,name,slug,city,country,verified&order=created_at.desc",
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            &larr; Back to home
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((supplier) => (
            <Link
              key={supplier.id}
              href={`/suppliers/${supplier.slug}`}
              className="rounded-xl bg-white p-4 ring-1 ring-zinc-200 transition hover:bg-zinc-100"
            >
              <h2 className="font-semibold">{supplier.name}</h2>
              <p className="mt-1 text-sm text-zinc-600">
                {supplier.city}, {supplier.country}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                {supplier.verified ? "Verified Supplier" : "Pending Verification"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
