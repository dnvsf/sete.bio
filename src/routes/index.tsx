import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo, type CSSProperties } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { TwitchCard } from "@/components/site/TwitchCard";
import { KickCard } from "@/components/site/KickCard";
import { LivePixModal } from "@/components/site/LivePixModal";
import { CutsHubCard } from "@/components/site/CutsHubCard";
import { SocialCard } from "@/components/site/SocialCard";
import { SocialIconsBar } from "@/components/site/SocialIconsBar";
import { LivePixFloating } from "@/components/site/LivePixFloating";
import { DiscordIcon } from "@/components/site/icons";
import { BackgroundSevens } from "@/components/site/SevenGlyph";
import { listSocials, type SocialDTO } from "@/lib/publicData.functions";
import { getTwitchLive } from "@/lib/getTwitchLive.functions";
import { getKickLive } from "@/lib/getKickLive.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sete | sete.bio" },
      { name: "description", content: "Todas as redes sociais do Sete." },
      { property: "og:title", content: "Sete | sete.bio" },
      { property: "og:description", content: "Todas as redes sociais do Sete." },
    ],
  }),
  component: Home,
});

const led = (offset: string): CSSProperties => ({ ["--led-offset" as never]: offset });

function pickSocial(list: SocialDTO[] | undefined, platform: string) {
  return list?.find((s) => s.platform.toLowerCase() === platform.toLowerCase());
}

/* ===== Floating Particles ===== */
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.1 + 0.05,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "var(--accent-red)",
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, -15, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ===== Page Fade In ===== */
function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ===== Cursor Glow (desktop only) ===== */
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      style={{
        left: pos.x,
        top: pos.y,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.55 0.22 25 / 0.04), transparent 70%)",
        transform: "translate(-50%, -50%)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 50 }}
    />
  );
}

function AnimatedSeparator({ delay = 0.6 }: { delay?: number }) {
  return (
    <div className="relative h-px my-4 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-white/5"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ originX: 0 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-red/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 3, delay: delay + 0.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
      />
    </div>
  );
}

/* ===== Live Status Hook ===== */
function useLiveStatus() {
  const fetchTwitch = useServerFn(getTwitchLive);
  const fetchKick = useServerFn(getKickLive);

  const { data: twitchData } = useQuery({
    queryKey: ["twitch-live"],
    queryFn: () => fetchTwitch(),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const { data: kickData } = useQuery({
    queryKey: ["kick-live"],
    queryFn: () => fetchKick(),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const twitchLive = twitchData != null ? !!twitchData.live : null;
  const kickLive = kickData != null ? !!kickData.live : null;

  return { twitchLive, kickLive };
}

/* ===== Home ===== */
function Home() {
  const [livePixOpen, setLivePixOpen] = useState(false);
  const { twitchLive, kickLive } = useLiveStatus();

  // Socials from DB
  const listSocialsFn = useServerFn(listSocials);
  const { data: socials } = useQuery({
    queryKey: ["socials"],
    queryFn: () => listSocialsFn(),
    staleTime: 60_000,
  });
  const ig = pickSocial(socials, "instagram");
  const tk = pickSocial(socials, "tiktok");
  const yt = pickSocial(socials, "youtube");

  // Reordenação dinâmica: live cards primeiro
  const liveCards = useMemo(() => {
    const cards: Array<{
      type: "twitch" | "kick";
      live: boolean | null;
      ledOffset: string;
    }> = [];

    if (twitchLive) {
      cards.push({ type: "twitch", live: true, ledOffset: "0s" });
    }
    if (kickLive) {
      cards.push({ type: "kick", live: true, ledOffset: cards.length === 0 ? "0s" : "0.2s" });
    }
    if (!twitchLive) {
      cards.push({ type: "twitch", live: false, ledOffset: "0s" });
    }
    if (!kickLive) {
      cards.push({ type: "kick", live: false, ledOffset: "0.2s" });
    }

    return cards;
  }, [twitchLive, kickLive]);

  return (
    <PageWrapper>
      <CursorGlow />
      <FloatingParticles />
      <BackgroundSevens />

      <div className="relative min-h-screen z-10">
        <div className="relative mx-auto max-w-xl px-4 pb-32 pt-16 sm:pt-24">

          {/* ===== ÍCONES DAS REDES PESSOAIS (TOPO) ===== */}
          <SocialIconsBar
            youtube={{ handle: yt?.handle || "setexxl", url: yt?.url || "" }}
            instagram={{ handle: ig?.handle || "setexxl", url: ig?.url || "" }}
            tiktok={{ handle: tk?.handle || "setexxl", url: tk?.url || "" }}
          />

          <div className="flex flex-col gap-4">

            {/* ===== LIVE CARDS (Twitch + Kick) — reordenados dinamicamente ===== */}
            {liveCards.map((card) => (
              <div key={card.type} style={led(card.ledOffset)}>
                {card.type === "twitch" ? (
                  <TwitchCard handle="setexxl" />
                ) : (
                  <KickCard handle="setexxl" />
                )}
              </div>
            ))}

            {/* ===== HUB DE CORTES / LIVES (SeteLives) ===== */}
            <div style={led("0.3s")}>
              <CutsHubCard delay={0.2} />
            </div>

            {/* Linha separadora */}
            <AnimatedSeparator delay={0.4} />

            {/* ===== DISCORD ===== */}
            <div style={led("0.5s")}>
              <SocialCard
                label="Discord"
                handle="Em breve"
                icon={<DiscordIcon size={26} />}
                iconBgColor="var(--accent-red)"
                delay={0.3}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Botão flutuante do LivePix */}
      <LivePixFloating onClick={() => setLivePixOpen(true)} />

      {/* Modal LivePix */}
      <LivePixModal open={livePixOpen} onClose={() => setLivePixOpen(false)} />
    </PageWrapper>
  );
}
