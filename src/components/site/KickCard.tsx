import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { KickIcon } from "./icons";
import { Shimmer } from "./Shimmer";
import { getKickLive } from "@/lib/getKickLive.functions";

export function KickCard({ handle = "setexxl" }: { handle?: string }) {
  const fetchLive = useServerFn(getKickLive);
  const { data } = useQuery({
    queryKey: ["kick-live", handle],
    queryFn: () => fetchLive(),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
  const live = data == null ? null : !!data.live;

  // Classes dinâmicas baseado no estado da live — verde Kick
  const bgClass = live
    ? "bg-[oklch(0.25_0.15_145_/0.55)]"
    : "bg-[oklch(0.30_0.10_160_/0.55)]";
  const borderClass = live
    ? "border-[oklch(0.75_0.20_145_/0.5)]"
    : "border-[oklch(0.60_0.15_160_/0.5)]";
  const pulseClass = live ? "animate-kick-pulse" : "";

  // 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 25 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 25 });

  // Glow position
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  // Ripple
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // Breathing
  useEffect(() => {
    animate(tiltX, [0, 0.2, -0.2, 0], {
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2,
    });
    animate(tiltY, [0, 0.15, -0.15, 0], {
      duration: 11,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 3,
    });
  }, []);

  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      tiltX.set(((y - centerY) / centerY) * -7);
      tiltY.set(((x - centerX) / centerX) * 7);
      glowX.set((x / rect.width) * 100);
      glowY.set((y / rect.height) * 100);
    },
    [tiltX, tiltY, glowX, glowY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ripple = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now(),
      };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 700);
    },
    []
  );

  return (
    <motion.a
      ref={cardRef}
      href={`https://kick.com/${handle}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.96 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.8, delay: 0, type: "spring" as const, stiffness: 50, damping: 15 }}
      whileTap={{ scale: 0.98 }}
      className={`hover-red-border group relative block overflow-hidden rounded-2xl border backdrop-blur-sm ${bgClass} ${borderClass} ${pulseClass}`}
      style={{
        transform: `perspective(1000px) rotateX(${springTiltX.get()}deg) rotateY(${springTiltY.get()}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Ambient glow inside card */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 300px at ${glowX.get()}% ${glowY.get()}%, ${
            live
              ? "oklch(0.75 0.20 145 / 0.12)"
              : "oklch(0.60 0.15 160 / 0.08)"
          }, transparent 70%)`,
          opacity: isHovered ? 1 : 0.5,
        }}
        animate={{
          scale: live ? [1, 1.08, 1] : [1, 1.03, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scanline effect when live */}
      {live && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ opacity: 0.06 }}
        >
          <motion.div
            className="absolute left-0 right-0 h-px bg-white"
            animate={{
              y: ["-10%", "110%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}

      {/* Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            background: live
              ? "radial-gradient(circle, oklch(0.75 0.20 145 / 0.35), transparent 70%)"
              : "radial-gradient(circle, oklch(0.60 0.15 160 / 0.3), transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            width: [0, 350],
            height: [0, 350],
            opacity: [0.5, 0],
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}

      <div className="relative flex items-center gap-4 p-5 z-10">
        {/* Kick icon with enhanced animation */}
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
                background: "radial-gradient(circle, oklch(0.75 0.20 145 / 0.3), transparent 70%)",
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
            <KickIcon size={26} />
          </motion.div>
        </motion.div>

        <motion.span
          className="text-xl font-bold tracking-tight leading-none text-white"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Kick
        </motion.span>

        {/* Status indicator */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
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
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{
                      background: "oklch(0.75 0.20 145)",
                      boxShadow: "0 0 12px 2px oklch(0.75 0.20 145 / 0.7)",
                    }}
                  >
                    <motion.span
                      className="block w-full h-full rounded-full"
                      animate={{ opacity: [1, 0.4, 1], scale: [1, 0.7, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </span>
                )}
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide text-white"
                  style={{
                    textShadow: live ? "0 0 12px oklch(0.75 0.20 145 / 0.5)" : "none",
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
          className="absolute right-4"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            x: isHovered ? 0 : -4,
          }}
          transition={{ duration: 0.3 }}
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
