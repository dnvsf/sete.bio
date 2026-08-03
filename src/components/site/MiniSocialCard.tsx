import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function MiniSocialCard({
  label,
  handle,
  icon,
  onClick,
  href,
  delay = 0,
}: {
  label: string;
  handle: string;
  icon: ReactNode;
  onClick?: () => void;
  href?: string;
  delay?: number;
}) {
  const inner = (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-black/8 bg-card/60 p-4 backdrop-blur-sm transition-colors group-hover:bg-card/80">
      <div className="text-foreground/90">{icon}</div>
      <div className="flex flex-col items-center gap-0.5 text-center">
        <div className="text-base font-bold leading-tight tracking-tight">{label}</div>
        <div className="mono text-[10px] text-muted-foreground">@{handle}</div>
      </div>
    </div>
  );
  const cls = "hover-black-border group block h-full rounded-2xl";
  const anim = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 },
  };
  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noreferrer" className={cls} {...anim}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} className={`${cls} text-left`} {...anim}>
      {inner}
    </motion.button>
  );
}
