import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supplier Application | Turkey Manufacturers Platform",
  description:
    "Apply as a Turkish manufacturer to publish your company and products on the platform.",
};

export default async function SupplierApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
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

        <h1 className="text-3xl font-bold">Supplier Application</h1>
        <p className="mt-2 text-zinc-600">
          Apply to join the platform as a Turkish manufacturer.
        </p>

        {showSuccess ? (
          <p className="mt-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800">
            Application saved. Our admin team will review it.
          </p>
        ) : null}

        {showError ? (
          <p className="mt-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800">
            Application could not be saved. Please check your fields and try again.
          </p>
        ) : null}

        <form
          action="/api/supplier-applications"
          method="post"
          className="mt-8 space-y-4 rounded-xl bg-white p-6 ring-1 ring-zinc-200"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">Company Name</label>
            <input
              name="company_name"
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Contact Person</label>
            <input
              name="contact_name"
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Country</label>
            <input
              name="country"
              defaultValue="Turkey"
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">City</label>
            <input
              name="city"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Website</label>
            <input
              name="website"
              placeholder="https://"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Company Description</label>
            <textarea
              name="description"
              rows={4}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </main>
  );
}
