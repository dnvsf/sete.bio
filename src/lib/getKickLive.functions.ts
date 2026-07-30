import { createServerFn } from "@tanstack/react-start";

// Retorna { live } para o canal setexxl na Kick.
// Usa o endpoint público da Kick API v1 que não requer autenticação.
export const getKickLive = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const slug = "setexxl";

    // Endpoint público que retorna dados do canal + livestream
    const res = await fetch(
      `https://kick.com/api/v1/channels/${encodeURIComponent(slug)}/livestream`,
      {
        headers: {
          "User-Agent": "SetteNexus/1.0",
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) return { live: false as const };

    const json = (await res.json()) as {
      id?: number;
      is_live?: boolean;
    };

    return { live: json?.is_live === true };
  } catch {
    return { live: false as const };
  }
});
