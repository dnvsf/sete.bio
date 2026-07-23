import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type CSSProperties } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { TwitchCard } from "@/components/site/TwitchCard";
import { SocialCard } from "@/components/site/SocialCard";
import { YouTubeModal } from "@/components/site/YouTubeModal";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/site/icons";
import { listSocials, type SocialDTO } from "@/lib/publicData.functions";

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 mb-3 text-center">
      <span className="mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
        {children}
      </span>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed bottom-16 left-1/2 z-20 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="oklch(0.98 0.005 260 / 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Home() {
  const [ytOpen, setYtOpen] = useState(false);

  const listSocialsFn = useServerFn(listSocials);
  const { data: socials } = useQuery({
    queryKey: ["socials"],
    queryFn: () => listSocialsFn(),
    staleTime: 60_000,
  });
  const ig = pickSocial(socials, "instagram");
  const tk = pickSocial(socials, "tiktok");
  const yt = pickSocial(socials, "youtube");
  const tw = pickSocial(socials, "twitch");

  return (
    <div className="relative min-h-screen">
      <div className="relative mx-auto max-w-xl px-4 pb-24 pt-14 sm:pt-20">

        {/* CANAL E LIVES */}
        <SectionLabel>Canal e Lives</SectionLabel>
        <div className="flex flex-col gap-3">
          <div style={led("0s")}>
            <TwitchCard handle={tw?.handle || "setexxl"} />
          </div>
          <div style={led("0.5s")}>
            <SocialCard
              label="YouTube"
              handle={yt?.handle || "setexxl"}
              icon={<YouTubeIcon size={26} />}
              iconBgColor="oklch(0.55 0.22 30)"
              onClick={() => setYtOpen(true)}
              delay={0.1}
            />
          </div>
        </div>

        {/* REDES SOCIAIS */}
        <SectionLabel>Redes Sociais</SectionLabel>
        <div className="flex flex-col gap-3">
          <div style={led("1s")}>
            <SocialCard
              label="Instagram"
              handle={ig?.handle || "setexxl"}
              icon={<InstagramIcon size={26} />}
              iconBgColor="oklch(0.45 0.18 330)"
              href={ig?.url || `https://instagram.com/${ig?.handle || "setexxl"}`}
              delay={0.2}
            />
          </div>
          <div style={led("1.5s")}>
            <SocialCard
              label="TikTok"
              handle={tk?.handle || "setexxl"}
              icon={<TikTokIcon size={26} />}
              iconBgColor="oklch(0.35 0.12 280)"
              href={tk?.url || `https://tiktok.com/@${tk?.handle || "setexxl"}`}
              delay={0.3}
            />
          </div>
        </div>

        {/* PARCERIAS */}
        <SectionLabel>Parcerias</SectionLabel>
        <motion.a
          href="https://ig.me/m/setexxl"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.985 }}
          className="mt-3 flex items-center justify-center gap-3 rounded-2xl border border-white/8 bg-card/60 px-5 py-4 backdrop-blur-sm transition-colors hover:bg-card/80"
          style={led("2s")}
        >
          <span className="text-foreground/60"><InstagramIcon size={20} /></span>
          <span className="text-sm font-semibold tracking-tight text-foreground/60">
            Fechar Parceria
          </span>
        </motion.a>

        <ScrollBounce />

        <YouTubeModal open={ytOpen} onClose={() => setYtOpen(false)} />
      </div>
    </div>
  );
}
