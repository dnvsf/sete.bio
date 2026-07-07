import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { TwitchIcon } from "./icons";
import { getTwitchLive } from "@/lib/getTwitchLive.functions";

export function TwitchCard() {
  const fetchLive = useServerFn(getTwitchLive);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchLive()
      .then((r) => mounted && setLive(!!r.live))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [fetchLive]);

  return (
    <motion.a
      href="https://twitch.tv/setexxl"
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="hover-red-border group relative block overflow-hidden rounded-2xl border border-white/8 bg-card/60 backdrop-blur-sm"
      style={{
        // recorte circular à direita para o badge On/Off
        WebkitMaskImage:
          "radial-gradient(circle 26px at calc(100% - 28px) 50%, transparent 26px, #000 27px)",
        maskImage:
          "radial-gradient(circle 26px at calc(100% - 28px) 50%, transparent 26px, #000 27px)",
      }}
    >
      <div className="flex items-center gap-4 p-5 pr-20">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[oklch(0.28_0.14_290)] text-white">
          <TwitchIcon size={26} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1 truncate">
            <span className="text-xl font-bold tracking-tight">Twitch/</span>
            <span className="mono truncate text-sm text-muted-foreground">setexxl</span>
          </div>
          <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground/80">
            Live streaming
          </div>
        </div>
      </div>

      {/* seta */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        →
      </div>

      {/* Badge On/Off no recorte */}
      <div
        className="absolute top-1/2 flex h-[46px] w-[46px] -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-wider"
        style={{
          right: 5,
          background: live ? "oklch(0.72 0.19 145)" : "oklch(0.45 0.19 25)",
          color: "white",
          boxShadow: live
            ? "0 0 20px oklch(0.72 0.19 145 / 0.6)"
            : "0 0 20px oklch(0.62 0.24 25 / 0.5)",
        }}
      >
        <span className={live ? "animate-live-dot" : ""}>{live ? "On" : "Off"}</span>
      </div>
    </motion.a>
  );
}
