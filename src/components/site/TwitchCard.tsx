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
      className="hover-red-border group relative block rounded-2xl border border-white/8 bg-card/60 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 p-5 pr-24">
        <motion.div
          animate={
            live
              ? { rotate: [0, -3, 3, -2, 0] }
              : { rotate: 0 }
          }
          transition={{ duration: 0.9, repeat: live ? Infinity : 0, repeatDelay: 4 }}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[oklch(0.28_0.14_290)] text-white"
        >
          <TwitchIcon size={26} />
        </motion.div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1 truncate">
            <span className="text-xl font-bold tracking-tight">Twitch/</span>
            <span className="mono truncate text-sm text-muted-foreground">setexxl</span>
          </div>
          <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground/80">
            {live === null ? "verificando…" : live ? "ao vivo agora" : "live streaming"}
          </div>
        </div>
      </div>

      <div className="absolute right-24 top-1/2 -translate-y-1/2 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        →
      </div>

      {/* Badge On/Off */}
      <div className="absolute right-[5px] top-1/2 -translate-y-1/2">
        <AnimatePresence mode="wait">
          {live === null ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Shimmer className="h-[46px] w-[46px]" rounded="rounded-full" />
            </motion.div>
          ) : (
            <motion.div
              key={live ? "on" : "off"}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              className={`flex h-[46px] w-[46px] items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${live ? "animate-live-halo" : ""}`}
              style={{
                background: live ? "oklch(0.72 0.19 145)" : "oklch(0.45 0.19 25)",
                boxShadow: live
                  ? undefined
                  : "0 0 20px oklch(0.62 0.24 25 / 0.5)",
              }}
            >
              <span className={live ? "animate-live-dot" : ""}>{live ? "On" : "Off"}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  );
}
