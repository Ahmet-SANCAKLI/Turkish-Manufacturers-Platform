import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Login | Turkey Manufacturers Platform",
  description: "Restricted admin access page.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const showError = params.error === "1";
  const next = params.next && params.next.startsWith("/") ? params.next : "/admin/rfqs";

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-md px-6 py-12">
        <div className="mb-6">
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            &larr; Back to home
          </Link>
        </div>

        <h1 className="text-3xl font-bold">Admin Login</h1>
        <p className="mt-2 text-zinc-600">This area is restricted to administrators.</p>

        {showError ? (
          <p className="mt-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800">
            Invalid password.
          </p>
        ) : null}

        <form action="/api/admin/login" method="post" className="mt-6 rounded-xl bg-white p-6 ring-1 ring-zinc-200">
          <input type="hidden" name="next" value={next} />
          <label className="mb-1 block text-sm font-medium">Admin Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
          />
          <button
            type="submit"
            className="mt-4 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
