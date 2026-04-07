import { Metadata } from 'next';
import { supabaseAdmin } from './supabaseAdmin';

export async function getSeoMetadata(page: string, fallbackTitle: string, fallbackDescription: string): Promise<Metadata> {
  const { data } = await supabaseAdmin
    .from('seo_meta')
    .select('title, description, og_image')
    .eq('page', page)
    .single();

  const title = data?.title || fallbackTitle;
  const description = data?.description || fallbackDescription;

  return {
    title: title,
    description: description,
    openGraph: data?.og_image ? {
      images: [data.og_image],
    } : undefined
  };
}
