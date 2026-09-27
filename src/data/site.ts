export type SocialLink = {
  platform: "Instagram" | "YouTube" | "TikTok" | "Facebook" | "Discord";
  handle: string;
  href: string;
};

export type PartnerEvent = {
  id: string;
  title: string;
  city?: string;
  date: string;
  listUrl?: string;
  ticketUrl?: string;
};

export type Partner = {
  slug: string;
  name: string;
  tagline?: string;
  city?: string;
  instagram?: string;
  contactUrl?: string;
  events: PartnerEvent[];
};

export const siteConfig = {
  liveOnline: true,
  liveUrl: "https://www.tiktok.com/@setexxl/live",
  partnershipEmail: "contact@sete.cc",
  socials: [
    { platform: "Instagram", handle: "@setexxl", href: "https://instagram.com/setexxl" },
    { platform: "YouTube", handle: "@canaldosete", href: "https://youtube.com/@canaldosete" },
    { platform: "TikTok", handle: "@setexxl", href: "https://tiktok.com/@setexxl" },
    { platform: "Facebook", handle: "setexxl", href: "https://facebook.com/setexxl" },
    { platform: "Discord", handle: "Comunidade", href: "https://discord.gg/YtFk3QCSFv" },
  ] satisfies SocialLink[],
} as const;

// Edite este catálogo e envie ao GitHub para publicar parceiros e eventos.
export const partners: Partner[] = [
  {
    slug: "side",
    name: "Side",
    tagline: "Programação, listas e ingressos.",
    instagram: "side",
    events: [],
  },
  {
    slug: "biker",
    name: "Sete Biker",
    tagline: "Entregas, rotina e parcerias.",
    instagram: "setebiker_",
    contactUrl: "https://ig.me/m/setexxl",
    events: [],
  },
];

export const shortLinks: Record<string, string> = {};

export function getPartner(slug: string) {
  return partners.find((partner) => partner.slug === slug);
}
