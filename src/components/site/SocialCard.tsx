import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SocialCard({
  label,
  handle,
  icon,
  iconBgColor,
  onClick,
  href,
  delay = 0,
}: {
  label: string;
  handle: string;
  icon: ReactNode;
  iconBgColor: string;
  onClick?: () => void;
  href?: string;
  delay?: number;
}) {
  const inner = (
    <div className="flex items-center gap-4 p-5">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white"
        style={{ background: iconBgColor }}
      >
        {icon}
      </motion.div>

      <div className="min-w-0 flex-1 self-center">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold tracking-tight leading-none">{label}</span>
          <span className="text-sm font-normal tracking-tight text-foreground/50">@{handle}</span>
        </div>
      </div>
    </div>
  );

  const cls = "hover-red-border group block rounded-2xl border border-white/8 bg-card/60 backdrop-blur-sm";
  const anim = {
    initial: { opacity: 0, y: 12, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.6, delay },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cls}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        {...anim}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${cls} w-full text-left`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      {...anim}
    >
      {inner}
    </motion.button>
  );
}
