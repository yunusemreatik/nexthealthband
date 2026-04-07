import { supabase } from "@/lib/supabaseClient";
import ClientLayoutWrapper from "@/app/components/layout/ClientLayoutWrapper";
import Hero from "@/app/components/home/Hero";
import BandShowcase from "@/app/components/home/BandShowcase";
import HealthStats from "@/app/components/home/HealthStats";
import AppIntegration from "@/app/components/home/AppIntegration";
import StatsCounter from "@/app/components/home/StatsCounter";
import WhyBand from "@/app/components/home/WhyBand";
import BlogPreview from "@/app/components/home/BlogPreview";
import FAQSection from "@/app/components/home/FAQSection";
import ContactCTA from "@/app/components/home/ContactCTA";

export const revalidate = 60;

async function getFAQs() {
  const { data } = await supabase
    .from("faqs")
    .select("id, question, answer")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export default async function HomePage() {
  const faqs = await getFAQs();

  return (
    <ClientLayoutWrapper>
      <Hero />
      <BandShowcase />
      <HealthStats />
      <AppIntegration />
      <StatsCounter />
      <WhyBand />
      <BlogPreview />
      <FAQSection faqs={faqs} />
      <ContactCTA />
    </ClientLayoutWrapper>
  );
}
