import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { TwitchIcon } from "./icons";
import { Shimmer } from "./Shimmer";
import { getTwitchLive } from "@/lib/getTwitchLive.functions";

export function TwitchCard({ handle = "setexxl" }: { handle?: string }) {
  const fetchLive = useServerFn(getTwitchLive);
  const { data } = useQuery({
    queryKey: ["twitch-live", handle],
    queryFn: () => fetchLive(),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
  const live = data == null ? null : !!data.live;

  // Classes dinâmicas baseado no estado da live
  const pulseClass = live ? "animate-green-pulse" : "";
  const borderColor = live
    ? "border-green-500/40"
    : "border-white/8";

  return (
    <motion.a
      href={`https://twitch.tv/${handle}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className={`hover-red-border group relative block overflow-hidden rounded-2xl border bg-card/60 backdrop-blur-sm ${pulseClass} ${borderColor}`}
    >
      <div className="flex items-center gap-4 p-5">
        <motion.div
          animate={live ? { rotate: [0, -3, 3, -2, 0] } : { rotate: 0 }}
          transition={{ duration: 0.9, repeat: live ? Infinity : 0, repeatDelay: 4 }}
          className="grid h-12 w-12 shrink-0 place-items-center text-white"
        >
          <TwitchIcon size={26} />
        </motion.div>

        <div className="min-w-0 flex-1 self-center">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold tracking-tight leading-none">Twitch</span>
            <span className="text-sm font-normal tracking-tight text-foreground/50">@{handle}</span>
          </div>
        </div>

        {/* Status indicator — lateral */}
        <div className="flex shrink-0 items-center">
          <AnimatePresence mode="wait">
            {live === null ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Shimmer className="h-6 w-20" rounded="rounded-md" />
              </motion.div>
            ) : (
              <motion.div
                key={live ? "on" : "off"}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                className="flex items-center gap-2"
              >
                {live && (
                  <span
                    className="inline-block h-2 w-2 rounded-full animate-live-dot"
                    style={{
                      background: "oklch(0.72 0.19 145)",
                      boxShadow: "0 0 12px 2px oklch(0.72 0.19 145 / 0.7)",
                    }}
                  />
                )}
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{
                    color: live ? "oklch(0.72 0.19 145)" : "oklch(0.45 0.02 260)",
                    textShadow: live ? "0 0 12px oklch(0.72 0.19 145 / 0.5)" : "none",
                  }}
                >
                  {live ? "Ao vivo" : "Offline"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.a>
  );
}
