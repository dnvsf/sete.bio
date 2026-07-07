export type Partner = {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  instagram: string; // @handle
  contactUrl: string; // wa.me / ig.me
  accent?: string;
};

export const partners: Partner[] = [
  {
    slug: "side",
    name: "SIDE",
    tagline: "Techno & House · underground nights",
    city: "São Paulo",
    instagram: "side.club",
    contactUrl: "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vim%20pelo%20SETE",
    accent: "#B00000",
  },
  {
    slug: "sky",
    name: "SKY Club",
    tagline: "Rooftop · open air",
    city: "São Paulo",
    instagram: "sky.club",
    contactUrl: "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vim%20pelo%20SETE",
    accent: "#B00000",
  },
];

export function getPartner(slug: string) {
  return partners.find((p) => p.slug === slug);
}
