import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Cabeçalho padrão usado por todas as páginas. */
export function PageHeader({
  title,
  eyebrow,
  subtitle,
  children,
}: {
  title: ReactNode;
  eyebrow?: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      className="mb-[clamp(1.75rem,7vw,2.75rem)] text-center"
    >
      {eyebrow && (
        <div className="mono text-fluid-meta uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </div>
      )}
      <h1 className="text-fluid-hero mt-1 font-bold tracking-tight text-foreground">{title}</h1>
      {subtitle && (
        <p className="text-fluid-body mx-auto mt-2 max-w-[34ch] text-muted-foreground">{subtitle}</p>
      )}
      {children}
    </motion.header>
  );
}
