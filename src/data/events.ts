export type Event = {
  id: string;
  title: string;
  partnerSlug: string;
  partnerName: string;
  city: string;
  date: string; // ISO
  listUrl: string; // link da lista (comissão)
  ticketUrl?: string;
};

// Placeholder: substitua conforme fecha parcerias.
const now = new Date();
function daysFromNow(d: number, h = 23) {
  const dt = new Date(now);
  dt.setDate(dt.getDate() + d);
  dt.setHours(h, 0, 0, 0);
  return dt.toISOString();
}

export const events: Event[] = [
  {
    id: "1",
    title: "OPEN BAR — Sextou",
    partnerSlug: "side",
    partnerName: "SIDE",
    city: "São Paulo",
    date: daysFromNow(2, 23),
    listUrl: "https://wa.me/5511999999999?text=Lista%20SETE%20-%20SIDE",
    ticketUrl: "https://sympla.com.br",
  },
  {
    id: "2",
    title: "SETE Presents · Techno Night",
    partnerSlug: "side",
    partnerName: "SIDE",
    city: "São Paulo",
    date: daysFromNow(5, 23),
    listUrl: "https://wa.me/5511999999999?text=Lista%20SETE%20-%20Techno",
  },
  {
    id: "3",
    title: "Rooftop Session",
    partnerSlug: "sky",
    partnerName: "SKY Club",
    city: "São Paulo",
    date: daysFromNow(6, 22),
    listUrl: "https://wa.me/5511999999999?text=Lista%20SETE%20-%20SKY",
  },
];

export function eventsThisWeek() {
  const in7 = new Date();
  in7.setDate(in7.getDate() + 7);
  return events
    .filter((e) => new Date(e.date) >= new Date() && new Date(e.date) <= in7)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

export function eventsByPartner(slug: string) {
  return events
    .filter((e) => e.partnerSlug === slug)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
}
