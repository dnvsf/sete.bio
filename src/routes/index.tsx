import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo, type CSSProperties } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { TwitchCard } from "@/components/site/TwitchCard";
import { KickCard } from "@/components/site/KickCard";
import { LivePixCard } from "@/components/site/LivePixCard";
import { LivePixModal } from "@/components/site/LivePixModal";
import { CutsHubCard } from "@/components/site/CutsHubCard";
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

/* ===== Floating Particles ===== */
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.15 + 0.05,
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
            background: "oklch(0.95 0.01 260)",
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
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
      transition={{ duration: 1.2, ease: "easeOut" }}
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
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.95 0.01 260 / 0.03), transparent 70%)",
        transform: "translate(-50%, -50%)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    />
  );
}

function AnimatedSeparator({ delay = 0.6 }: { delay?: number }) {
  return (
    <div className="relative h-px my-1.5 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-white/10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
        style={{ originX: 0 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, delay: delay + 0.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 8 }}
      />
    </div>
  );
}

function ScrollBounce() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      const hasOverflow = document.documentElement.scrollHeight > window.innerHeight + 10;
      setVisible(hasOverflow);
    };
    checkScrollable();
    const timer = setTimeout(() => setVisible(false), 6000);
    const handleScroll = () => {
      if (window.scrollY > 100) setVisible(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkScrollable);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="pointer-events-none fixed bottom-16 left-1/2 z-20 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="oklch(0.98 0.005 260 / 0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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

  // Reordenação dinâmica: live cards primeiro
  const liveCards = useMemo(() => {
    const cards: Array<{
      type: "twitch" | "kick";
      live: boolean | null;
      ledOffset: string;
    }> = [];

    // Se ambas estão ao vivo, Twitch primeiro (principal)
    if (twitchLive) {
      cards.push({ type: "twitch", live: true, ledOffset: "0s" });
    }
    if (kickLive) {
      cards.push({ type: "kick", live: true, ledOffset: cards.length === 0 ? "0s" : "0.2s" });
    }

    // Cards offline (apenas se não estão ao vivo)
    if (!twitchLive) {
      cards.push({ type: "twitch", live: false, ledOffset: "0.4s" });
    }
    if (!kickLive) {
      cards.push({ type: "kick", live: false, ledOffset: "0.6s" });
    }

    return cards;
  }, [twitchLive, kickLive]);

  return (
    <PageWrapper>
      <CursorGlow />
      <FloatingParticles />

      <div className="relative min-h-screen z-10">
        <div className="relative mx-auto max-w-xl px-4 pb-24 pt-14 sm:pt-20">

          <div className="flex flex-col gap-3">

            {/* Live Cards (Twitch + Kick) — reordenados dinamicamente */}
            {liveCards.map((card, i) => (
              <div key={card.type} style={led(card.ledOffset)}>
                {card.type === "twitch" ? (
                  <TwitchCard handle="setexxl" />
                ) : (
                  <KickCard handle="setexxl" />
                )}
              </div>
            ))}

            {/* Linha separadora animada */}
            <AnimatedSeparator delay={0.7} />

            {/* LivePix — Apoio */}
            <div style={led("0.8s")}>
              <LivePixCard
                onClick={() => setLivePixOpen(true)}
                delay={0.4}
              />
            </div>

            {/* Hub de Cortes / Lives — IG, TikTok, YouTube */}
            <div style={led("0.9s")}>
              <CutsHubCard delay={0.5} />
            </div>

          </div>

          <ScrollBounce />
        </div>
      </div>

      {/* Modal LivePix */}
      <LivePixModal open={livePixOpen} onClose={() => setLivePixOpen(false)} />
    </PageWrapper>
  );
}
