import Link from "next/link";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type SupplierApplication = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  country: string;
  city: string | null;
  website: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

export default async function AdminSuppliersPage() {
  const applications = await fetchFromSupabase<SupplierApplication[]>(
    "supplier_applications?select=id,company_name,contact_name,email,country,city,website,status,created_at&order=created_at.desc",
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin - Supplier Applications</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back to home
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-xl bg-white p-6 ring-1 ring-zinc-200">
            <p className="text-zinc-600">No supplier applications yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-zinc-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Website</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id} className="border-t border-zinc-200 align-top">
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(application.created_at)}</td>
                    <td className="px-4 py-3 font-medium">{application.company_name}</td>
                    <td className="px-4 py-3">{application.contact_name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{application.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {application.city ?? "-"}, {application.country}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{application.website ?? "-"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium">
                        {application.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {application.status === "pending" ? (
                        <form
                          action={`/api/admin/supplier-applications/${application.id}/approve`}
                          method="post"
                        >
                          <button
                            type="submit"
                            className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700"
                          >
                            Approve
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-zinc-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
