import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  moq: number | null;
  image_url: string | null;
  company: { name: string; slug: string } | null;
  category: { name: string; slug: string } | null;
};

async function getProductBySlug(slug: string) {
  const products = await fetchFromSupabase<ProductDetail[]>(
    `products?select=id,name,slug,description,moq,image_url,company:companies(name,slug),category:categories(name,slug)&slug=eq.${encodeURIComponent(slug)}&limit=1`,
  );
  return products[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Turkey Manufacturers Platform",
      description: "Requested product page could not be found.",
    };
  }

  const supplierName = product.company?.name ? ` by ${product.company.name}` : "";
  return {
    title: `${product.name}${supplierName} | Turkish Product`,
    description:
      product.description ??
      `${product.name}${supplierName}. Minimum order quantity: ${product.moq ?? "-"}.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            &larr; Back to home
          </Link>
        </div>

        <article className="rounded-xl bg-white p-6 ring-1 ring-zinc-200">
          <p className="text-sm text-zinc-600">MOQ: {product.moq ?? "-"}</p>
          <p className="mt-2 text-sm text-zinc-700">{product.description ?? "-"}</p>
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
          <p className="mt-2 text-sm">
            Category:{" "}
            {product.category ? (
              <span>
                {product.category.name} ({product.category.slug})
              </span>
            ) : (
              "-"
            )}
          </p>
          <div className="mt-6">
            <Link
              href="/rfq"
              className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              Request Quotation for this Product
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
