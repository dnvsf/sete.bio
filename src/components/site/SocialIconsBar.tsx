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
      color: "oklch(0.15 0.01 0)",
    },
    {
      key: "instagram",
      label: "Instagram",
      handle: "@setexxl",
      href: instagram?.url || `https://instagram.com/${instagram?.handle || "setexxl"}`,
      icon: <InstagramIcon size={20} />,
      color: "oklch(0.15 0.01 0)",
    },
    {
      key: "tiktok",
      label: "TikTok",
      handle: "@setexxl",
      href: tiktok?.url || `https://tiktok.com/@${tiktok?.handle || "setexxl"}`,
      icon: <TikTokIcon size={20} />,
      color: "oklch(0.15 0.01 0)",
    },
  ];

  useEffect(() => {
    const runSequence = () => {
      // Sequência inicial após 1s
      let current = 0;
      const interval = setInterval(() => {
        if (current < icons.length) {
          setActiveIndex(current);
          // Mantém expandido por 2.5s, depois recolhe suavemente
          setTimeout(() => setActiveIndex(null), 2500);
          current++;
        } else {
          clearInterval(interval);
        }
      }, 3500); // Intervalo maior entre cada ícone
    };

    // Executa na carga (com delay de 1.2s)
    const initialTimeout = setTimeout(runSequence, 1200);

    // Repete a cada 30s
    const repeatInterval = setInterval(runSequence, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(repeatInterval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 mb-12 h-14">
      {icons.map((item, i) => {
        const isExpanded = activeIndex === i;

        return (
          <motion.a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="relative flex items-center h-12 rounded-2xl overflow-hidden cursor-pointer"
            initial={false}
            animate={{
              width: isExpanded ? "150px" : "44px",
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              mass: 1,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Soft glow behind the icon */}
            <motion.div
              className="absolute left-0 top-0 h-12 w-12 pointer-events-none"
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                background: `radial-gradient(circle at center, oklch(0.15 0.01 0 / 0.12), transparent 70%)`,
              }}
            />

            {/* Icon Container */}
            <motion.div
              className="flex-shrink-0 grid h-12 w-11 place-items-center text-foreground/80 relative z-10"
              animate={{
                scale: isExpanded ? 1.06 : 1,
                color: isExpanded ? "oklch(0.15 0.01 0)" : "oklch(0.15 0.01 0 / 0.8)",
              }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {item.icon}
            </motion.div>

            {/* Label Container */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -10, filter: "blur(6px)" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.15,
                    ease: [0.2, 0.8, 0.2, 1]
                  }}
                  className="relative z-10 flex flex-col justify-center pl-1 pr-3 overflow-hidden whitespace-nowrap"
                >
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold leading-none">
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold text-foreground leading-tight mt-0.5">
                    {item.handle}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Underline sweep on expand */}
            <motion.div
              className="absolute bottom-1 left-0 h-px bg-foreground/25 origin-left"
              animate={{ scaleX: isExpanded ? 1 : 0, width: "100%" }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            />

          </motion.a>
        );
      })}
    </div>
  );
}
