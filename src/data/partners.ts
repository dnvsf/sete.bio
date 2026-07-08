export type Partner = {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  instagram: string;
  contactUrl: string;
  logoUrl?: string;
  accent?: string;
  active: boolean;
  order: number;
};

/**
 * Fonte de dados dos parceiros.
 *
 * TODO (admin): substituir este array por uma fonte remota (Cloud/DB) mantendo
 * a assinatura das funções abaixo. A UI e as rotas dependem apenas de:
 *  - getPartner(slug)
 *  - listActivePartners()
 * O tipo Partner acima é o contrato que o admin vai preencher.
 */
export const partners: Partner[] = [];

export function getPartner(slug: string) {
  return partners.find((p) => p.slug === slug && p.active);
}

export function listActivePartners() {
  return partners.filter((p) => p.active).sort((a, b) => a.order - b.order);
}
