import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How We Work | Turkey Manufacturers Platform",
  description: "How Turkish Exporter B2B sourcing workflow operates.",
};

export default function HowWeWorkPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold">How We Work</h1>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-zinc-700">
          <li>Buyers search products and suppliers.</li>
          <li>Buyers submit RFQs with requirements.</li>
          <li>Suppliers respond and negotiate quotations.</li>
          <li>Orders move forward with admin oversight.</li>
        </ol>
        <Link href="/" className="mt-6 inline-block text-sm underline">
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}
