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
      // Esconde badge após 6 segundos
      const timer = setTimeout(() => setShowBadge(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [latestMsg?.id]);

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      {/* Badge do último apoio */}
      <AnimatePresence>
        {showBadge && latestMsg && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="pointer-events-auto rounded-xl border border-white/10 bg-[oklch(0.14_0.008_260)]/95 backdrop-blur-sm px-4 py-2 shadow-lg"
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: 2, ease: "easeInOut" }}
                className="w-6 h-6 grid place-items-center rounded-full"
                style={{ background: "oklch(0.55 0.18 280)" }}
              >
                <LivePixIcon size={14} />
              </motion.div>
              <div className="text-xs">
                <span className="font-semibold text-white">
                  {latestMsg.username || "Anônimo"}
                </span>
                <span className="text-muted-foreground"> enviou </span>
                <span className="font-bold text-[oklch(0.75_0.15_280)]">
                  {formatBRL(latestMsg.amount)}
                </span>
                <span className="text-[10px] text-muted-foreground ml-1">
                  · {timeAgo(latestMsg.createdAt)}
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
        className="pointer-events-auto relative flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 shadow-lg cursor-pointer"
        style={{
          background: "linear-gradient(135deg, oklch(0.40 0.18 280 / 0.9), oklch(0.35 0.20 300 / 0.9))",
          backdropFilter: "blur(12px)",
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        animate={{
          boxShadow: [
            "0 0 0 0 oklch(0.55 0.18 280 / 0)",
            "0 0 0 8px oklch(0.55 0.18 280 / 0)",
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeOut" },
        }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 0 0 oklch(0.55 0.18 280 / 0.4)",
              "0 0 0 12px oklch(0.55 0.18 280 / 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <LivePixIcon size={20} />
        <span className="text-sm font-bold tracking-wide text-white">Apoiar</span>
      </motion.button>
    </motion.div>
  );
}
