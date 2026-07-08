import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BackgroundSevens, SevenGlyph } from "@/components/site/SevenGlyph";
import { CursorGlow } from "@/components/site/CursorGlow";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { RevealOnView } from "@/components/site/RevealOnView";
import { SectionDivider } from "@/components/site/SectionDivider";
import { SplitText } from "@/components/site/SplitText";
import { RippleButton } from "@/components/site/RippleButton";
import { mediakit } from "@/data/mediakit";

export const Route = createFileRoute("/mediakit")({
  head: () => ({
    meta: [
      { title: "Mediakit — sete.bio" },
      {
        name: "description",
        content:
          "Mediakit do Sete (@setexxl): bio, números, público, formatos e contato comercial.",
      },
      { property: "og:title", content: "Mediakit — Sete · @setexxl" },
      {
        property: "og:description",
        content: "Bio, números, público e formatos para parcerias.",
      },
    ],
  }),
  component: MediakitPage,
});

function MediakitPage() {
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
            Mediakit · v1
          </div>
          <h1 className="mt-1 text-5xl font-bold tracking-tight">
            <SplitText text="Sete." />
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">{mediakit.bio}</p>
          <div className="mono mt-1 text-xs text-muted-foreground">{mediakit.location}</div>
        </motion.header>

        <SectionDivider label="Números" />
        <div className="grid grid-cols-2 gap-3">
          {mediakit.stats.map((s, i) => (
            <RevealOnView
              key={s.platform}
              delay={i * 0.05}
              className="hover-red-border rounded-2xl border border-white/8 bg-card/60 p-4 backdrop-blur-sm"
            >
              <div className="mono text-[10px] uppercase tracking-widest text-accent-red-glow">
                {s.platform}
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight">{s.value}</div>
              <div className="mono mt-0.5 text-[11px] text-muted-foreground">{s.handle}</div>
            </RevealOnView>
          ))}
        </div>

        <SectionDivider label="Público" />
        <RevealOnView className="grid gap-3 rounded-2xl border border-white/8 bg-card/60 p-5 backdrop-blur-sm">
          <div className="flex items-baseline justify-between">
            <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Faixa etária
            </span>
            <span className="text-sm font-bold">{mediakit.audience.age}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Gênero
            </span>
            <span className="text-sm font-bold">{mediakit.audience.gender}</span>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Regiões
            </span>
            <div className="flex flex-wrap justify-end gap-1">
              {mediakit.audience.regions.map((r) => (
                <span
                  key={r}
                  className="mono rounded-md border border-white/10 px-2 py-0.5 text-[10px]"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </RevealOnView>

        <SectionDivider label="Formatos" />
        <div className="grid gap-3 sm:grid-cols-2">
          {mediakit.formats.map((f, i) => (
            <RevealOnView
              key={f.title}
              delay={i * 0.06}
              className="hover-red-border rounded-2xl border border-white/8 bg-card/60 p-4 backdrop-blur-sm"
            >
              <div className="text-base font-bold">{f.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{f.description}</div>
            </RevealOnView>
          ))}
        </div>

        <SectionDivider label="Contato" />
        <RevealOnView className="rounded-2xl border border-white/8 bg-card/60 p-5 backdrop-blur-sm">
          <div className="mono text-[10px] uppercase tracking-widest text-accent-red-glow">
            Comercial
          </div>
          <div className="mt-1 text-xl font-bold">Vamos fechar</div>
          <div className="mt-1 text-xs text-muted-foreground">
            DM Instagram · {mediakit.contactLabel}
          </div>
          <RippleButton
            onClick={() => window.open(mediakit.contactUrl, "_blank")}
            className="animate-cta-pulse mt-4 rounded-lg bg-accent-red px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
          >
            Chamar no direct
          </RippleButton>
        </RevealOnView>

        <div className="mt-16 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="mono">sete.bio/mediakit</span>
          <span className="animate-seven-fade">
            <SevenGlyph size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}
