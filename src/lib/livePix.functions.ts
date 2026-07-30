import { createServerFn } from "@tanstack/react-start";

// Inicia um pagamento/mensagem no LivePix.
// Usa OAuth2 client_credentials para autenticar na API do LivePix.
// Requer LIVEPIX_CLIENT_ID e LIVEPIX_CLIENT_SECRET nas variáveis de ambiente.
export const createLivePixPayment = createServerFn({ method: "POST" })
  .inputValidator((d: { amount: number; currency?: string }) => d)
  .handler(async ({ data }) => {
    try {
      const clientId = process.env.LIVEPIX_CLIENT_ID;
      const clientSecret = process.env.LIVEPIX_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return {
          success: false as const,
          redirectUrl: `https://livepix.gg/setexxl`,
          error: "LivePix credentials not configured",
        };
      }

      // 1. Obter token de acesso via client_credentials
      const tokenRes = await fetch("https://oauth.livepix.gg/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
          scope: "wallet:read payments:write messages:write account:read",
        }),
      });

      if (!tokenRes.ok) {
        return {
          success: false as const,
          redirectUrl: `https://livepix.gg/setexxl`,
          error: "Failed to get access token",
        };
      }

      const tokenData = (await tokenRes.json()) as { access_token: string };

      // 2. Criar pagamento (message)
      const payload: Record<string, unknown> = {
        amount: data.amount, // em centavos
        currency: data.currency || "BRL",
        redirectUrl: `https://sete.bio`,
      };

      const msgRes = await fetch("https://api.livepix.gg/v2/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!msgRes.ok) {
        return {
          success: false as const,
          redirectUrl: `https://livepix.gg/setexxl`,
          error: "Failed to create message",
        };
      }

      const msgData = (await msgRes.json()) as {
        data: {
          reference?: string;
          redirectUrl?: string;
        };
      };

      return {
        success: true as const,
        redirectUrl: msgData.data?.redirectUrl || `https://livepix.gg/setexxl`,
        reference: msgData.data?.reference,
      };
    } catch {
      return {
        success: false as const,
        redirectUrl: `https://livepix.gg/setexxl`,
        error: "Internal error",
      };
    }
  });

// Consulta as últimas mensagens de apoio recebidas.
export const getLivePixRecentMessages = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const clientId = process.env.LIVEPIX_CLIENT_ID;
    const clientSecret = process.env.LIVEPIX_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return { messages: [] };
    }

    // 1. Obter token
    const tokenRes = await fetch("https://oauth.livepix.gg/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "messages:read",
      }),
    });

    if (!tokenRes.ok) return { messages: [] };
    const tokenData = (await tokenRes.json()) as { access_token: string };

    // 2. Listar mensagens recentes
    const msgRes = await fetch("https://api.livepix.gg/v2/messages?limit=5", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!msgRes.ok) return { messages: [] };

    const json = (await msgRes.json()) as {
      data: Array<{
        id: string;
        username: string;
        message: string;
        amount: number;
        currency: string;
        createdAt: string;
      }>;
    };

    return { messages: json.data || [] };
  } catch {
    return { messages: [] };
  }
});
