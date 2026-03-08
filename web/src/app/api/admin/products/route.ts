import { NextResponse } from "next/server";
import { fetchFromSupabase, insertIntoSupabase } from "@/lib/supabase-rest";

function stringValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createUniqueProductSlug(base: string) {
  const baseSlug = slugify(base) || "product";
  const existing = await fetchFromSupabase<{ slug: string }[]>(
    `products?select=slug&slug=like.${encodeURIComponent(baseSlug)}*&limit=100`,
  );
  const used = new Set(existing.map((item) => item.slug));

  if (!used.has(baseSlug)) {
    return baseSlug;
  }

  let i = 2;
  while (used.has(`${baseSlug}-${i}`)) {
    i += 1;
  }
  return `${baseSlug}-${i}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = stringValue(formData, "name");
    const companyId = stringValue(formData, "company_id");
    const categoryId = stringValue(formData, "category_id");
    const description = stringValue(formData, "description");
    const imageUrl = stringValue(formData, "image_url");
    const moqRaw = stringValue(formData, "moq");
    const moq = Number.parseInt(moqRaw, 10);

    if (!name || !companyId || !categoryId || !Number.isFinite(moq) || moq <= 0) {
      return NextResponse.redirect(new URL("/admin/products?error=1", request.url));
    }

    const slug = await createUniqueProductSlug(name);
    await insertIntoSupabase("products", {
      company_id: companyId,
      category_id: categoryId,
      name,
      slug,
      description: description || null,
      moq,
      image_url: imageUrl || null,
    });

    return NextResponse.redirect(new URL("/admin/products?success=1", request.url));
  } catch {
    return NextResponse.redirect(new URL("/admin/products?error=1", request.url));
  }
}
