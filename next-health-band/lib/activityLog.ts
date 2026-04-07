import { supabaseAdmin } from "./supabaseAdmin";

export async function logActivity(
  adminEmail: string,
  action: string,
  entity: string,
  entityId?: string | number
) {
  await supabaseAdmin.from("activity_logs").insert({
    admin_email: adminEmail,
    action,
    entity,
    entity_id: entityId ? String(entityId) : null,
  });
}
