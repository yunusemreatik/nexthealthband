import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClientLayoutWrapper from "@/app/components/layout/ClientLayoutWrapper";
import FadeIn from "@/app/components/shared/FadeIn";
import { supabase } from "@/lib/supabaseClient";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

async function getPost(slug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Bulunamadı" };
  return { title: `${post.title} — Blog`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <ClientLayoutWrapper>
      <article className="py-24 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link href="/tr/blog" className="inline-flex items-center gap-2 text-muted hover:text-accent text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Blog&apos;a Dön
            </Link>

            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-2xl mb-8"
              />
            )}

            <p className="text-xs text-muted flex items-center gap-1.5 mb-4">
              <Calendar className="w-3.5 h-3.5" />
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
                : "—"}{" "}
              · {post.author}
            </p>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <p className="text-muted text-lg mb-8 leading-relaxed border-l-4 border-accent pl-4">{post.excerpt}</p>

            <div
              className="prose prose-sm md:prose max-w-none text-text leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </FadeIn>
        </div>
      </article>
    </ClientLayoutWrapper>
  );
}
