export type MediakitStat = { platform: string; handle: string; value: string };
export type MediakitFormat = { title: string; description: string };

export const mediakit = {
  bio: "Criador de conteúdo, host e presença em eventos. Foco em nightlife, cultura urbana e comunidade.",
  location: "Brasil",
  stats: [
    { platform: "Instagram", handle: "@setexxl", value: "—" },
    { platform: "TikTok", handle: "@setexxl", value: "—" },
    { platform: "YouTube", handle: "setexxl", value: "—" },
    { platform: "Twitch", handle: "setexxl", value: "—" },
  ] as MediakitStat[],
  audience: {
    age: "18–34",
    gender: "Misto",
    regions: ["SP", "RJ", "MG", "DF"],
  },
  formats: [
    { title: "Stories", description: "Sequência com CTA no Instagram." },
    { title: "Reels / TikTok", description: "Vídeo curto integrando a marca." },
    { title: "Presença em evento", description: "Host, ativação e cobertura em tempo real." },
    { title: "Live Twitch", description: "Menções e ativação em stream." },
  ] as MediakitFormat[],
  contactUrl: "https://ig.me/m/setexxl",
  contactLabel: "@setexxl",
};
