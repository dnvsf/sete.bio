import { createServerFn } from "@tanstack/react-start";

// Retorna { live } para o canal setexxl. Usa o gateway Lovable/Twitch se
// LOVABLE_API_KEY + TWITCH_API_KEY estiverem presentes; caso contrário
// retorna live:false silenciosamente para não quebrar a UI.
export const getTwitchLive = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const login = "setexxl";
    const lovableKey = process.env.LOVABLE_API_KEY;
    const twitchKey = process.env.TWITCH_API_KEY;
    if (!lovableKey || !twitchKey) return { live: false as const };

    const res = await fetch(
      `https://connector-gateway.lovable.dev/twitch/streams?user_login=${encodeURIComponent(login)}`,
      {
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": twitchKey,
        },
      },
    );
    if (!res.ok) return { live: false as const };
    const json = (await res.json()) as { data?: Array<unknown> };
    return { live: Array.isArray(json.data) && json.data.length > 0 };
  } catch {
    return { live: false as const };
  }
});
