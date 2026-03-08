import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Turkey Manufacturers Platform",
  description: "About Turkish Exporter B2B platform.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="mt-3 text-zinc-700">
          Turkish Exporter B2B connects global buyers with Turkish manufacturers and exporters.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm underline">
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}
