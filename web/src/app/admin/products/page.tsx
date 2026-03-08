import Link from "next/link";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type Product = {
  id: string;
  name: string;
  slug: string;
  moq: number | null;
  created_at: string;
  company: { name: string } | null;
  category: { name: string } | null;
};

type Company = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const [products, companies, categories] = await Promise.all([
    fetchFromSupabase<Product[]>(
      "products?select=id,name,slug,moq,created_at,company:companies(name),category:categories(name)&order=created_at.desc",
    ),
    fetchFromSupabase<Company[]>("companies?select=id,name&order=name.asc"),
    fetchFromSupabase<Category[]>("categories?select=id,name&order=name.asc"),
  ]);

  const showSuccess = params.success === "1";
  const showError = params.error === "1";

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin - Products</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back to home
          </Link>
        </div>

        {showSuccess ? (
          <p className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800">
            Product created successfully.
          </p>
        ) : null}

        {showError ? (
          <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800">
            Product could not be created. Please check fields and try again.
          </p>
        ) : null}

        <section className="rounded-xl bg-white p-6 ring-1 ring-zinc-200">
          <h2 className="text-xl font-semibold">Add Product</h2>
          <form action="/api/admin/products" method="post" className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Product Name</label>
              <input
                name="name"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Company</label>
              <select
                name="company_id"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              >
                <option value="">Select company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Category</label>
              <select
                name="category_id"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">MOQ</label>
              <input
                name="moq"
                type="number"
                min={1}
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Description</label>
              <textarea
                name="description"
                rows={4}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Image URL (Optional)</label>
              <input
                name="image_url"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Create Product
              </button>
            </div>
          </form>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Product List</h2>
          <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-zinc-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">MOQ</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-zinc-200">
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(product.created_at)}</td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.slug}</td>
                    <td className="px-4 py-3">{product.company?.name ?? "-"}</td>
                    <td className="px-4 py-3">{product.category?.name ?? "-"}</td>
                    <td className="px-4 py-3">{product.moq ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
