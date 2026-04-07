import { supabaseAdmin } from "@/lib/supabaseAdmin";
import WhatsAppButton from "./WhatsAppButton";

async function getWhatsAppPhone(): Promise<string> {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("value")
    .eq("key", "whatsapp_phone")
    .single();
  return data?.value ?? "905000000000";
}

export default async function WhatsAppServerButton() {
  const phone = await getWhatsAppPhone();
  return <WhatsAppButton phone={phone} />;
}
