import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useState } from "react";

export function ProjectCard({
  label,
  delay = 0,
}: {
  label: string;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 25 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 25 });

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = e.currentTarget;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    tiltX.set(((y - centerY) / centerY) * -5);
    tiltY.set(((x - centerX) / centerX) * 5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  // Render placeholder lines instead of real text
  const placeholderLines = label.split(" ").map(() => 0);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="hover-white-border group relative block overflow-hidden rounded-2xl border border-black/8 bg-card/60 backdrop-blur-sm w-full text-left select-none"
      style={{
        transform: `perspective(1000px) rotateX(${springTiltX.get()}deg) rotateY(${springTiltY.get()}deg)`,
      }}
    >
      {/* Ambient glow that follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 250px at 50% 50%, oklch(0.95 0.01 260 / 0.05), transparent)`,
        }}
      />

      {/* Content — placeholder only, no real text in DOM */}
      <div className="relative flex flex-col items-center gap-3 p-6 min-h-[5.5rem]">
        {/* Lock icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.1, type: "spring", stiffness: 200, damping: 15 }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground/20"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </motion.div>

        {/* Placeholder lines — no actual text content */}
        <div className="flex gap-1.5">
          {placeholderLines.map((_, i) => (
            <div
              key={i}
              className="h-2.5 rounded-full bg-foreground/10"
              style={{
                width: `${40 + Math.random() * 25}px`,
                filter: "blur(3px)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
