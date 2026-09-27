import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

const platformStyles: Record<string, { background: string; border: string; glow: string }> = {
  Instagram: {
    background:
      "radial-gradient(circle at 12% 105%, #ffdc80 0%, #fcaf45 18%, transparent 42%), radial-gradient(circle at 92% 8%, #405de6 0%, #833ab4 35%, transparent 70%), linear-gradient(120deg, #feda75 0%, #d62976 48%, #4f5bd5 100%)",
    border: "border-pink-200/45",
    glow: "shadow-[0_18px_42px_-24px_rgba(214,41,118,0.9)]",
  },
  YouTube: {
    background: "linear-gradient(120deg, #ff2020 0%, #e60000 52%, #a90000 100%)",
    border: "border-red-200/40",
    glow: "shadow-[0_18px_42px_-24px_rgba(230,0,0,0.9)]",
  },
  TikTok: {
    background:
      "radial-gradient(circle at 100% 0%, rgba(37,244,238,0.72), transparent 42%), radial-gradient(circle at 0% 100%, rgba(254,44,85,0.72), transparent 44%), linear-gradient(120deg, #090909 0%, #171717 55%, #050505 100%)",
    border: "border-cyan-200/35",
    glow: "shadow-[0_18px_42px_-24px_rgba(37,244,238,0.65)]",
  },
  Facebook: {
    background: "linear-gradient(120deg, #1877f2 0%, #1469da 55%, #0b4fa8 100%)",
    border: "border-blue-200/40",
    glow: "shadow-[0_18px_42px_-24px_rgba(24,119,242,0.9)]",
  },
  Discord: {
    background: "linear-gradient(120deg, #7289da 0%, #5865f2 52%, #3f4aa8 100%)",
    border: "border-indigo-100/40",
    glow: "shadow-[0_18px_42px_-24px_rgba(88,101,242,0.9)]",
  },
};

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
  const style = platformStyles[platform] ?? platformStyles.Instagram;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 16, filter: "blur(7px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, delay: 0.16 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      className={`wine-border group relative flex min-h-20 items-center gap-4 overflow-hidden rounded-lg border px-5 py-4 text-white ${style.border} ${style.glow} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80`}
      style={{
        ["--led-offset" as never]: `${index * -0.8}s`,
        background: style.background,
      }}
    >
      <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center text-white transition-transform duration-500 group-hover:scale-105">
        {icon}
      </span>
      <span className="relative z-10 min-w-0 flex-1">
        <span className="block text-base font-semibold text-white">{platform}</span>
        <span className="mono mt-0.5 block truncate text-[10px] text-white/75">{handle}</span>
      </span>
      <ArrowUpRight
        aria-hidden
        size={17}
        className="relative z-10 shrink-0 text-white/75 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.a>
  );
}
