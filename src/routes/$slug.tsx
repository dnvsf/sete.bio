import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { EventCard } from "@/components/site/EventCard";
import { SectionDivider } from "@/components/site/SectionDivider";
import { RippleButton } from "@/components/site/RippleButton";
import { BackgroundSevens, SevenGlyph } from "@/components/site/SevenGlyph";
import { CursorGlow } from "@/components/site/CursorGlow";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { SplitText } from "@/components/site/SplitText";
import { InstagramIcon } from "@/components/site/icons";
import { getPartnerBundle } from "@/lib/publicData.functions";

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    const result = await getPartnerBundle({ data: { slug: params.slug } });
    if (result.kind === "redirect") {
      throw redirect({ href: result.url });
    }
    if (result.kind === "notfound") throw notFound();
    return { partner: result.partner, events: result.events };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Sete × ${loaderData.partner.name} — sete.bio` },
          {
            name: "description",
            content:
              loaderData.partner.tagline ||
              `Programação e contato do Sete na ${loaderData.partner.name}.`,
          },
          { property: "og:title", content: `Sete × ${loaderData.partner.name}` },
          {
            property: "og:description",
            content:
              loaderData.partner.tagline ||
              `Programação e contato do Sete na ${loaderData.partner.name}.`,
          },
          ...(loaderData.partner.logo_url
            ? [{ property: "og:image", content: loaderData.partner.logo_url }]
            : []),
        ]
      : [{ title: "Parceiro não encontrado — sete.bio" }, { name: "robots", content: "noindex" }],
  }),
  component: PartnerPage,
  errorComponent: ({ error }) => (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-3 px-4 text-center">
      <div className="text-lg font-semibold">Algo deu errado</div>
      <div className="text-sm text-muted-foreground">{error.message}</div>
      <Link to="/" className="mono text-xs text-accent-black underline">
        voltar para sete.bio
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="animate-seven-respire inline-block">
        <SevenGlyph size={140} outline />
      </span>
      <div className="text-xl font-bold">Nada aqui</div>
      <Link to="/" className="mono text-xs text-accent-black underline">
        voltar para sete.bio
      </Link>
    </div>
  ),
});

function PartnerPage() {
  const { partner, events } = Route.useLoaderData();

  return (
    <PageShell>
      <Link
        to="/"
        className="mono text-fluid-meta inline-flex items-center gap-1 uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
      >
        ← sete.bio
      </Link>

      <PageHeader
        title={<SplitText text={partner.name} />}
        eyebrow="Sete × parceiro"
        subtitle={partner.tagline || undefined}
      >
        {partner.city && (
          <div className="mono text-fluid-meta mt-1 text-muted-foreground">{partner.city}</div>
        )}
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2">
        {partner.contact_url && (
          <RippleButton
            onClick={() => window.open(partner.contact_url!, "_blank")}
            className="tap-target text-fluid-meta w-full rounded-xl bg-foreground px-4 py-3 font-bold uppercase tracking-widest text-background"
          >
            Contato do parceiro
          </RippleButton>
        )}
        {partner.instagram && (
          <a
            href={`https://instagram.com/${partner.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="hover-black-border tap-target inline-flex items-center justify-center gap-2 rounded-xl border border-black/8 bg-card px-4 py-3 text-sm font-medium"
          >
            <InstagramIcon size={18} />
            <span className="mono truncate">@{partner.instagram}</span>
          </a>
        )}
      </div>

      <SectionDivider label="Programação" />

      {events.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-black/10 py-12 text-center text-muted-foreground">
          <span className="animate-seven-respire inline-block">
            <SevenGlyph size={56} outline />
          </span>
          <div className="text-fluid-body">Sem programação por enquanto.</div>
        </div>
      ) : (
        <div className="grid gap-3">
          {events.map((e: (typeof events)[number], i: number) => (
            <EventCard key={e.id} event={e} index={i} />
          ))}
        </div>
      )}

      <footer className="mono text-fluid-meta mt-16 flex items-center justify-center gap-2 text-muted-foreground">
        <span>sete.bio/{partner.slug}</span>
      </footer>
    </PageShell>
  );
}

