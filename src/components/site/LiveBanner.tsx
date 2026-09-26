import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import liveBanner from "@/assets/live-banner.jpg";

export function LiveBanner({ online, href }: { online: boolean; href: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${online ? "Live online" : "Live offline"} no TikTok`}
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      whileTap={reducedMotion ? undefined : { scale: 0.992 }}
      className="wine-border group relative block aspect-video w-full overflow-hidden rounded-lg bg-card shadow-[0_28px_70px_-42px_var(--wine-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <motion.img
        src={liveBanner}
        alt=""
        width={1600}
        height={900}
        className="absolute inset-0 h-full w-full object-cover"
        animate={reducedMotion ? undefined : { scale: [1.01, 1.035, 1.01] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-background/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-55" />

      <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
        <div
          className={`mono flex h-7 items-center gap-2 rounded-full border px-3 text-[9px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md ${
            online
              ? "border-primary/35 bg-primary/12 text-primary"
              : "border-border bg-background/55 text-muted-foreground"
          }`}
        >
          <span className={`relative h-1.5 w-1.5 rounded-full ${online ? "bg-primary" : "bg-muted-foreground/50"}`}>
            {online && <span className="absolute inset-0 animate-live-halo rounded-full bg-primary" />}
          </span>
          {online ? "Online" : "Offline"}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
        <div>
          <div className="mono text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            TikTok Live
          </div>
          <div className="mt-1 text-xl font-semibold text-foreground sm:text-2xl">Sete ao vivo</div>
        </div>
        <motion.span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-background/45 text-foreground backdrop-blur-md"
          animate={reducedMotion ? undefined : { x: [0, 2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowUpRight size={16} />
        </motion.span>
      </div>
    </motion.a>
  );
}