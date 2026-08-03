import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function SocialCard({
  label,
  icon,
  onClick,
  href,
  delay = 0,
}: {
  label: string;
  handle: string;
  icon: ReactNode;
  iconBgColor: string;
  onClick?: () => void;
  href?: string;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
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

  // Breathing animation for idle state
  useEffect(() => {
    if (!isHovered) {
      const controlsX = animate(tiltX, [0, 0.3, -0.3, 0], {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay + 2,
      });
      const controlsY = animate(tiltY, [0, 0.2, -0.2, 0], {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay + 3,
      });
      return () => {
        controlsX.stop();
        controlsY.stop();
      };
    }
  }, [isHovered, delay, tiltX, tiltY]);

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

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

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

  const inner = (
    <div
      ref={cardRef}
      className="relative flex items-center gap-5 p-6 overflow-hidden rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {/* Ambient glow that follows mouse */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 300px at ${glowX.get()}% ${glowY.get()}%, oklch(0.15 0.01 0 / 0.08), transparent)`,
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
            background: "radial-gradient(circle, oklch(0.15 0.01 0 / 0.15), transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            width: [0, 450],
            height: [0, 450],
            opacity: [0.5, 0],
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Icon Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.1, type: "spring", stiffness: 120 }}
        className="grid h-12 w-12 shrink-0 place-items-center text-black relative"
      >
        <div className="relative z-10">{icon}</div>
      </motion.div>

      <div className="min-w-0 flex-1 self-center relative z-10">
        <motion.span
          className="text-lg font-bold tracking-tight text-black/80 group-hover:text-black transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        >
          {label}
        </motion.span>
      </div>

      {/* Arrow */}
      <motion.div
        className="absolute right-6"
        animate={{
          opacity: isHovered ? 0.8 : 0,
          x: isHovered ? 0 : -8,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/40">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </motion.div>
    </div>
  );

  const cls = "hover-black-border group relative block overflow-hidden rounded-2xl border border-black/8 bg-card backdrop-blur-xl shadow-2xl transition-all duration-300";
  const anim = {
    initial: { opacity: 0, y: 20, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.7, delay, type: "spring" as const, stiffness: 60, damping: 18 },
  };

  const style = {
    transform: `perspective(1000px) rotateX(${springTiltX.get()}deg) rotateY(${springTiltY.get()}deg)`,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cls}
        style={style}
        whileTap={{ scale: 0.98 }}
        {...anim}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${cls} w-full text-left`}
      style={style}
      whileTap={{ scale: 0.98 }}
      {...anim}
    >
      {inner}
    </motion.button>
  );
}
