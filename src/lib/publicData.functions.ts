import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function getClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type SiteSettingsDTO = {
  display_name: string | null;
  tagline_short: string | null;
  business_contact_url: string | null;
  business_contact_label: string | null;
};

export type SocialDTO = {
  platform: string;
  handle: string;
  url: string | null;
  youtube_video_id: string | null;
};

export type PartnerDTO = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  city: string | null;
  instagram: string | null;
  contact_url: string | null;
  logo_url: string | null;
  accent: string | null;
};

export type EventDTO = {
  id: string;
  title: string;
  city: string | null;
  date: string;
  list_url: string | null;
  ticket_url: string | null;
};

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getClient();
  const { data } = await sb
    .from("site_settings")
    .select("display_name, tagline_short, business_contact_url, business_contact_label")
    .limit(1)
    .maybeSingle();
  return (data ?? null) as SiteSettingsDTO | null;
});

export const listSocials = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getClient();
  const { data } = await sb
    .from("socials")
    .select("platform, handle, url, youtube_video_id")
    .eq("is_active", true)
    .order("position", { ascending: true });
  return (data ?? []) as SocialDTO[];
});

export const getPartnerBundle = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const sb = getClient();

    // 1) short_link first
    const { data: link } = await sb
      .from("short_links")
      .select("destination_url, is_active")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .maybeSingle();
    if (link?.destination_url) {
      return { kind: "redirect" as const, url: link.destination_url };
    }

    // 2) partner
    const { data: partner } = await sb
      .from("partners")
      .select("id, slug, name, tagline, city, instagram, contact_url, logo_url, accent")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .maybeSingle();
    if (!partner) return { kind: "notfound" as const };

    const nowIso = new Date().toISOString();
    const { data: events } = await sb
      .from("events")
      .select("id, title, city, date, list_url, ticket_url")
      .eq("partner_id", partner.id)
      .eq("is_active", true)
      .gte("date", nowIso)
      .order("date", { ascending: true });

    return {
      kind: "partner" as const,
      partner: partner as PartnerDTO,
      events: (events ?? []) as EventDTO[],
    };
  });
