import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabaseClient";

const BASE_URL = "https://nexthealthband.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, published_at")
    .eq("is_published", true);

  const staticPages = ["/", "/urun", "/uygulama", "/hakkimizda", "/blog", "/iletisim"];
  const locales = ["tr", "en"];

  const pages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      pages.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "/" ? 1 : 0.8,
      });
    }
  }

  for (const post of posts ?? []) {
    for (const locale of locales) {
      pages.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return pages;
}
