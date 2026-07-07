import { motion } from "framer-motion";

export function SevenGlyph({
  className = "",
  size = 120,
  outline = false,
}: {
  className?: string;
  size?: number;
  outline?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: size,
        lineHeight: 0.9,
        letterSpacing: "-0.05em",
        color: outline ? "transparent" : "currentColor",
        WebkitTextStroke: outline ? "1px oklch(0.62 0.24 25 / 0.5)" : undefined,
        userSelect: "none",
      }}
    >
      𝟕
    </span>
  );
}

export function BackgroundSevens() {
  const items = [
    { top: "8%", left: "-4%", size: 380, delay: 0 },
    { top: "42%", right: "-6%", size: 320, delay: 1.5 },
    { top: "78%", left: "10%", size: 240, delay: 3 },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: it.delay * 0.2, duration: 1.2 }}
          className="absolute animate-seven-float"
          style={{
            top: it.top,
            left: (it as any).left,
            right: (it as any).right,
            animationDelay: `${it.delay}s`,
          }}
        >
          <SevenGlyph size={it.size} outline />
        </motion.div>
      ))}
    </div>
  );
}
