import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { LiveBanner } from "@/components/site/LiveBanner";
import { SocialLinkCard } from "@/components/site/SocialLinkCard";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/site/icons";
import { siteConfig } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sete | sete.bio" },
      { name: "description", content: "Todas as redes sociais do Sete." },
      { property: "og:title", content: "Sete | sete.bio" },
      { property: "og:description", content: "Todas as redes sociais do Sete." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sete | sete.bio" },
      { name: "twitter:description", content: "Todas as redes sociais do Sete." },
    ],
  }),
  component: Home,
});

function Home() {
  const iconByPlatform = {
    Instagram: <InstagramIcon size={22} />,
    YouTube: <YouTubeIcon size={23} />,
    TikTok: <TikTokIcon size={22} />,
  };

  return (
    <main className="relative min-h-screen overflow-hidden grain">
      <div aria-hidden className="ambient-wine fixed inset-0 pointer-events-none" />
      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-14">
        <LiveBanner online={siteConfig.liveOnline} href={siteConfig.liveUrl} />

        <section aria-label="Redes sociais" className="mt-5 grid gap-3">
          {siteConfig.socials.map((social, index) => (
            <SocialLinkCard
              key={social.platform}
              {...social}
              index={index}
              icon={iconByPlatform[social.platform]}
            />
          ))}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pb-8 pt-20 sm:pt-24"
          aria-labelledby="partnerships-heading"
        >
          <div className="flex items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <h2 id="partnerships-heading" className="mono text-[10px] font-medium uppercase tracking-[0.42em] text-muted-foreground">
              Parcerias
            </h2>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>

          <div className="mt-10 divide-y divide-border border-y border-border">
            <a
              href={`mailto:${siteConfig.partnershipEmail}`}
              className="group flex min-h-16 items-center justify-between gap-4 text-sm text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary"
            >
              <span className="flex items-center gap-3"><Mail size={16} /> E-mail</span>
              <span className="mono truncate text-[10px] text-muted-foreground">{siteConfig.partnershipEmail}</span>
            </a>
            <a
              href={siteConfig.partnershipInstagram}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-16 items-center justify-between gap-4 text-sm text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary"
            >
              <span className="flex items-center gap-3"><InstagramIcon size={17} /> Instagram</span>
              <span className="mono text-[10px] text-muted-foreground">@setexxl</span>
            </a>
          </div>

          <div aria-label="Espaço reservado para futuros parceiros" className="mt-12 h-16 border-y border-dashed border-border/60" />
        </motion.section>
      </div>
    </main>
  );
}
