import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ScissorsIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "./icons";

interface CutsHubModalProps {
  open: boolean;
  onClose: () => void;
}

const platforms = [
  {
    label: "Instagram",
    handle: "@setelives",
    url: "https://instagram.com/setelives",
    icon: <InstagramIcon size={22} />,
    iconBg: "oklch(0.45 0.18 330)",
  },
  {
    label: "TikTok",
    handle: "@setelives",
    url: "https://tiktok.com/@setelives",
    icon: <TikTokIcon size={22} />,
    iconBg: "oklch(0.35 0.12 280)",
  },
  {
    label: "YouTube",
    handle: "@setelives",
    url: "https://youtube.com/@setelives",
    icon: <YouTubeIcon size={22} />,
    iconBg: "oklch(0.55 0.22 30)",
  },
];

export function CutsHubModal({ open, onClose }: CutsHubModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Cortes e Lives"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="black-border-glow relative w-full max-w-md rounded-t-3xl border border-black/10 bg-background p-6 sm:rounded-3xl"
          >
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center text-foreground">
                <ScissorsIcon size={22} />
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground">Cortes & Lives</div>
                <div className="font-bold">Escolha a plataforma</div>
              </div>
            </div>

            {/* Platform options */}
            <div className="grid gap-3">
              {platforms.map((p, i) => (
                <motion.a
                  key={p.label}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-black-border group flex items-center justify-between rounded-xl border border-black/10 bg-black/[0.03] p-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center text-foreground">
                      {p.icon}
                    </div>
                    <div>
                      <div className="text-base font-bold">{p.label}</div>
                      <div className="mono text-xs text-muted-foreground">{p.handle}</div>
                    </div>
                  </div>
                  <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="mt-5 w-full rounded-xl border border-black/10 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
