import Link from "next/link";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
};

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const categories = await fetchFromSupabase<Category[]>(
    "categories?select=id,name,slug,parent_id&order=name.asc",
  );

  const showSuccess = params.success === "1";
  const showError = params.error === "1";

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin - Categories</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back to home
          </Link>
        </div>

        {showSuccess ? (
          <p className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800">
            Category created successfully.
          </p>
        ) : null}

        {showError ? (
          <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800">
            Category could not be created. Please check fields and try again.
          </p>
        ) : null}

        <section className="rounded-xl bg-white p-6 ring-1 ring-zinc-200">
          <h2 className="text-xl font-semibold">Add Category</h2>
          <form action="/api/admin/categories" method="post" className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Category Name</label>
              <input
                name="name"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Parent Category (Optional)</label>
              <select
                name="parent_id"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              >
                <option value="">No parent</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Create Category
              </button>
            </div>
          </form>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Category List</h2>
          <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-zinc-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Parent</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => {
                  const parent = categories.find((item) => item.id === category.parent_id);
                  return (
                    <tr key={category.id} className="border-t border-zinc-200">
                      <td className="px-4 py-3">{category.name}</td>
                      <td className="px-4 py-3">{category.slug}</td>
                      <td className="px-4 py-3">{parent?.name ?? "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
