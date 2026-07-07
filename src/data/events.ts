export type Event = {
  id: string;
  title: string;
  partnerSlug: string;
  partnerName: string;
  city: string;
  date: string; // ISO
  listUrl: string;
  ticketUrl?: string;
};

// Sem eventos no momento — preencha quando fechar parcerias.
export const events: Event[] = [];

export function eventsThisWeek() {
  const in7 = new Date();
  in7.setDate(in7.getDate() + 7);
  return events
    .filter((e) => new Date(e.date) >= new Date() && new Date(e.date) <= in7)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

export function nextEvents(limit = 5) {
  return events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))
    .slice(0, limit);
}

export function eventsByPartner(slug: string) {
  return events
    .filter((e) => e.partnerSlug === slug)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
}
