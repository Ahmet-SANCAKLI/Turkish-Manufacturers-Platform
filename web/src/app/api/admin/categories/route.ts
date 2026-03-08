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

async function createUniqueCategorySlug(base: string) {
  const baseSlug = slugify(base) || "category";
  const existing = await fetchFromSupabase<{ slug: string }[]>(
    `categories?select=slug&slug=like.${encodeURIComponent(baseSlug)}*&limit=100`,
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
    const parentId = stringValue(formData, "parent_id");

    if (!name) {
      return NextResponse.redirect(new URL("/admin/categories?error=1", request.url));
    }

    const slug = await createUniqueCategorySlug(name);
    await insertIntoSupabase("categories", {
      name,
      slug,
      parent_id: parentId || null,
    });

    return NextResponse.redirect(new URL("/admin/categories?success=1", request.url));
  } catch {
    return NextResponse.redirect(new URL("/admin/categories?error=1", request.url));
  }
}
