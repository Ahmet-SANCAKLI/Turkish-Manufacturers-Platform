import { NextResponse } from "next/server";
import { insertIntoSupabase } from "@/lib/supabase-rest";

function stringValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const companyName = stringValue(formData, "company_name");
    const contactName = stringValue(formData, "contact_name");
    const email = stringValue(formData, "email");
    const country = stringValue(formData, "country");
    const city = stringValue(formData, "city");
    const website = stringValue(formData, "website");
    const description = stringValue(formData, "description");

    if (!companyName || !contactName || !email || !country) {
      return NextResponse.redirect(new URL("/supplier/apply?error=1", request.url));
    }

    await insertIntoSupabase("supplier_applications", {
      company_name: companyName,
      contact_name: contactName,
      email,
      country,
      city: city || null,
      website: website || null,
      description: description || null,
      status: "pending",
    });

    return NextResponse.redirect(new URL("/supplier/apply?success=1", request.url));
  } catch {
    return NextResponse.redirect(new URL("/supplier/apply?error=1", request.url));
  }
}
