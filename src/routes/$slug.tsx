import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getPartner } from "@/data/partners";
import { eventsByPartner, type Event } from "@/data/events";
import { EventCard } from "@/components/site/EventCard";
import { SectionDivider } from "@/components/site/SectionDivider";
import { RippleButton } from "@/components/site/RippleButton";
import { BackgroundSevens, SevenGlyph } from "@/components/site/SevenGlyph";
import { CursorGlow } from "@/components/site/CursorGlow";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { SplitText } from "@/components/site/SplitText";
import { InstagramIcon } from "@/components/site/icons";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const partner = getPartner(params.slug);
    if (!partner) throw notFound();
    return { partner, events: eventsByPartner(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Sete × ${loaderData.partner.name} — sete.bio` },
          {
            name: "description",
            content: `Próximos eventos e listas do Sete na ${loaderData.partner.name}, ${loaderData.partner.city}.`,
          },
          { property: "og:title", content: `Sete × ${loaderData.partner.name}` },
        ]
      : [{ title: "Parceiro não encontrado — sete.bio" }, { name: "robots", content: "noindex" }],
  }),
  component: PartnerPage,
  notFoundComponent: () => (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="animate-seven-respire inline-block">
        <SevenGlyph size={140} outline />
      </span>
      <div className="text-xl font-bold">Parceiro não encontrado</div>
      <Link to="/" className="mono text-xs text-accent-red-glow underline">
        voltar para sete.bio
      </Link>
    </div>
  ),
});

function PartnerPage() {
  const { partner, events } = Route.useLoaderData();

  return (
    <div className="relative min-h-screen grain">
      <AuroraBackground />
      <BackgroundSevens />
      <CursorGlow />

      <div className="mx-auto max-w-xl px-4 py-10">
        <Link
          to="/"
          className="mono inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          ← sete.bio
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7 }}
          className="mt-6"
        >
          <div className="mono text-[10px] uppercase tracking-widest text-accent-red-glow">
            Sete × parceiro
          </div>
          <h1 className="mt-1 text-5xl font-bold tracking-tight">
            <SplitText text={partner.name} />
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{partner.tagline}</p>
          <div className="mono mt-1 text-xs text-muted-foreground">{partner.city}</div>
        </motion.header>

        <div className="mt-6 flex flex-wrap gap-3">
          <RippleButton
            onClick={() => window.open(partner.contactUrl, "_blank")}
            className="red-border-glow animate-cta-pulse rounded-xl bg-accent-red px-5 py-3 text-sm font-bold uppercase tracking-wider text-white"
          >
            Comprar ingresso / lista
          </RippleButton>
          <a
            href={`https://instagram.com/${partner.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="hover-red-border inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium"
          >
            <InstagramIcon size={18} />
            <span className="mono">@{partner.instagram}</span>
          </a>
        </div>

        <SectionDivider label="Próximos eventos" />

        {events.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 py-12 text-center text-muted-foreground">
            <span className="animate-seven-respire inline-block">
              <SevenGlyph size={56} outline />
            </span>
            <div className="text-sm">Nenhum evento programado por aqui.</div>
          </div>
        ) : (
          <div className="grid gap-3">
            {events.map((e: Event, i: number) => (
              <EventCard key={e.id} event={e} index={i} />
            ))}
          </div>
        )}

        <footer className="mt-16 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="mono">sete.bio/{partner.slug}</span>
          <span className="animate-seven-fade">
            <SevenGlyph size={14} />
          </span>
        </footer>
      </div>
    </div>
  );
}
