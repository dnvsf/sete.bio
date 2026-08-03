import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { YouTubeIcon } from "./icons";

export function YouTubeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            aria-label="Escolha o canal do YouTube"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="black-border-glow relative w-full max-w-md rounded-t-3xl border border-black/10 bg-[oklch(0.14_0.008_260)] p-6 sm:rounded-3xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[oklch(0.5_0.22_28)] text-foreground">
                <YouTubeIcon size={22} />
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground">YouTube</div>
                <div className="font-bold">Escolha o canal</div>
              </div>
            </div>

            <div className="grid gap-3">
              <a
                href="https://youtube.com/@setexxl"
                target="_blank"
                rel="noreferrer"
                className="hover-black-border group flex items-center justify-between rounded-xl border border-black/10 bg-black/[0.03] p-4"
              >
                <div>
                  <div className="text-base font-bold">Canal Principal</div>
                  <div className="mono text-xs text-muted-foreground">YouTube/setexxl</div>
                </div>
                <span className="text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="https://youtube.com/@seteclipes"
                target="_blank"
                rel="noreferrer"
                className="hover-black-border group flex items-center justify-between rounded-xl border border-black/10 bg-black/[0.03] p-4"
              >
                <div>
                  <div className="text-base font-bold">Cortes</div>
                  <div className="mono text-xs text-muted-foreground">YouTube/seteclipes</div>
                </div>
                <span className="text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

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
