import { motion } from "framer-motion";
import { SevenGlyph } from "./SevenGlyph";

export function SectionDivider({ label }: { label?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="my-12 flex items-center gap-6"
      aria-hidden={!label}
    >
      <motion.div
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ transformOrigin: "right center" }}
        className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60"
      >
        <span className="animate-seven-fade text-accent-red">
          <SevenGlyph size={12} />
        </span>
        {label && <span className="text-white/40">{label}</span>}
        <span className="animate-seven-fade text-accent-red" style={{ animationDelay: "1.2s" }}>
          <SevenGlyph size={12} />
        </span>
      </motion.div>
      <motion.div
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ transformOrigin: "left center" }}
        className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </motion.div>
  );
}
