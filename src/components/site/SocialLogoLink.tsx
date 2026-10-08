import { motion, useReducedMotion } from "framer-motion";
import type { SocialLink } from "@/data/site";
import { DiscordIcon, FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "./icons";

export function SocialLogoLink({ social, index }: { social: SocialLink; index: number }) {
  const reducedMotion = useReducedMotion();

  const logoByPlatform = {
    Instagram: <InstagramIcon size={32} />,
    YouTube: <YouTubeIcon size={34} />,
    TikTok: <TikTokIcon size={34} />,
    Facebook: <FacebookIcon size={34} />,
    Discord: <DiscordIcon size={34} />,
  };

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${social.platform} ${social.handle}`}
      title={social.platform}
      initial={{ opacity: 0, y: 14, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { scale: 1.14, y: -2 }}
      whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      className="group inline-flex h-12 w-12 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <span className="transition-[filter] duration-300 group-hover:drop-shadow-[0_0_10px_currentColor]">
        {logoByPlatform[social.platform]}
      </span>
    </motion.a>
  );
}
