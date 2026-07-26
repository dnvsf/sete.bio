import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function ProjectCard({
  label,
  description,
  onClick,
  delay = 0,
}: {
  label: string;
  description: string;
  onClick: () => void;
  delay?: number;
}) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 25 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 25 });

  // Glow position follows mouse
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  // Ripple state
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Breathing animation
  useEffect(() => {
    if (!isHovered) {
      animate(tiltX, [0, 0.2, -0.2, 0], {
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay + 2,
      });
      animate(tiltY, [0, 0.15, -0.15, 0], {
        duration: 11,
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
      tiltX.set(((y - centerY) / centerY) * -5);
      tiltY.set(((x - centerX) / centerX) * 5);
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
      onClick();
    },
    [onClick]
  );

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, type: "spring" as const, stiffness: 60, damping: 18 }}
      className="hover-red-border group relative block overflow-hidden rounded-2xl border border-white/8 bg-card/60 backdrop-blur-sm w-full text-left cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${springTiltX.get()}deg) rotateY(${springTiltY.get()}deg)`,
      }}
    >
      {/* Ambient glow that follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 250px at ${glowX.get()}% ${glowY.get()}%, oklch(0.95 0.01 260 / 0.05), transparent)`,
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
            background: "radial-gradient(circle, oklch(0.95 0.01 260 / 0.3), transparent 70%)",
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

      {/* Content — centered */}
      <div className="relative flex flex-col items-center gap-2 p-6 z-10">
        {/* Arrow hint on hover */}
        <motion.div
          className="absolute top-4 right-4"
          animate={{
            opacity: isHovered ? 0.4 : 0,
            x: isHovered ? 0 : -4,
          }}
          transition={{ duration: 0.3 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.div>

        <motion.span
          className="text-lg font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.15 }}
        >
          {label}
        </motion.span>

        <motion.p
          className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.25 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.button>
  );
}
