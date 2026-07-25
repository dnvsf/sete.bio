import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export function SocialCard({
  label,
  handle,
  icon,
  iconBgColor,
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
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const glowX = useTransform(x, [0, 1], [-100, 100]);
  const glowY = useTransform(y, [0, 1], [-100, 100]);

  useEffect(() => {
    // Subtle idle glow animation on the icon
    animate(x, [0.5, 0.6, 0.4, 0.5], {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay + 1,
    });
    animate(y, [0.5, 0.55, 0.45, 0.5], {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay + 2,
    });
  }, [delay]);

  const inner = (
    <div
      ref={cardRef}
      className="relative flex items-center gap-4 p-5 overflow-hidden rounded-2xl"
    >
      {/* Ambient gradient inside card */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at 0% 50%, oklch(0.95 0.01 260 / 0.06), transparent)`,
          x: glowX,
          y: glowY,
        }}
      />

      {/* Icon with subtle glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.1, type: "spring", stiffness: 120 }}
        className="grid h-12 w-12 shrink-0 place-items-center text-white relative"
      >
        {/* Glow behind icon */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle, oklch(0.95 0.01 260 / 0.4), transparent 70%)",
            filter: "blur(8px)",
          }}
          whileHover={{ scale: 1.2 }}
        />
        <motion.div
          whileHover={{ scale: 1.15, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative z-10"
        >
          {icon}
        </motion.div>
      </motion.div>

      <div className="min-w-0 flex-1 self-center relative z-10">
        <div className="flex items-baseline gap-2">
          <motion.span
            className="text-xl font-bold tracking-tight leading-none"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.2 }}
          >
            {label}
          </motion.span>
          <motion.span
            className="text-sm font-normal tracking-tight text-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.35 }}
          >
            @{handle}
          </motion.span>
        </div>
      </div>

      {/* Arrow that appears on hover */}
      <motion.div
        className="absolute right-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        whileHover={{ x: 3 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </motion.div>
    </div>
  );

  const cls = "hover-red-border group relative block overflow-hidden rounded-2xl border border-white/8 bg-card/60 backdrop-blur-sm";
  const anim = {
    initial: { opacity: 0, y: 20, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.7, delay, type: "spring" as const, stiffness: 60, damping: 18 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cls}
        whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
        whileTap={{ scale: 0.985 }}
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
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.985 }}
      {...anim}
    >
      {inner}
    </motion.button>
  );
}
