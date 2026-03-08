import { NextResponse } from "next/server";
import { fetchFromSupabase, insertIntoSupabase, patchSupabase } from "@/lib/supabase-rest";
import { sendEmail } from "@/lib/email";

type SupplierApplication = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  country: string;
  city: string | null;
  website: string | null;
  description: string | null;
  status: "pending" | "approved" | "rejected";
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const applications = await fetchFromSupabase<SupplierApplication[]>(
      `supplier_applications?id=eq.${id}&select=id,company_name,contact_name,email,country,city,website,description,status&limit=1`,
    );
    const application = applications[0];

    if (!application || application.status !== "pending") {
      return NextResponse.redirect(new URL("/admin/suppliers", request.url));
    }

    const companySlug = `${slugify(application.company_name) || "company"}-${application.id.slice(0, 8)}`;
    const createdCompanies = await fetchFromSupabase<{ id: string }[]>(
      `companies?select=id&slug=eq.${companySlug}`,
    );

    let approvedCompanyId = createdCompanies[0]?.id;
    if (!approvedCompanyId) {
      const newCompany = {
        name: application.company_name,
        slug: companySlug,
        description: application.description,
        country: application.country,
        city: application.city,
        website: application.website,
        verified: false,
      };

      await insertIntoSupabase("companies", newCompany);
      const inserted = await fetchFromSupabase<{ id: string }[]>(
        `companies?select=id&slug=eq.${companySlug}&limit=1`,
      );
      approvedCompanyId = inserted[0]?.id;
    }

    await patchSupabase(`supplier_applications?id=eq.${application.id}`, {
      status: "approved",
      reviewed_by: "admin",
      reviewed_at: new Date().toISOString(),
      approved_company_id: approvedCompanyId ?? null,
    });

    try {
      await sendEmail({
        to: application.email,
        subject: "Your supplier application is approved",
        html: `
          <h2>Application Approved</h2>
          <p>Hello ${application.contact_name},</p>
          <p>Your supplier application for <strong>${application.company_name}</strong> has been approved.</p>
          <p>Our team will contact you for the next onboarding steps.</p>
        `,
      });
    } catch (error) {
      console.error("Supplier approval email failed", error);
    }

    return NextResponse.redirect(new URL("/admin/suppliers", request.url));
  } catch {
    return NextResponse.redirect(new URL("/admin/suppliers", request.url));
  }
}
