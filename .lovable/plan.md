# sete.bio — Plano de construção

Link-in-bio pessoal do "Sete" (setexxl). Dark, futurista, animações slim inspiradas na Hostinger, detalhes vermelhos discretos, motivo gráfico do número **𝟕**. Sem cara de IA, sem visual Linktree.

## Estilo visual (design system)

- **Fundo**: preto profundo (`#08080A`) com camadas sutis de ruído/grain e um "aurora" vermelho muito discreto no topo.
- **Vermelho de acento**: `#B00000` (do XXL enviado) + brilho `#FF2A2A` só em hover/foco/clique.
- **Tipografia**:
  - Display: **Space Grotesk** (títulos, nomes de plataformas).
  - Mono/tag: **JetBrains Mono** (usernames tipo `/setexxl`, timestamps de eventos).
  - Número 7 renderizado como glifo especial usando **`𝟕`** (Mathematical Bold) em blocos decorativos animados.
- **Motion** (via `framer-motion` + CSS): borda animada gradient-conic vermelha em hover dos cards, cursor-glow discreto, número 7 flutuando em paralax leve no fundo, entrada com blur+fade+translate, ripple vermelho ao clicar.
- **Cards**: cantos arredondados (16px), borda 1px `white/8`, glass sutil, "recorte" circular (mask CSS) para o indicador On/Off e para a foto de perfil sobre a capa.

## Estrutura da home (`/`)

1. **Capa** full-width (imagem enviada `IMG_20260707_150116.jpg` — bloco XXL vermelho), com overlay gradient para o preto e um 𝟕 gigante em outline vermelho translúcido animando devagar.
2. **Foto de perfil** quadrada, cantos arredondados, centralizada, sobreposta 50/50 entre capa e fundo, com borda grossa da cor do fundo (efeito "recorte"). Usa `IMG_20260707_150616.jpg`.
3. **Nome "Sete"** + handle `@setexxl` em mono. Sem descrição.
4. **Card destaque — Twitch** (largura total):
   - Ícone Twitch + `Twitch/` (Space Grotesk bold, maior) + `setexxl` (mono, menor, opacity 70%).
   - No lado direito, **recorte circular** (mask) com badge **On/Off** — verde `#22C55E` quando live, vermelho quando offline. Status busca a API pública da Twitch via server function (Helix `GET /streams?user_login=setexxl`) usando Client-ID/Secret guardados como secret; enquanto não houver secret, fica em Off estático (sem quebrar).
   - Hover: borda animada vermelha percorre o card.
5. **Mini-cards em linha** (Instagram, TikTok, YouTube):
   - Grid 3 colunas mobile, ícone grande, `Rede/` + `setexxl` no mesmo padrão tipográfico.
   - **YouTube** abre **modal customizado** com duas opções: **Canal Principal** (`setexxl`) e **Cortes** (`seteclipes`).
6. **Divisor de seção** — linha fina com um `𝟕` central pulsando em vermelho discreto.
7. **Seção Eventos (foco principal)**:
   - Título "Próximos rolês" + subtítulo curto.
   - Lista dos eventos da semana como cards horizontais: data (dia/mês grande em mono), nome do evento, casa/parceiro, cidade, botões **Lista (ganho comissão)** e **Ingresso**.
   - Filtro por dia da semana (chips).
   - Dados vêm de um arquivo estático `src/data/events.ts` (array tipado) — fácil de editar manualmente até termos admin.
   - Se não houver evento na semana, estado vazio elegante com 𝟕 e "Semana livre. Volte em breve."
8. **Seção Parceiros / Casas** — grid de logos-texto (SIDE, etc.) que linkam para `/[slug]` da casa.
9. **Contato comercial** — card único: "Parcerias & mídia" → botão que abre DM do Instagram `@setexxl` (`https://ig.me/m/setexxl`).
10. **Mediakit** — card com badge "Em breve", desabilitado mas visível.
11. **Rodapé** minimalista: `sete.bio` + `𝟕` + ano.

## Rotas de parceiros — `/[slug]` (ex.: `/side`)

Página dedicada por casa/parceiro. Dados em `src/data/partners.ts` (slug → { nome, logo/cor, instagram, contatoIngresso (WhatsApp/DM), próximos eventos filtrados pelo slug }).

Conteúdo:
- Header com nome da casa e cor de destaque.
- **Próximos eventos daquela casa** (mesmos cards da home, filtrados).
- **Comprar ingresso / entrar na lista** — CTA grande vermelho com ripple.
- **Contato** (WhatsApp/DM) + **Instagram da casa**.
- Botão voltar para `sete.bio`.

Slug desconhecido → 404 customizado no estilo do site (𝟕 grande, "rota não encontrada").

## SEO / metadata

- `__root.tsx`: title `sete.bio — setexxl`, description curta, og:type website, twitter card.
- `/`: og:image = foto de capa (assinada via `lovable-assets`).
- `/[slug]`: title dinâmico `Sete × {Parceiro}`.

## Detalhes técnicos

- **Stack**: TanStack Start já configurado. Sem Lovable Cloud (não pedido / desabilitado); dados de eventos e parceiros em arquivos TS versionados.
- **Assets**: fotos enviadas viram pointers via `lovable-assets create` a partir de `/mnt/user-uploads/` → `src/assets/*.asset.json`.
- **Rotas**:
  - `src/routes/__root.tsx` (atualizar meta + fontes via `<link>` no head).
  - `src/routes/index.tsx` (home).
  - `src/routes/$slug.tsx` (páginas de parceiros).
- **Componentes** em `src/components/site/`: `Cover`, `Avatar`, `TwitchCard`, `MiniSocialCard`, `YouTubeModal`, `SectionDivider`, `EventCard`, `EventsList`, `PartnersGrid`, `ContactCard`, `MediakitCard`, `Footer`, `SevenGlyph`, `AnimatedBorder`, `RippleButton`, `CursorGlow`.
- **Dados iniciais**: 3–4 eventos placeholder + 1 parceiro exemplo (`side`) para o sistema já funcionar.
- **Twitch live status**: server function `getTwitchLive.functions.ts`; se `TWITCH_CLIENT_ID`/`TWITCH_CLIENT_SECRET` ausentes → retorna `{ live: false }` sem erro. Podemos adicionar os secrets depois.
- **Fontes**: Space Grotesk + JetBrains Mono via `<link>` no head do root (regra Tailwind v4 — nunca `@import` remoto no CSS).
- **Tokens**: definir em `src/styles.css` (`--background`, `--accent-red`, `--accent-red-glow`, `--font-display`, `--font-mono`, radius, shadows vermelhas).

## O que fica para depois (avisado no site quando aplicável)

- Painel admin (outro projeto, como você disse).
- Mediakit real (card já mostra "em breve").
- Contato comercial multi-canal (por ora só DM Instagram).
- Integração real com API de venda de ingressos (por ora link externo por evento).

Ao aprovar, eu construo tudo de uma vez — home + rota de parceiro + dados exemplo + animações + assets — para o site já ficar navegável.
