import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight, Calendar } from "lucide-react";
import FadeIn from "../shared/FadeIn";
import { supabase } from "@/lib/supabaseClient";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  published_at: string | null;
  author: string;
}

async function getPosts(): Promise<BlogPost[]> {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image, published_at, author")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3);
  return data ?? [];
}

export default async function BlogPreview() {
  const [posts, t, locale] = await Promise.all([
    getPosts(),
    getTranslations("blog"),
    getLocale(),
  ]);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold">{t("title")}</h2>
            <p className="text-muted mt-2">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="hidden md:inline-flex items-center gap-2 text-accent font-semibold hover:underline"
          >
            {t("allPosts")} <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.1}>
              <Link href={`/${locale}/blog/${post.slug}`} className="group block">
                <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-accent transition-all">
                  <div className="bg-accent-soft h-48 flex items-center justify-center">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-accent" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-muted mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
                        : "—"}
                    </p>
                    <h3 className="font-display font-bold text-lg group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
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
      </div>
    </section>
  );
}
