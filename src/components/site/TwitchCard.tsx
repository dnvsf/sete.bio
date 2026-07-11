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
      className="hover-red-border animate-card-pulse group relative block overflow-hidden rounded-2xl border border-white/8 bg-card/60 backdrop-blur-sm"
    >
      <div className="flex items-stretch gap-4 p-5">
        <motion.div
          animate={live ? { rotate: [0, -3, 3, -2, 0] } : { rotate: 0 }}
          transition={{ duration: 0.9, repeat: live ? Infinity : 0, repeatDelay: 4 }}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[oklch(0.28_0.14_290)] text-white"
        >
          <TwitchIcon size={26} />
        </motion.div>

        <div className="min-w-0 flex-1 self-center">
          <div className="text-xl font-bold tracking-tight leading-none">Twitch</div>
          <div className="mono mt-1 text-[11px] text-muted-foreground">@{handle}</div>
        </div>

        {/* Live status indicator — lateral */}
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
                <span
                  className={`inline-block h-2 w-2 rounded-full ${live ? "animate-live-dot" : ""}`}
                  style={{
                    background: live ? "oklch(0.62 0.24 25)" : "oklch(0.45 0.02 260)",
                    boxShadow: live
                      ? "0 0 12px 2px oklch(0.62 0.24 25 / 0.7)"
                      : "none",
                  }}
                />
                <span
                  className="mono text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    color: live ? "oklch(0.72 0.24 25)" : "oklch(0.55 0.02 260)",
                    textShadow: live ? "0 0 12px oklch(0.62 0.24 25 / 0.6)" : "none",
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
