import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function LinkCard({
  label,
  handle,
  icon,
  href,
  cta,
  delay = 0,
}: {
  label: string;
  handle?: string;
  icon: ReactNode;
  href: string;
  cta?: string;
  delay?: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, type: "spring" as const, stiffness: 60, damping: 18 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="hover-black-border group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-black/8 bg-card p-6 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.28)]"
    >
      <motion.div
        className="grid h-12 w-12 shrink-0 place-items-center text-foreground"
        whileHover={{ scale: 1.12 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {icon}
      </motion.div>

      <div className="min-w-0 flex-1">
        <div className="text-lg font-bold leading-none tracking-tight text-foreground/85 transition-colors group-hover:text-foreground">
          {label}
        </div>
        {handle && (
          <div className="mono mt-1.5 text-[11px] tracking-wide text-muted-foreground">{handle}</div>
        )}
      </div>

      <span className="mono shrink-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">
        {cta ?? "Abrir"}
      </span>
    </motion.a>
  );
}
