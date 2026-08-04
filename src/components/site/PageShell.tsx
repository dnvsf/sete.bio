import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { BackgroundSevens } from "./SevenGlyph";
import { CursorGlow } from "./CursorGlow";
import { FloatingParticles } from "./FloatingParticles";

/**
 * Shell padrão de todas as páginas do sete.bio.
 * Garante o mesmo fundo, a mesma entrada e o mesmo container responsivo.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative min-h-[100dvh] overflow-x-hidden"
    >
      <CursorGlow />
      <FloatingParticles />
      <BackgroundSevens />

      <div className="relative z-10 min-h-[100dvh]">
        <div className="page-container pb-32 pt-[clamp(2.5rem,10vw,6rem)]">{children}</div>
      </div>
    </motion.div>
  );
}

/** Espaçamento vertical padrão entre cards/seções. */
export function PageStack({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-[clamp(0.75rem,3vw,1rem)]">{children}</div>;
}
