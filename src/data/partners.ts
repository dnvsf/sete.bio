export type Partner = {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  instagram: string;
  contactUrl: string;
  accent?: string;
};

// Sem parcerias ativas no momento — adicione aqui conforme fechar.
export const partners: Partner[] = [];

export function getPartner(slug: string) {
  return partners.find((p) => p.slug === slug);
}
