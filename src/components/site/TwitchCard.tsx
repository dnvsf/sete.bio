import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { TwitchIcon } from "./icons";
import { Shimmer } from "./Shimmer";
import { getTwitchLive } from "@/lib/getTwitchLive.functions";

export function TwitchCard() {
  const fetchLive = useServerFn(getTwitchLive);
  const [live, setLive] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchLive()
      .then((r) => mounted && setLive(!!r.live))
      .catch(() => mounted && setLive(false));
    return () => {
      mounted = false;
    };
  }, [fetchLive]);

  return (
    <motion.a
      href="https://twitch.tv/setexxl"
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className="hover-red-border animate-card-pulse group relative block rounded-2xl border border-white/8 bg-card/60 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 p-5">
        <motion.div
          animate={live ? { rotate: [0, -3, 3, -2, 0] } : { rotate: 0 }}
          transition={{ duration: 0.9, repeat: live ? Infinity : 0, repeatDelay: 4 }}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[oklch(0.28_0.14_290)] text-white"
        >
          <TwitchIcon size={26} />
        </motion.div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Twitch</span>
            <span className="mono inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-[2px] text-[10px] uppercase tracking-wider text-muted-foreground">
              setexxl
            </span>
          </div>

          {/* Status pill */}
          <div className="mt-2">
            <AnimatePresence mode="wait">
              {live === null ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Shimmer className="h-[22px] w-[92px]" rounded="rounded-full" />
                </motion.div>
              ) : (
                <motion.div
                  key={live ? "on" : "off"}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${live ? "animate-live-halo text-white" : ""}`}
                  style={{
                    background: live ? "oklch(0.55 0.22 25)" : "oklch(0.22 0.01 260)",
                    border: live
                      ? "1px solid oklch(0.62 0.24 25 / 0.6)"
                      : "1px solid oklch(1 0 0 / 0.1)",
                    color: live ? "white" : "oklch(0.7 0.01 260)",
                  }}
                >
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${live ? "animate-live-dot" : ""}`}
                    style={{ background: live ? "white" : "oklch(0.55 0.02 260)" }}
                  />
                  {live ? "Ao vivo" : "Offline"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="ml-2 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          →
        </div>
      </div>
    </motion.a>
  );
}
