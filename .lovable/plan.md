# Melhorias sete.bio — Rodada 3

## 1. Sistema de URLs de parceiros (pronto para admin futuro)

Manter estrutura atual em `src/data/partners.ts` + rota `/$slug`, mas reforçar o contrato para o futuro admin plugar sem refatorar:

- Tipo `Partner` completo já com todos campos que o admin vai preencher: `slug, name, tagline, city, instagram, contactUrl, logoUrl?, accent?, active, order`.
- Helpers: `getPartner(slug)`, `listActivePartners()`, `eventsByPartner(slug)`.
- Rota `/$slug` já valida e cai em `notFound` — manter.
- Documentar no topo de `partners.ts` que o admin vai substituir o array por uma fonte remota mais tarde, sem mudar a assinatura das funções.
- Nenhuma UI muda agora (lista continua vazia com estado "em breve").

## 2. Seção Mediakit

Substituir o card "em breve" por uma seção `Mediakit` real e navegável:

- Nova rota `src/routes/mediakit.tsx` com head próprio.
- Conteúdo inicial: bio curta, números (seguidores IG/TikTok/YT/Twitch — placeholders editáveis em `src/data/mediakit.ts`), público (faixa etária/gênero/regiões — placeholders), formatos disponíveis (stories, reels, vídeo dedicado, presença em evento), cases (vazio + estado "em breve"), CTA "Falar comercial" → DM Instagram.
- Na home, o card `Mediakit` vira link real para `/mediakit` (sem o "7" grande no canto — versão slim: só título, subtítulo curto e seta).

## 3. Fundo e detalhes vermelhos

- Remover os dois `radial-gradient` vermelhos do `body` em `src/styles.css` — deixar fundo preto puro (`--background`) com apenas o grão.
- Remover a sobreposição vermelha da capa (o `bg-gradient-to-b` fica, mas sem tom vermelho residual).
- Manter vermelho apenas em: badge Live, borda animada em hover, pulso dos "7" das divisórias, botões de ação, ponto do nome "Sete.".

## 4. Divisor de seção mais slim

- Remover o círculo pulsante ao redor do "7" nas divisórias (`animate-pulse-red` + `rounded-full` no wrapper).
- Manter só o glifo `𝟕` dos dois lados, com um leve fade in/out (opacity keyframe) — sem halo.

## 5. Card Mediakit slim

- Retirar o `𝟕` grande no canto inferior direito do card.
- Layout minimal: label mono, título, uma linha de descrição, seta `→`.

## 6. Bateria de animações (foco principal)

Adicionar sem poluir. Tudo com `prefers-reduced-motion` respeitado.

### Entrada da página (stagger)
- Wrapper `<StaggerReveal>` (framer-motion) na home e na página de parceiro: capa → avatar → nome → twitch card → mini socials → divisórias → eventos → mediakit → contato entram em cascata com blur+translate+fade (150ms de gap).

### Escrita (typewriter/decode)
- Nome "Sete." com efeito *scramble/decode* (letras aleatórias mono viram o texto final em ~600ms) uma vez no load.
- Handles (@setexxl) com fade-in por caractere.
- Labels das divisórias com efeito "split text" (cada letra sobe do baseline).

### Twitch On/Off
- Trocar o texto por ícone + label; quando `live=true`: badge pulsa (halo vermelho→verde expandindo), ícone com micro-shake sutil a cada 4s, borda do card ganha o sweep vermelho em loop lento.
- Quando `off`: badge estático, sem halo, ícone em opacidade menor.
- Transição entre estados animada (crossfade + scale).

### Cards
- Hover: leve `translateY(-2px)` + brilho interno sutil + borda sweep (já existe).
- Tap/click: `whileTap` scale 0.98.
- Aparição por scroll: `whileInView` com fade+blur+translate (once).

### Cliques (ripple aprimorado)
- `RippleButton` ganha ripple duplo (círculo vermelho expandindo + flash rápido) e um pequeno "kick" haptic-visual (scale 0.96 → 1.02 → 1).
- Adicionar ripple também nos cards principais (Twitch, mini socials, mediakit) via wrapper.

### Loading
- Twitch: skeleton shimmer no badge enquanto `getTwitchLive` resolve (em vez de aparecer "Off" e depois "On").
- Home: SSR já entrega tudo, mas adicionar shimmer nos cards de evento quando lista estiver populada e imagem/dado carregando.

### Cursor & ambient
- Manter `CursorGlow`.
- Adicionar "aurora" muito sutil (2 blobs pretos/cinza escuro se movendo em ~40s no fundo) — SEM vermelho, para o fundo não ficar morto agora que os gradientes vermelhos saíram.
- Trilhas leves nos "7" flutuantes (opacity oscillation já existe — adicionar micro-rotação e drift horizontal).

### Sessões / divisórias
- Ao entrar na viewport, a linha da divisória "desenha" (scaleX 0→1 do centro para as bordas, 500ms).
- Os dois `𝟕` aparecem depois da linha (delay 200ms) com fade+scale.

### Estados vazios
- "Nenhum rolê confirmado ainda" — o `𝟕` outline respira (scale 1↔1.05, 3s loop).

### Página de parceiro
- Herói com título fazendo split-text reveal.
- Botão CTA com pulso vermelho suave a cada 3s (atrai olho sem irritar).

## 7. Arquivos afetados

**Editar:**
- `src/styles.css` — remover gradients vermelhos do body; adicionar keyframes (`shimmer`, `draw-line`, `letter-rise`, `scramble-cursor`, `aurora-drift`, `ripple-flash`); adicionar `prefers-reduced-motion` guard.
- `src/components/site/SectionDivider.tsx` — remover halo pulsante; linha "desenhada" ao entrar em view; letras animadas.
- `src/components/site/TwitchCard.tsx` — badge com halo/pulso quando live; skeleton loading; ícone com micro-shake; crossfade de estados.
- `src/components/site/SevenGlyph.tsx` — adicionar micro drift/rotação; expor variante `respire`.
- `src/components/site/RippleButton.tsx` — ripple duplo + kick scale.
- `src/routes/index.tsx` — envolver seções em `whileInView` reveal; substituir card mediakit; usar novo componente de nome com scramble.
- `src/routes/$slug.tsx` — split-text no título, pulso no CTA.
- `src/routes/__root.tsx` — adicionar `<Outlet />` (já existe) + garantir head padrão.

**Criar:**
- `src/routes/mediakit.tsx` — página completa.
- `src/data/mediakit.ts` — dados (bio, números, formatos).
- `src/components/site/StaggerReveal.tsx` — wrapper de cascata na entrada.
- `src/components/site/RevealOnView.tsx` — wrapper `whileInView` genérico.
- `src/components/site/ScrambleText.tsx` — efeito decode no nome.
- `src/components/site/SplitText.tsx` — letras subindo do baseline (usado em títulos e labels).
- `src/components/site/AuroraBackground.tsx` — 2 blobs cinza sutis derivando.
- `src/components/site/Shimmer.tsx` — skeleton reutilizável.

## Notas técnicas

- Todas animações usam `framer-motion` (já no projeto) — sem novas dependências.
- `prefers-reduced-motion: reduce` desliga scramble, split-text, ripple flash, aurora drift; mantém apenas fades curtos.
- `whileInView` com `viewport={{ once: true, margin: "-10%" }}` para não re-disparar.
- Nenhuma mudança no backend / dados reais — apenas apresentação + rota nova de mediakit + data file.
- Twitch server function permanece igual; só a UI ganha estados de loading/live.
