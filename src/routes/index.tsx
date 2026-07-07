import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import avatarAsset from "@/assets/avatar.jpg.asset.json";
import coverAsset from "@/assets/cover.jpg.asset.json";
import { BackgroundSevens, SevenGlyph } from "@/components/site/SevenGlyph";
import { CursorGlow } from "@/components/site/CursorGlow";
import { TwitchCard } from "@/components/site/TwitchCard";
import { MiniSocialCard } from "@/components/site/MiniSocialCard";
import { YouTubeModal } from "@/components/site/YouTubeModal";
import { SectionDivider } from "@/components/site/SectionDivider";
import { EventCard } from "@/components/site/EventCard";
import { RippleButton } from "@/components/site/RippleButton";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/site/icons";
import { eventsThisWeek } from "@/data/events";
import { partners } from "@/data/partners";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { property: "og:image", content: coverAsset.url },
      { name: "twitter:image", content: coverAsset.url },
    ],
  }),
});

function Home() {
  const [ytOpen, setYtOpen] = useState(false);
  const week = eventsThisWeek();
  const dias = ["Todos", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const [filter, setFilter] = useState("Todos");
  const map = { Seg: 1, Ter: 2, Qua: 3, Qui: 4, Sex: 5, Sáb: 6, Dom: 0 } as Record<string, number>;
  const filtered = filter === "Todos" ? week : week.filter((e) => new Date(e.date).getDay() === map[filter]);

  return (
    <div className="relative min-h-screen grain">
      <BackgroundSevens />
      <CursorGlow />

      {/* Capa */}
      <div className="relative h-48 w-full overflow-hidden sm:h-64">
        <img
          src={coverAsset.url}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute right-4 top-4 select-none sm:right-10 sm:top-6"
        >
          <SevenGlyph size={140} outline />
        </motion.div>
      </div>

      {/* Container */}
      <div className="relative mx-auto max-w-xl px-4 pb-24">
        {/* Avatar - metade sobre a capa */}
        <div className="-mt-16 flex justify-center sm:-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div
              className="h-32 w-32 overflow-hidden rounded-3xl sm:h-36 sm:w-36"
              style={{
                border: "6px solid var(--background)",
                boxShadow:
                  "0 0 0 1px oklch(1 0 0 / 0.08), 0 20px 60px -20px oklch(0.62 0.24 25 / 0.4)",
              }}
            >
              <img src={avatarAsset.url} alt="Sete" className="h-full w-full object-cover" />
            </div>
          </motion.div>
        </div>

        {/* Nome */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Sete
            <span className="ml-1 text-accent-red-glow">.</span>
          </h1>
          <div className="mono mt-1 text-xs text-muted-foreground">@setexxl · sete.bio</div>
        </motion.div>

        {/* Twitch card */}
        <div className="mt-8">
          <TwitchCard />
        </div>

        {/* Mini socials */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          <MiniSocialCard
            label="Instagram"
            handle="setexxl"
            icon={<InstagramIcon size={28} />}
            href="https://instagram.com/setexxl"
            delay={0.15}
          />
          <MiniSocialCard
            label="TikTok"
            handle="setexxl"
            icon={<TikTokIcon size={28} />}
            href="https://tiktok.com/@setexxl"
            delay={0.22}
          />
          <MiniSocialCard
            label="YouTube"
            handle="setexxl"
            icon={<YouTubeIcon size={28} />}
            onClick={() => setYtOpen(true)}
            delay={0.29}
          />
        </div>

        <YouTubeModal open={ytOpen} onClose={() => setYtOpen(false)} />

        {/* EVENTOS */}
        <SectionDivider label="Rolês da semana" />

        <div className="mb-4 flex flex-wrap gap-2">
          {dias.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wider transition ${
                filter === d
                  ? "border-accent-red-glow bg-accent-red/20 text-foreground"
                  : "border-white/10 text-muted-foreground hover:border-white/25"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 py-12 text-center text-muted-foreground">
            <SevenGlyph size={64} outline />
            <div className="text-sm">
              {filter === "Todos" ? "Semana livre. Volte em breve." : "Nada nesse dia."}
            </div>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} />
            ))}
          </div>
        )}

        {/* PARCEIROS */}
        <SectionDivider label="Casas parceiras" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {partners.map((p) => (
            <Link
              key={p.slug}
              to="/$slug"
              params={{ slug: p.slug }}
              className="hover-red-border group flex flex-col items-start gap-1 rounded-2xl border border-white/8 bg-card/50 p-4"
            >
              <div className="text-lg font-bold tracking-tight">{p.name}</div>
              <div className="mono text-[10px] uppercase text-muted-foreground">/{p.slug}</div>
              <div className="mt-1 text-xs text-muted-foreground">{p.city}</div>
            </Link>
          ))}
        </div>

        {/* CONTATO */}
        <SectionDivider label="Business" />
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="https://ig.me/m/setexxl"
            target="_blank"
            rel="noreferrer"
            className="hover-red-border group flex flex-col justify-between rounded-2xl border border-white/8 bg-card/60 p-5"
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
              className="mt-4 self-start rounded-lg bg-accent-red px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
            >
              Chamar no direct
            </RippleButton>
          </a>
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-white/10 bg-card/30 p-5 opacity-70">
            <div>
              <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Mediakit
              </div>
              <div className="mt-2 text-xl font-bold">Em breve</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Números, público e cases · estamos preparando.
              </div>
            </div>
            <div className="absolute -right-4 -bottom-6 opacity-20">
              <SevenGlyph size={140} outline />
            </div>
          </div>
        </div>

        {/* footer */}
        <footer className="mt-16 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="mono">sete.bio</span>
          <SevenGlyph size={14} />
          <span className="mono">{new Date().getFullYear()}</span>
        </footer>
      </div>
    </div>
  );
}
