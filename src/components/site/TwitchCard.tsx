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
  const bgClass = live
    ? "bg-[oklch(0.28_0.12_145_/0.55)]"
    : "bg-[oklch(0.30_0.15_25_/0.55)]";
  const borderClass = live
    ? "border-[oklch(0.72_0.19_145_/0.5)]"
    : "border-[oklch(0.62_0.24_25_/0.5)]";
  const pulseClass = live ? "animate-green-pulse" : "";

  return (
    <motion.a
      href={`https://twitch.tv/${handle}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.96 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.8, delay: 0, type: "spring", stiffness: 50, damping: 15 }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
      className={`hover-red-border group relative block overflow-hidden rounded-2xl border backdrop-blur-sm ${bgClass} ${borderClass} ${pulseClass}`}
    >
      {/* Ambient glow inside card */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: live
            ? "radial-gradient(circle at 50% 50%, oklch(0.72 0.19 145 / 0.08), transparent 70%)"
            : "radial-gradient(circle at 50% 50%, oklch(0.62 0.24 25 / 0.06), transparent 70%)",
        }}
        animate={{
          opacity: live ? [0.5, 1, 0.5] : [0.3, 0.6, 0.3],
          scale: live ? [1, 1.1, 1] : [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center gap-4 p-5 z-10">
        {/* Twitch icon with enhanced animation */}
        <motion.div
          className="grid h-12 w-12 shrink-0 place-items-center text-white relative"
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 150, damping: 12 }}
        >
          {/* Glow behind icon when live */}
          {live && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, oklch(0.72 0.19 145 / 0.3), transparent 70%)",
                filter: "blur(10px)",
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.div
            animate={live ? { rotate: [0, -4, 4, -3, 0] } : { rotate: 0 }}
            transition={{ duration: 1.2, repeat: live ? Infinity : 0, repeatDelay: 5 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="relative z-10"
          >
            <TwitchIcon size={26} />
          </motion.div>
        </motion.div>

        <div className="min-w-0 flex-1 self-center">
          <div className="flex items-baseline gap-2">
            <motion.span
              className="text-xl font-bold tracking-tight leading-none text-white"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Twitch
            </motion.span>
            <motion.span
              className="text-sm font-normal tracking-tight text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.55 }}
            >
              @{handle}
            </motion.span>
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
                initial={{ opacity: 0, x: 12, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 18 }}
                className="flex items-center gap-2"
              >
                {live && (
                  <>
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{
                        background: "oklch(0.72 0.19 145)",
                        boxShadow: "0 0 12px 2px oklch(0.72 0.19 145 / 0.7)",
                      }}
                    >
                      <motion.span
                        className="block w-full h-full rounded-full"
                        animate={{ opacity: [1, 0.4, 1], scale: [1, 0.7, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </span>
                  </>
                )}
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide text-white"
                  style={{
                    textShadow: live ? "0 0 12px oklch(0.72 0.19 145 / 0.5)" : "none",
                  }}
                >
                  {live ? "Ao vivo" : "Offline"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Arrow that appears on hover */}
        <motion.div
          className="absolute right-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          whileHover={{ x: 3 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.a>
  );
}
