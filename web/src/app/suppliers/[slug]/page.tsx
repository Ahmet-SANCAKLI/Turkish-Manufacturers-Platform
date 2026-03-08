import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type Supplier = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  city: string | null;
  country: string | null;
  website: string | null;
  verified: boolean;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  moq: number | null;
};

async function getSupplierBySlug(slug: string) {
  const suppliers = await fetchFromSupabase<Supplier[]>(
    `companies?select=id,name,slug,description,city,country,website,verified&slug=eq.${encodeURIComponent(slug)}&limit=1`,
  );
  return suppliers[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);

  if (!supplier) {
    return {
      title: "Supplier Not Found | Turkey Manufacturers Platform",
      description: "Requested supplier page could not be found.",
    };
  }

  return {
    title: `${supplier.name} | Turkish Supplier`,
    description:
      supplier.description ??
      `${supplier.name} supplier profile. Location: ${supplier.city ?? "-"}, ${supplier.country ?? "-"}.`,
  };
}

export default async function SupplierDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);

  if (!supplier) {
    notFound();
  }

  const products = await fetchFromSupabase<Product[]>(
    `products?select=id,name,slug,moq&company_id=eq.${supplier.id}&order=created_at.desc`,
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{supplier.name}</h1>
          <Link href="/suppliers" className="text-sm text-zinc-600 hover:text-zinc-900">
            &larr; Back to suppliers
          </Link>
        </div>

        <section className="rounded-xl bg-white p-6 ring-1 ring-zinc-200">
          <p className="text-sm text-zinc-600">
            {supplier.city}, {supplier.country}
          </p>
          <p className="mt-2 text-sm text-zinc-700">{supplier.description ?? "-"}</p>
          <p className="mt-2 text-sm">
            Website:{" "}
            {supplier.website ? (
              <a
                href={supplier.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 underline"
              >
                {supplier.website}
              </a>
            ) : (
              "-"
            )}
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            {supplier.verified ? "Verified Supplier" : "Pending Verification"}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="rounded-xl bg-white p-4 ring-1 ring-zinc-200 transition hover:bg-zinc-100"
              >
                <h3 className="font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-zinc-600">MOQ: {product.moq ?? "-"}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
