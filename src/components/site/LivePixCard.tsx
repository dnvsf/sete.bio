import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { LivePixIcon } from "./icons";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface LivePixCardProps {
  onClick: () => void;
  delay?: number;
}

export function LivePixCard({ onClick, delay = 0 }: LivePixCardProps) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 25 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 25 });

  // Glow position
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  // Ripple state
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Breathing
  useEffect(() => {
    if (!isHovered) {
      animate(tiltX, [0, 0.3, -0.3, 0], {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay + 2,
      });
      animate(tiltY, [0, 0.2, -0.2, 0], {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay + 3,
      });
    } else {
      tiltX.stop();
      tiltY.stop();
    }
  }, [isHovered, delay]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      tiltX.set(((y - centerY) / centerY) * -6);
      tiltY.set(((x - centerX) / centerX) * 6);
      glowX.set((x / rect.width) * 100);
      glowY.set((y / rect.height) * 100);
    },
    [tiltX, tiltY, glowX, glowY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [tiltX, tiltY, glowX, glowY]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ripple: Ripple = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now(),
      };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 700);
      onClick?.();
    },
    [onClick]
  );

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, type: "spring" as const, stiffness: 60, damping: 18 }}
      whileTap={{ scale: 0.98 }}
      className="hover-red-border group relative block overflow-hidden rounded-2xl border border-white/8 bg-card/60 backdrop-blur-sm w-full text-left"
      style={{
        transform: `perspective(1000px) rotateX(${springTiltX.get()}deg) rotateY(${springTiltY.get()}deg)`,
      }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 250px at ${glowX.get()}% ${glowY.get()}%, oklch(0.70 0.18 280 / 0.08), transparent)`,
        }}
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
            background: "radial-gradient(circle, oklch(0.70 0.18 280 / 0.3), transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            width: [0, 300],
            height: [0, 300],
            opacity: [0.4, 0],
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}

      <div className="relative flex items-center gap-4 p-5 overflow-hidden">
        {/* Icon with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.1, type: "spring", stiffness: 120 }}
          className="grid h-12 w-12 shrink-0 place-items-center text-white relative"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.70 0.18 280 / 0.4), transparent 70%)",
              filter: "blur(8px)",
            }}
            animate={{
              opacity: isHovered ? 0.4 : 0,
              scale: isHovered ? 1.3 : 1,
            }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="relative z-10"
            animate={isHovered ? { y: 0 } : { y: [0, -1, 0, 1, 0] }}
            transition={isHovered ? { type: "spring" as const, stiffness: 300, damping: 15 } : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }}
          >
            <LivePixIcon size={26} />
          </motion.div>
        </motion.div>

        <motion.div
          className="min-w-0 flex-1 self-center relative z-10"
        >
          <motion.span
            className="text-xl font-bold tracking-tight leading-none"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.2 }}
          >
            LivePix
          </motion.span>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="absolute right-4"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            x: isHovered ? 0 : -4,
          }}
          transition={{ duration: 0.3 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
}
