import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import type { ReactNode } from "react";
import { InstagramIcon, WhatsAppIcon } from "./icons";

function Pill({
  href,
  label,
  icon,
  delay = 0,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  delay?: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="hover-black-border group inline-flex items-center gap-1.5 rounded-full border border-black/8 bg-card/50 px-3 py-1.5 text-xs text-foreground/80 backdrop-blur-sm transition-colors hover:text-foreground"
    >
      <span className="text-accent-black">{icon}</span>
      <span className="mono uppercase tracking-wider text-[10px]">{label}</span>
    </motion.a>
  );
}

export function TopContactBar() {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
      <Pill href="mailto:fala@setexxl.com" label="Email" icon={<Mail size={12} />} delay={0} />
      <Pill href="https://ig.me/m/setexxl" label="Direct" icon={<InstagramIcon size={12} />} delay={0.06} />
      <Pill href="https://wa.me/5511939244516" label="WhatsApp" icon={<WhatsAppIcon size={12} />} delay={0.12} />
    </div>
  );
}

