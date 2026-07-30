import { motion } from "framer-motion";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "./icons";

interface SocialIconsBarProps {
  instagram?: { handle: string; url: string };
  tiktok?: { handle: string; url: string };
  youtube?: { handle: string; url: string };
}

export function SocialIconsBar({ instagram, tiktok, youtube }: SocialIconsBarProps) {
  const icons = [
    {
      key: "youtube",
      label: "YouTube",
      href: youtube?.url || `https://youtube.com/@${youtube?.handle || "setexxl"}`,
      icon: <YouTubeIcon size={22} />,
      color: "oklch(0.55 0.22 30)",
    },
    {
      key: "instagram",
      label: "Instagram",
      href: instagram?.url || `https://instagram.com/${instagram?.handle || "setexxl"}`,
      icon: <InstagramIcon size={22} />,
      color: "oklch(0.45 0.18 330)",
    },
    {
      key: "tiktok",
      label: "TikTok",
      href: tiktok?.url || `https://tiktok.com/@${tiktok?.handle || "setexxl"}`,
      icon: <TikTokIcon size={22} />,
      color: "oklch(0.35 0.12 280)",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4 mb-5">
      {icons.map((item, i) => (
        <motion.a
          key={item.key}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="relative group"
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 150, damping: 20 }}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title={item.label}
        >
          {/* Glow on hover */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle, ${item.color} / 0.25, transparent 70%)`,
              filter: "blur(8px)",
              transform: "scale(1.4)",
            }}
          />
          {/* Icon circle */}
          <div
            className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20"
            style={{
              background: `oklch(0.20 0.005 260 / 0.6)`,
              color: "oklch(0.98 0.005 260)",
            }}
          >
            {item.icon}
          </div>
        </motion.a>
      ))}
    </div>
  );
}
