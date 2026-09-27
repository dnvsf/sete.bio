import { motion, useReducedMotion } from "framer-motion";
import { SevenGlyph } from "./SevenGlyph";

export function SiteLoader() {
  const reducedMotion = useReducedMotion();
  const sideTransition = reducedMotion
    ? { duration: 0 }
    : { delay: 0.16, duration: 0.62, ease: [0.22, 1, 0.36, 1] as const };
  const centerTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const };

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
      <div className="relative h-32 w-80 text-primary">
        <motion.span
          aria-hidden
          initial={reducedMotion ? false : { opacity: 0, x: 0, scale: 0.35 }}
          animate={{ opacity: 0.8, x: -76, scale: 1 }}
          transition={sideTransition}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <SevenGlyph size={102} />
        </motion.span>
        <motion.span
          aria-hidden
          initial={reducedMotion ? false : { opacity: 0, scale: 0.35 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={centerTransition}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <SevenGlyph size={102} />
        </motion.span>
        <motion.span
          aria-hidden
          initial={reducedMotion ? false : { opacity: 0, x: 0, scale: 0.35 }}
          animate={{ opacity: 0.8, x: 76, scale: 1 }}
          transition={sideTransition}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <SevenGlyph size={102} />
        </motion.span>
      </div>
    </motion.div>
  );
}
