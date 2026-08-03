import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScissorsIcon } from "./icons";
import { CutsHubModal } from "./CutsHubModal";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface CutsHubCardProps {
  delay?: number;
}

export function CutsHubCard({ delay = 0 }: CutsHubCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
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
  }, [delay, tiltX, tiltY]);

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
      setModalOpen(true);
    },
    []
  );

  return (
    <>
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
        className="hover-black-border group relative block overflow-hidden rounded-2xl border border-black/10 bg-card backdrop-blur-md w-full text-left shadow-2xl"
        style={{
          transform: `perspective(1000px) rotateX(${springTiltX.get()}deg) rotateY(${springTiltY.get()}deg)`,
        }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 250px at ${glowX.get()}% ${glowY.get()}%, oklch(0.15 0.01 0 / 0.08), transparent)`,
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
              background: "radial-gradient(circle, oklch(0.15 0.01 0 / 0.3), transparent 70%)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              width: [0, 400],
              height: [0, 400],
              opacity: [0.4, 0],
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}

        <div className="relative flex items-center gap-5 p-6 overflow-hidden">
          {/* Icon Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: delay + 0.1, type: "spring", stiffness: 120 }}
            className="grid h-12 w-12 shrink-0 place-items-center text-foreground relative"
          >
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <ScissorsIcon size={26} />
            </motion.div>
          </motion.div>

          <motion.div className="min-w-0 flex-1 self-center relative z-10">
            <motion.span
              className="text-lg font-bold tracking-tight leading-none text-foreground/80 group-hover:text-foreground transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: delay + 0.2 }}
            >
              Cortes de Lives
            </motion.span>
          </motion.div>


          {/* Arrow */}
          <motion.div
            className="absolute right-6"
            animate={{
              opacity: isHovered ? 0.8 : 0,
              x: isHovered ? 0 : -8,
            }}
            transition={{ duration: 0.3 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.button>

      <CutsHubModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
