import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Turkey Manufacturers Platform",
  description: "Contact Turkish Exporter B2B support team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-3 text-zinc-700">For support, partnerships, or onboarding questions:</p>
        <p className="mt-2 text-zinc-700">Email: support@turkishexporterb2b.com</p>
        <Link href="/" className="mt-6 inline-block text-sm underline">
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}
