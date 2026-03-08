import { NextResponse } from "next/server";
import { insertIntoSupabase } from "@/lib/supabase-rest";

function stringValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const buyerName = stringValue(formData, "buyer_name");
    const buyerEmail = stringValue(formData, "buyer_email");
    const companyName = stringValue(formData, "company_name");
    const country = stringValue(formData, "country");
    const productId = stringValue(formData, "product_id");
    const supplierId = stringValue(formData, "supplier_id");
    const message = stringValue(formData, "message");
    const quantityRaw = stringValue(formData, "quantity");
    const quantity = Number.parseInt(quantityRaw, 10);

    if (
      !buyerName ||
      !buyerEmail ||
      !country ||
      !productId ||
      !supplierId ||
      !message ||
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      return NextResponse.redirect(new URL("/rfq?error=1", request.url));
    }

    await insertIntoSupabase("rfqs", {
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      company_name: companyName || null,
      country,
      product_id: productId,
      supplier_id: supplierId,
      message,
      quantity,
    });

    return NextResponse.redirect(new URL("/rfq?success=1", request.url));
  } catch {
    return NextResponse.redirect(new URL("/rfq?error=1", request.url));
  }
}
