import { motion, useReducedMotion } from "framer-motion";

export function SiteLoader() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      role="status"
      aria-label="Carregando site"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.45 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className="font-display flex items-center gap-3 text-7xl font-black tracking-[0.16em] text-primary drop-shadow-[0_0_18px_rgba(160,20,35,0.55)] sm:text-8xl"
        aria-label="SETE"
      >
        <span aria-hidden>S</span>
        <span aria-hidden>E</span>
        <span aria-hidden>T</span>
        <span aria-hidden>E</span>
      </motion.div>
    </motion.div>
  );
}
