import Link from "next/link";
import { fetchFromSupabase } from "@/lib/supabase-rest";

type RfqRow = {
  id: string;
  buyer_name: string;
  buyer_email: string;
  company_name: string | null;
  country: string | null;
  message: string;
  quantity: number | null;
  created_at: string;
  supplier: { name: string } | null;
  product: { name: string } | null;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

export default async function AdminRfqsPage() {
  const rfqs = await fetchFromSupabase<RfqRow[]>(
    "rfqs?select=id,buyer_name,buyer_email,company_name,country,message,quantity,created_at,supplier:companies(name),product:products(name)&order=created_at.desc",
  );

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin - RFQ List</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back to home
          </Link>
        </div>

        {rfqs.length === 0 ? (
          <div className="rounded-xl bg-white p-6 ring-1 ring-zinc-200">
            <p className="text-zinc-600">No RFQ records yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-zinc-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Buyer</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Supplier</th>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Qty</th>
                  <th className="px-4 py-3 font-semibold">Country</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                </tr>
              </thead>
              <tbody>
                {rfqs.map((rfq) => (
                  <tr key={rfq.id} className="border-t border-zinc-200 align-top">
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(rfq.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{rfq.buyer_name}</div>
                      <div className="text-zinc-500">{rfq.company_name ?? "-"}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{rfq.buyer_email}</td>
                    <td className="px-4 py-3">{rfq.supplier?.name ?? "-"}</td>
                    <td className="px-4 py-3">{rfq.product?.name ?? "-"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{rfq.quantity ?? "-"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{rfq.country ?? "-"}</td>
                    <td className="px-4 py-3 min-w-80">{rfq.message}</td>
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
