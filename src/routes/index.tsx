import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { TwitchCard } from "@/components/site/TwitchCard";
import { SocialCard } from "@/components/site/SocialCard";
import { YouTubeModal } from "@/components/site/YouTubeModal";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/site/icons";
import { listSocials, type SocialDTO } from "@/lib/publicData.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sete | sete.bio" },
      { name: "description", content: "Todas as redes sociais do Sete." },
      { property: "og:title", content: "Sete | sete.bio" },
      { property: "og:description", content: "Todas as redes sociais do Sete." },
    ],
  }),
  component: Home,
});

const led = (offset: string): CSSProperties => ({ ["--led-offset" as never]: offset });

function pickSocial(list: SocialDTO[] | undefined, platform: string) {
  return list?.find((s) => s.platform.toLowerCase() === platform.toLowerCase());
}

function Home() {
  const [ytOpen, setYtOpen] = useState(false);

  const listSocialsFn = useServerFn(listSocials);
  const { data: socials } = useQuery({
    queryKey: ["socials"],
    queryFn: () => listSocialsFn(),
    staleTime: 60_000,
  });
  const ig = pickSocial(socials, "instagram");
  const tk = pickSocial(socials, "tiktok");
  const yt = pickSocial(socials, "youtube");
  const tw = pickSocial(socials, "twitch");

  return (
    <div className="relative min-h-screen">
      <div className="relative mx-auto max-w-xl px-4 pb-24 pt-14 sm:pt-20">
        {/* Lista de cards */}
        <div className="flex flex-col gap-3">
          <div style={led("0s")}>
            <TwitchCard handle={tw?.handle || "setexxl"} />
          </div>

          <div style={led("0.8s")}>
            <SocialCard
              label="Instagram"
              handle={ig?.handle || "setexxl"}
              icon={<InstagramIcon size={26} />}
              iconBgColor="oklch(0.45 0.18 330)"
              href={ig?.url || `https://instagram.com/${ig?.handle || "setexxl"}`}
              delay={0.15}
            />
          </div>

          <div style={led("1.6s")}>
            <SocialCard
              label="TikTok"
              handle={tk?.handle || "setexxl"}
              icon={<TikTokIcon size={26} />}
              iconBgColor="oklch(0.35 0.12 280)"
              href={tk?.url || `https://tiktok.com/@${tk?.handle || "setexxl"}`}
              delay={0.25}
            />
          </div>

          <div style={led("2.4s")}>
            <SocialCard
              label="YouTube"
              handle={yt?.handle || "setexxl"}
              icon={<YouTubeIcon size={26} />}
              iconBgColor="oklch(0.55 0.22 30)"
              onClick={() => setYtOpen(true)}
              delay={0.35}
            />
          </div>
        </div>

        <YouTubeModal open={ytOpen} onClose={() => setYtOpen(false)} />
      </div>
    </div>
  );
}
