import { motion } from "framer-motion";

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  y = 14,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
}) {
  const chars = Array.from(text);
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: c === " " ? "pre" : undefined }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}
