import { motion } from "framer-motion";
import { SevenGlyph } from "./SevenGlyph";

export function SectionDivider({ label }: { label?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="my-10 flex items-center gap-4"
      aria-hidden={!label}
    >
      <motion.div
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        style={{ transformOrigin: "right center" }}
        className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 4 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span className="animate-seven-fade text-accent-red-glow">
          <SevenGlyph size={14} />
        </span>
        {label && <span>{label}</span>}
        <span className="animate-seven-fade text-accent-red-glow" style={{ animationDelay: "1.2s" }}>
          <SevenGlyph size={14} />
        </span>
      </motion.div>
      <motion.div
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        style={{ transformOrigin: "left center" }}
        className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </motion.div>
  );
}
