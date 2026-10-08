import { motion, useReducedMotion } from "framer-motion";
import { TikTokIcon } from "./icons";

export function LiveBanner({
  online,
  href,
  onReady,
}: {
  online: boolean;
  href: string;
  onReady?: () => void;
}) {
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
      <motion.video
        src="/live-banner.mp4"
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={onReady}
        onError={onReady}
        className="absolute inset-0 h-full w-full object-cover"
        animate={reducedMotion ? undefined : { scale: [1.01, 1.035, 1.01] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/15 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-55" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4 sm:p-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <motion.div
            aria-hidden
            initial={reducedMotion ? false : { opacity: 0, rotate: -180, scale: 0.35 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
            }
            className="shrink-0 text-[#f1eee7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]"
          >
            <TikTokIcon size={27} />
          </motion.div>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { delay: 0.75, duration: 0.65, ease: [0.22, 1, 0.36, 1] }
            }
            className="min-w-0 text-lg font-black tracking-[0.02em] text-foreground sm:text-xl"
          >
            Live no TikTok
          </motion.div>
        </div>
        <div
          className={`font-display flex h-6 shrink-0 items-center rounded-full border px-2.5 text-[10px] font-black uppercase tracking-[0.12em] backdrop-blur-md ${
            online
              ? "border-[#f1eee7]/45 bg-[#f1eee7] text-black shadow-[0_4px_18px_-6px_rgba(241,238,231,0.45)]"
              : "border-border bg-background/55 text-muted-foreground"
          } ${online && !reducedMotion ? "animate-live-pill" : ""}`}
        >
          {online ? "AO VIVO" : "OFFLINE"}
        </div>
      </div>
    </motion.a>
  );
}
