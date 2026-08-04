import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
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

  // Estilos baseados no estado live
  const bgClass = live
    ? "bg-card shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]"
    : "bg-card shadow-[0_8px_24px_-14px_rgba(0,0,0,0.2)]";
  const borderClass = live
    ? "border-black/15 shadow-[0_0_30px_rgba(255,0,0,0.1)]"
    : "border-black/10";
  const pulseClass = live ? "animate-black-pulse" : "";

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
    const controlsX = animate(tiltX, [0, 0.2, -0.2, 0], {
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2,
    });
    const controlsY = animate(tiltY, [0, 0.15, -0.15, 0], {
      duration: 11,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 3,
    });
    return () => {
      controlsX.stop();
      controlsY.stop();
    };
  }, [tiltX, tiltY]);

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
      href={`https://twitch.tv/${handle}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.96 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.8, delay: 0, type: "spring" as const, stiffness: 50, damping: 15 }}
      whileTap={{ scale: 0.98 }}
      className={`hover-black-border group relative block overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-500 ${bgClass} ${borderClass} ${pulseClass}`}
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
          background: `radial-gradient(circle 300px at ${glowX.get()}% ${glowY.get()}%, oklch(0.15 0.01 0 / 0.1), transparent 70%)`,
          opacity: isHovered ? 1 : 0.4,
        }}
        animate={{
          scale: live ? [1, 1.08, 1] : [1, 1.03, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

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
            background: "radial-gradient(circle, oklch(0.15 0.01 0 / 0.3), transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            width: [0, 400],
            height: [0, 400],
            opacity: [0.5, 0],
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}

      <div className="relative flex items-center gap-5 p-6 z-10">
        {/* Twitch icon */}
        <motion.div
          className="grid h-12 w-12 shrink-0 place-items-center relative"
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 150, damping: 12 }}
        >
          <motion.div
            animate={live ? { rotate: [0, -4, 4, -3, 0] } : { rotate: 0 }}
            transition={{ duration: 1.2, repeat: live ? Infinity : 0, repeatDelay: 5 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="relative z-10 text-foreground"
          >
            <TwitchIcon size={26} />
          </motion.div>
        </motion.div>

        <motion.span
          className="text-lg font-bold tracking-tight leading-none text-foreground"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Twitch
        </motion.span>

        {/* Status indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
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
                className="flex items-center gap-2.5"
              >
                {live && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-black opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-black shadow-[0_0_10px_var(--accent-black)]"></span>
                  </span>
                )}
                <span
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{
                    color: live ? "var(--accent-black)" : "var(--muted-foreground)",
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
