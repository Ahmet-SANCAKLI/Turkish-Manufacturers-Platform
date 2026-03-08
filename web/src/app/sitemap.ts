import type { MetadataRoute } from "next";
import { fetchFromSupabase } from "@/lib/supabase-rest";
import { getSiteUrl } from "@/lib/site-url";

type SupplierSlug = { slug: string };
type ProductSlug = { slug: string };
type CategorySlug = { slug: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const [suppliers, products, categories] = await Promise.all([
    fetchFromSupabase<SupplierSlug[]>("companies?select=slug"),
    fetchFromSupabase<ProductSlug[]>("products?select=slug"),
    fetchFromSupabase<CategorySlug[]>("categories?select=slug"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/suppliers`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/categories`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/rfq`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/supplier/apply`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const supplierRoutes: MetadataRoute.Sitemap = suppliers.map((supplier) => ({
    url: `${siteUrl}/suppliers/${supplier.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/categories/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...supplierRoutes, ...productRoutes, ...categoryRoutes];
}
