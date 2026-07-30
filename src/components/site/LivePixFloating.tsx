import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { getLivePixRecentMessages } from "@/lib/livePix.functions";
import { LivePixIcon } from "./icons";

interface LivePixFloatingProps {
  onClick: () => void;
}

function formatBRL(amountCents: number): string {
  return (amountCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "agora";
  if (mins < 60) return `${mins}min atrás`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h atrás`;
  const days = Math.floor(hours / 24);
  return `${days}d atrás`;
}

export function LivePixFloating({ onClick }: LivePixFloatingProps) {
  const fetchMessages = useServerFn(getLivePixRecentMessages);
  const { data } = useQuery({
    queryKey: ["livepix-messages"],
    queryFn: () => fetchMessages(),
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  const latestMsg = data?.messages?.[0] || null;
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (latestMsg) {
      setShowBadge(true);
      const timer = setTimeout(() => setShowBadge(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [latestMsg?.id]);

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 pointer-events-none w-full max-w-[320px] px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Badge do último apoio */}
      <AnimatePresence>
        {showBadge && latestMsg && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.9, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="pointer-events-auto rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl px-4 py-3 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 grid place-items-center rounded-full shadow-inner"
                style={{ background: "linear-gradient(135deg, oklch(0.55 0.22 25), oklch(0.45 0.25 25))" }}
              >
                <LivePixIcon size={16} />
              </div>
              <div className="flex flex-col">
                <div className="text-xs font-medium text-white/90">
                  <span className="font-bold text-white">{latestMsg.username || "Anônimo"}</span>
                  <span className="text-white/60"> apoiou com </span>
                  <span className="font-bold text-white">{formatBRL(latestMsg.amount)}</span>
                </div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                  {timeAgo(latestMsg.createdAt)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão flutuante */}
      <motion.button
        onClick={onClick}
        type="button"
        className="pointer-events-auto relative flex items-center justify-center gap-3 w-full rounded-full border border-white/10 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group"
        style={{
          background: "linear-gradient(135deg, oklch(0.15 0.02 20), oklch(0.10 0.02 20))",
        }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />

        {/* Glow Layer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,oklch(0.55_0.22_25/0.15),transparent_70%)]" />

        <div className="relative flex items-center gap-3">
          <div className="text-white group-hover:scale-110 transition-transform duration-300">
            <LivePixIcon size={22} />
          </div>
          <span className="text-sm font-bold tracking-[0.05em] uppercase text-white">
            Mande seu LivePix
          </span>
        </div>

        {/* Pulse Border */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/20"
          animate={{
            opacity: [0.5, 0],
            scale: [1, 1.05],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </motion.div>
  );
}
