import { supabase } from "@/lib/supabaseClient";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import ClientLayoutWrapper from "@/app/components/layout/ClientLayoutWrapper";
import Hero from "@/app/components/home/Hero";
import BandShowcase from "@/app/components/home/BandShowcase";
import HealthStats from "@/app/components/home/HealthStats";
import AppIntegration from "@/app/components/home/AppIntegration";
import StatsCounter from "@/app/components/home/StatsCounter";
import WhyBand from "@/app/components/home/WhyBand";
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

async function getHeroData() {
  const { data } = await supabaseAdmin.from("hero_sections").select("*").eq("id", 1).single();
  return data;
}

export default async function HomePage() {
  const [faqs, heroData] = await Promise.all([getFAQs(), getHeroData()]);

  return (
    <ClientLayoutWrapper>
      <Hero data={heroData} />
      <BandShowcase />
      <HealthStats />
      <AppIntegration />
      <StatsCounter />
      <WhyBand />
      <FAQSection faqs={faqs} />
      <ContactCTA />
    </ClientLayoutWrapper>
  );
}
