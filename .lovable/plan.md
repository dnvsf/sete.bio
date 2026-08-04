## Objetivo

Deixar o site legível e limpo: textos com contraste correto no tema claro, cards visíveis sobre o fundo, e ícones de plataforma sem círculos.

## 1. Cores das fontes (conflito com fundo)

O tema é claro (`--background` off-white), mas `TwitchCard`, `KickCard` e `CutsHubCard` ainda usam classes herdadas do tema escuro (`text-white`, `text-white/90`, `border-white/10`, `bg-white/5`). Isso deixa títulos quase invisíveis.

- Substituir todos os `text-white*` por tokens semânticos (`text-foreground`, `text-foreground/80`, `text-muted-foreground`).
- Substituir `border-white/10|20` e `bg-white/5` por equivalentes escuros sutis (`border-border`, `bg-foreground/5`).
- Mesma varredura em `MiniSocialCard`, `CutsHubModal` e `TopContactBar` para manter consistência.

## 2. Cards mais destacados

- Aumentar a opacidade do token `--card` (de ~0.7 para sólido/quase sólido) em `src/styles.css`.
- Reforçar borda (`--border` um pouco mais escura) e sombra dos cards para separá-los do fundo.
- Reduzir a intensidade do fundo animado (partículas / sevens / cursor glow) atrás dos cards, mantendo os efeitos.

## 3. Card Cortes de Lives

Em `CutsHubCard.tsx`:
- Remover a linha "@setelives — IG · TikTok · YouTube".
- Trocar o título "Cortes / Lives" por "Cortes de Lives".
- Reajustar espaçamento vertical para o card ficar equilibrado sem a segunda linha.

## 4. Ícones sem círculo

- Remover os `div` circulares de fundo dos ícones em `SocialCard`, `TwitchCard`, `KickCard` e `CutsHubCard` — o ícone fica solto, com a cor do texto.
- No `SocialIconsBar` (3 ícones do topo): tirar o container circular (fundo, borda, sombra, `rounded-full`), mantendo a animação de expansão que revela nome + @handle. Como a pílula deixa de existir:
  - a animação passa a expandir um bloco transparente (sem borda/fundo), com o texto entrando em fade/slide como hoje;
  - largura animada continua, mas sem `overflow-hidden` circular que causaria corte;
  - shimmer e glow radiais viram um brilho suave atrás do ícone em vez de dentro da pílula, para não "bugar".

## Verificação

Após as mudanças, checar no preview em mobile (432px) e desktop que nenhum texto some, que os cards têm contraste claro sobre o fundo e que a sequência de animação dos ícones do topo continua rodando sem corte.
