## Objetivo
Enxugar a home como hub (contatos no topo + cards de redes + Twitch), criar página pública de parceiro em `/[slug]` e ler os dados diretamente do Supabase do painel `adm.sete.bio` para que qualquer alteração no painel reflita aqui em tempo real.

---

## 1. Conexão com o Supabase do adm (pré-requisito)

O painel `adm.sete.bio` roda em Lovable Cloud e já tem as tabelas prontas (`partners`, `events`, `socials`, `site_settings`, `mediakit*`, `short_links`, `cards`, `sessions`). Este projeto (`sete.bio`) está com Lovable Cloud desativado, por isso as mudanças no adm não aparecem aqui hoje.

Para sincronizar, preciso que você faça **uma** destas ações antes do build:

- **Opção A (recomendada, sem custo extra):** ative Lovable Cloud neste projeto e me diga o `Project ID` do Supabase do adm. Eu conecto o mesmo banco (mesmas chaves publishable) — leituras públicas caem nas policies `USING (is_active)` já criadas no adm.
- **Opção B:** você me passa manualmente `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (e as versões server `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY`) do projeto Supabase do adm; eu salvo como secrets e uso do mesmo jeito.

Enquanto isso não acontecer, o site continua funcional com os mocks atuais e eu deixo a camada de fetch pronta para plugar (troca de 1 arquivo).

---

## 2. Camada de dados (nova)

Criar `src/integrations/supabase/` (client publishable server + client browser) e `src/data/*.functions.ts` com server functions públicas (sem `requireSupabaseAuth`, usando client publishable com `SUPABASE_PUBLISHABLE_KEY`, que respeita as policies `TO anon` do adm):

- `getSiteSettings()` → `site_settings` (display_name, tagline_short, business_contact_url/label…)
- `listSocials()` → `socials` ordenado por `position` (platform, handle, url, youtube_video_id)
- `listActivePartners()` → `partners WHERE is_active`
- `getPartnerBySlug(slug)` → `partners`
- `listUpcomingEventsByPartner(partnerId)` → `events WHERE partner_id = ? AND date >= now() AND is_active`
- `listShortLinks()` → `short_links` (para redirecionamento `/[slug]` quando slug for short_link, ver §5)

Cada função retorna DTO plano. Loaders chamam via TanStack Query (`ensureQueryData` + `useSuspenseQuery`). Remover `src/data/events.ts`, `src/data/partners.ts`, `src/data/mediakit.ts` (mocks) — não são mais usados.

---

## 3. Home (`src/routes/index.tsx`) — reestruturação

Layout novo, de cima pra baixo:

1. **Barra de contatos (topo)** — 3 pílulas com ícone + label curta, discretas, acima do "Sete.":
   - `Email` → `mailto:fala@setexxl.com`
   - `Direct` → `https://ig.me/m/setexxl`
   - `WhatsApp` → `https://wa.me/5511939244516`
   
   Componente novo `TopContactBar.tsx` com micro-hover (borda LED sincronizada, ver §6). Ícones do lucide.
2. **Título "Sete."** (mantém ScrambleText).
3. **TwitchCard** — refinado (§4).
4. **MiniSocialCards** (Instagram, TikTok, YouTube) — layout novo (§4).
5. **Modal do YouTube** (mantém).

**Removido da home:** seções "Próximos rolês", "Casas parceiras", "Business" (cards "Contato comercial" + "Mediakit"). O `Business` some porque os contatos foram para o topo; parceiros/eventos ficam acessíveis apenas via URL direta `/[slug]` (o painel controla a lista real).

---

## 4. Cards de rede — nova hierarquia (sem pílula)

Alterar `MiniSocialCard.tsx` e `TwitchCard.tsx` para o layout escolhido:

**MiniSocialCard** (Instagram / TikTok / YouTube):
- Ícone grande centralizado.
- Nome da plataforma em bold, tamanho maior (destaque).
- `@handle` pequeno, mono, cor `text-muted-foreground` logo abaixo — sem pílula, sem borda.
- Vem de `listSocials()` filtrado por `platform`.

**TwitchCard**:
- Ícone Twitch à esquerda.
- Coluna central: "Twitch" em bold + `@setexxl` pequeno mono muted abaixo.
- **Indicador de status à direita** (removida a pílula): um bloco vertical com dot + label ("AO VIVO" / "OFFLINE") — ocupa o canto direito do card.
  - AO VIVO: cor `accent-red-glow`, dot com halo pulsante (`animate-live-halo`), texto em bold com leve shimmer.
  - OFFLINE: cor `muted-foreground`, dot estático, texto discreto.
  - Transição entre estados com `AnimatePresence` (crossfade + slide sutil da direita).
- Loading (enquanto o server fn resolve): shimmer no lugar do indicador.
- Card inteiro mantém pulse sutil (`animate-card-pulse`) e borda LED.

---

## 5. Rota `/[slug]` — página pública de parceiro/redirect

Reescrever `src/routes/$slug.tsx`:

Loader (`ensureQueryData`):
1. Tenta `short_links` primeiro. Se ativo → `throw redirect({ href: destination_url })` server-side + incrementa `clicks` (via server fn separada, fire-and-forget).
2. Caso contrário busca `getPartnerBySlug(slug)`. Se não existir/inativo → `throw notFound()`.
3. Se encontrar partner: também busca `listUpcomingEventsByPartner(partner.id)`.

Renderiza:
- Header do parceiro: nome (SplitText), tagline/bio, cidade.
- **CTA fixo no topo**: botão único "Contato do parceiro" (usa `contact_url` do partner — WhatsApp/Instagram/qualquer URL) com estilo vermelho principal, animate-cta-pulse.
- **Seção "Programação"**: lista de eventos (`EventCard` simplificado):
  - Data em bloco esquerdo (mantém).
  - Título + cidade.
  - Único botão por evento: **"Entrar na lista"** → `list_url`. Remover o botão "Ingresso" (não pedido na v1).
  - Se `list_url` estiver vazio, o card fica sem CTA (só informativo).
- Estado vazio: bloco "Sem programação por enquanto" (mantém estilo atual com `SevenGlyph` respirando).
- `head()` dinâmico: `Sete × {partner.name}`, description do partner.tagline, `og:image` = `partner.logo_url` se houver (absoluto).

---

## 6. Borda "fita LED" — reação a scroll + hover

Ajustar `src/styles.css` (utility `.hover-red-border`) + criar hook `useScrollLedOffset()`:

- Hoje cada card recebe `--led-offset` estático (por índice). Passar a atualizar `--led-offset` do container global via `requestAnimationFrame` conforme `window.scrollY` (velocidade lenta, ~0.02 * scroll), fazendo a "onda" percorrer todos os cards juntos quando o usuário rola.
- No `:hover` de qualquer card, aumentar levemente a opacidade/velocidade da borda (via CSS custom prop `--led-intensity`) — efeito localmente, sem afetar os vizinhos.
- Manter `prefers-reduced-motion` desligando o efeito.
- Aplicar `.hover-red-border` em todos os novos cards (contatos topo, socials, Twitch, event cards da página do parceiro).

---

## 7. Metadata / SEO

- `src/routes/__root.tsx`: manter title/description já ajustados; garantir que não haja `og:image` no root (já removido).
- Home: `og:title` "sete.bio — hub", description curta.
- `/[slug]`: como descrito em §5.

---

## 8. Ajustes técnicos / limpeza

- Remover rota `/mediakit` (`src/routes/mediakit.tsx`) e o card correspondente.
- Remover `src/data/mediakit.ts`, `src/data/events.ts`, `src/data/partners.ts` mocks.
- Adicionar `@supabase/supabase-js` (se ainda não estiver) via `bun add`.
- Gerar `src/integrations/supabase/types.ts` a partir das tabelas do adm (posso escrever à mão os tipos das tabelas usadas — evita depender de CLI).
- Nenhuma escrita neste projeto: só leitura pública. Sem `requireSupabaseAuth`, sem admin client, sem auth middleware.

---

## Arquivos afetados

**Novos**
- `src/integrations/supabase/client.ts` (browser publishable)
- `src/integrations/supabase/server.ts` (server publishable dentro do handler)
- `src/integrations/supabase/types.ts`
- `src/data/site.functions.ts`, `src/data/socials.functions.ts`, `src/data/partners.functions.ts`, `src/data/events.functions.ts`, `src/data/shortlinks.functions.ts`
- `src/components/site/TopContactBar.tsx`
- `src/hooks/useScrollLedOffset.ts`

**Editados**
- `src/routes/index.tsx`, `src/routes/$slug.tsx`, `src/routes/__root.tsx`
- `src/components/site/TwitchCard.tsx`, `MiniSocialCard.tsx`, `EventCard.tsx`
- `src/styles.css` (LED reativo, keyframes do status Twitch lateral)
- `src/lib/getTwitchLive.functions.ts` (mantém)

**Removidos**
- `src/routes/mediakit.tsx`, `src/data/mediakit.ts`, `src/data/events.ts`, `src/data/partners.ts`

---

## O que preciso de você antes de implementar
Escolher A ou B da §1 (ativar Lovable Cloud + Project ID do adm, ou me passar as chaves manualmente). Sem isso eu implemento tudo mas as leituras ficam apontando pra `SUPABASE_URL` inexistente e o site fica vazio.
