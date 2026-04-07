import type { Metadata } from "next";
import Link from "next/link";
import ClientLayoutWrapper from "@/app/components/layout/ClientLayoutWrapper";
import FadeIn from "@/app/components/shared/FadeIn";
import { supabase } from "@/lib/supabaseClient";
import { ArrowRight, Calendar } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { getSeoMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata(
    "blog",
    "Blog — Next Health Band",
    "Sağlık ve teknoloji hakkında güncel yazılar."
  );
}

export const revalidate = 60;

async function getPosts() {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image, published_at, author")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  return data ?? [];
}

export default async function BlogPage() {
  const [posts, locale, t] = await Promise.all([
    getPosts(),
    getLocale(),
    getTranslations("blog")
  ]);

  return (
    <ClientLayoutWrapper>
      <section className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h1 className="font-display text-5xl font-bold">{t("title")}</h1>
            <p className="text-muted mt-3">{t("subtitle")}</p>
          </FadeIn>

          {posts.length === 0 ? (
            <FadeIn className="text-center text-muted py-24">
              {locale === "tr" ? "Henüz blog yazısı yok." : "No blog posts yet."}
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <FadeIn key={post.id} delay={i * 0.05}>
                  <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
                    <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-accent transition-all h-full flex flex-col">
                      <div className="bg-accent-soft h-48 flex items-center justify-center flex-shrink-0">
                        {post.cover_image ? (
                          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                          <Calendar className="w-8 h-8 text-accent" />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-xs text-muted mb-2 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", { day: "numeric", month: "long", year: "numeric" })
                            : "—"}
                        </p>
                        <h2 className="font-display font-bold text-xl group-hover:text-accent transition-colors line-clamp-2 flex-1">
                          {post.title}
                        </h2>
                        <p className="text-muted text-sm mt-2 line-clamp-3">{post.excerpt}</p>
                        <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold mt-4">
                          {t("readMore")} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </ClientLayoutWrapper>
  );
}
