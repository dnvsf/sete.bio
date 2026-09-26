import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function SocialLinkCard({
  platform,
  handle,
  href,
  icon,
  index,
}: {
  platform: string;
  handle: string;
  href: string;
  icon: ReactNode;
  index: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 16, filter: "blur(7px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, delay: 0.16 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      className="wine-border group relative flex min-h-20 items-center gap-4 overflow-hidden rounded-lg bg-card px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{ ["--led-offset" as never]: `${index * -0.8}s` }}
    >
      <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center text-primary transition-transform duration-500 group-hover:scale-105">
        {icon}
      </span>
      <span className="relative z-10 min-w-0 flex-1">
        <span className="block text-base font-semibold text-foreground">{platform}</span>
        <span className="mono mt-0.5 block truncate text-[10px] text-muted-foreground">{handle}</span>
      </span>
      <ArrowUpRight
        aria-hidden
        size={17}
        className="relative z-10 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.a>
  );
}