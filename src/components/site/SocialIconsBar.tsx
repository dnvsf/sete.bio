import { motion, AnimatePresence } from "framer-motion";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "./icons";
import { useState, useEffect } from "react";

interface SocialIconsBarProps {
  instagram?: { handle: string; url: string };
  tiktok?: { handle: string; url: string };
  youtube?: { handle: string; url: string };
}

export function SocialIconsBar({ instagram, tiktok, youtube }: SocialIconsBarProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const icons = [
    {
      key: "youtube",
      label: "YouTube",
      handle: "@setexxl",
      href: youtube?.url || `https://youtube.com/@${youtube?.handle || "setexxl"}`,
      icon: <YouTubeIcon size={20} />,
      color: "oklch(0.55 0.22 25)",
    },
    {
      key: "instagram",
      label: "Instagram",
      handle: "@setexxl",
      href: instagram?.url || `https://instagram.com/${instagram?.handle || "setexxl"}`,
      icon: <InstagramIcon size={20} />,
      color: "oklch(0.55 0.22 25)",
    },
    {
      key: "tiktok",
      label: "TikTok",
      handle: "@setexxl",
      href: tiktok?.url || `https://tiktok.com/@${tiktok?.handle || "setexxl"}`,
      icon: <TikTokIcon size={20} />,
      color: "oklch(0.55 0.22 25)",
    },
  ];

  useEffect(() => {
    const runSequence = () => {
      // Sequência inicial após 1s
      let current = 0;
      const interval = setInterval(() => {
        if (current < icons.length) {
          setActiveIndex(current);
          setTimeout(() => setActiveIndex(null), 1500);
          current++;
        } else {
          clearInterval(interval);
        }
      }, 2500);
    };

    // Executa na carga (com delay de 1s)
    const initialTimeout = setTimeout(runSequence, 1000);

    // Repete a cada 25s
    const repeatInterval = setInterval(runSequence, 25000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(repeatInterval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 mb-8 h-12">
      {icons.map((item, i) => {
        const isExpanded = activeIndex === i;

        return (
          <motion.a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="relative flex items-center h-11 bg-card/40 border border-white/10 backdrop-blur-md rounded-full overflow-hidden"
            initial={false}
            animate={{
              width: isExpanded ? "140px" : "44px",
              backgroundColor: isExpanded ? "oklch(0.18 0.02 20 / 0.8)" : "oklch(0.14 0.02 20 / 0.4)",
              borderColor: isExpanded ? "oklch(0.55 0.22 25 / 0.4)" : "oklch(1 0 0 / 10%)",
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            whileHover={{ scale: 1.05, backgroundColor: "oklch(0.18 0.02 20 / 0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icon Container */}
            <div className="flex-shrink-0 grid h-11 w-11 place-items-center text-white/80">
              {item.icon}
            </div>

            {/* Label Container */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex flex-col justify-center pr-4 overflow-hidden whitespace-nowrap"
                >
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold leading-none">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-white leading-tight">
                    {item.handle}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle Glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: isExpanded ? 1 : 0,
              }}
              style={{
                background: `radial-gradient(circle at center, ${item.color} / 0.15, transparent 70%)`,
              }}
            />
          </motion.a>
        );
      })}
    </div>
  );
}
