import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { BackgroundSevens, SevenGlyph } from "@/components/site/SevenGlyph";
import { CursorGlow } from "@/components/site/CursorGlow";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { TwitchCard } from "@/components/site/TwitchCard";
import { MiniSocialCard } from "@/components/site/MiniSocialCard";
import { YouTubeModal } from "@/components/site/YouTubeModal";
import { SectionDivider } from "@/components/site/SectionDivider";
import { EventCard } from "@/components/site/EventCard";
import { RippleButton } from "@/components/site/RippleButton";
import { RevealOnView } from "@/components/site/RevealOnView";
import { ScrambleText } from "@/components/site/ScrambleText";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/site/icons";
import { nextEvents } from "@/data/events";
import { listActivePartners } from "@/data/partners";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

const led = (offset: string): CSSProperties => ({ ["--led-offset" as never]: offset });

function Home() {
  const [ytOpen, setYtOpen] = useState(false);
  const upcoming = nextEvents(6);
  const partners = listActivePartners();

  return (
    <div className="relative min-h-screen grain">
      <AuroraBackground />
      <BackgroundSevens />
      <CursorGlow />

      <div className="relative mx-auto max-w-xl px-4 pb-24 pt-20 sm:pt-28">
        {/* Nome */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            <ScrambleText text="Sete" duration={650} />
            <span className="ml-1 text-accent-red-glow">.</span>
          </h1>
          <div className="mono mt-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            hub · sete.bio
          </div>
        </motion.div>

        {/* Twitch card */}
        <div className="mt-10" style={led("0s")}>
          <TwitchCard />
        </div>

        {/* Mini socials */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div style={led("1.5s")}>
            <MiniSocialCard
              label="Instagram"
              handle="setexxl"
              icon={<InstagramIcon size={28} />}
              href="https://instagram.com/setexxl"
              delay={0.15}
            />
          </div>
          <div style={led("3s")}>
            <MiniSocialCard
              label="TikTok"
              handle="setexxl"
              icon={<TikTokIcon size={28} />}
              href="https://tiktok.com/@setexxl"
              delay={0.22}
            />
          </div>
          <div style={led("4.5s")}>
            <MiniSocialCard
              label="YouTube"
              handle="setexxl"
              icon={<YouTubeIcon size={28} />}
              onClick={() => setYtOpen(true)}
              delay={0.29}
            />
          </div>
        </div>

        <YouTubeModal open={ytOpen} onClose={() => setYtOpen(false)} />

        {/* EVENTOS */}
        <SectionDivider label="Próximos rolês" />

        {upcoming.length === 0 ? (
          <RevealOnView className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 py-10 text-center text-muted-foreground">
            <span className="animate-seven-respire inline-block">
              <SevenGlyph size={56} outline />
            </span>
            <div className="text-sm">Nenhum rolê confirmado ainda.</div>
            <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
              em breve
            </div>
          </RevealOnView>
        ) : (
          <div className="grid gap-3">
            {upcoming.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} />
            ))}
          </div>
        )}

        {/* PARCEIROS */}
        <SectionDivider label="Casas parceiras" />
        {partners.length === 0 ? (
          <RevealOnView className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 py-10 text-center text-muted-foreground">
            <span className="animate-seven-respire inline-block">
              <SevenGlyph size={56} outline />
            </span>
            <div className="text-sm">Em breve.</div>
          </RevealOnView>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {partners.map((p, i) => (
              <RevealOnView key={p.slug} delay={i * 0.05}>
                <Link
                  to="/$slug"
                  params={{ slug: p.slug }}
                  className="hover-red-border group flex h-full flex-col items-start gap-1 rounded-2xl border border-white/8 bg-card/50 p-4"
                >
                  <div className="text-lg font-bold tracking-tight">{p.name}</div>
                  <div className="mono text-[10px] uppercase text-muted-foreground">/{p.slug}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{p.city}</div>
                </Link>
              </RevealOnView>
            ))}
          </div>
        )}

        {/* CONTATO */}
        <SectionDivider label="Business" />
        <div className="grid gap-3 sm:grid-cols-2">
          <RevealOnView>
            <a
              href="https://ig.me/m/setexxl"
              target="_blank"
              rel="noreferrer"
              className="hover-red-border group flex h-full flex-col justify-between rounded-2xl border border-white/8 bg-card/60 p-5"
            >
              <div>
                <div className="mono text-[10px] uppercase tracking-widest text-accent-red-glow">
                  Parcerias & mídia
                </div>
                <div className="mt-2 text-xl font-bold">Contato comercial</div>
                <div className="mt-1 text-xs text-muted-foreground">DM Instagram · @setexxl</div>
              </div>
              <RippleButton
                onClick={() => window.open("https://ig.me/m/setexxl", "_blank")}
                className="animate-cta-pulse mt-4 self-start rounded-lg bg-accent-red px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
              >
                Chamar no direct
              </RippleButton>
            </a>
          </RevealOnView>

          <RevealOnView delay={0.08}>
            <Link
              to="/mediakit"
              className="hover-red-border group flex h-full flex-col justify-between rounded-2xl border border-white/8 bg-card/60 p-5"
            >
              <div>
                <div className="mono text-[10px] uppercase tracking-widest text-accent-red-glow">
                  Mediakit
                </div>
                <div className="mt-2 text-xl font-bold">Números & formatos</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Bio, público, formatos e contato.
                </div>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground">
                abrir mediakit →
              </span>
            </Link>
          </RevealOnView>
        </div>
      </div>
    </div>
  );
}
