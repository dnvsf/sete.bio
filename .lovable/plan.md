# Vistoria completa + padronização responsiva

Hoje as três páginas (`/`, `/biker`, `/:slug`) foram feitas em momentos diferentes: a home usa a barra de ícones no topo, cards de plataforma próprios e fundo animado completo; a `/biker` usa outro tipo de card (lista simples com seta "Abrir"), outro cabeçalho e não tem o fundo de partículas/cursor da home; a página de parceiro tem ainda outro layout. Também não existe um sistema único de escala para telas pequenas/grandes — cada componente define seus próprios tamanhos fixos.

## O que será feito

### 1. Shell único para todas as páginas
Um componente de página compartilhado que aplica em toda rota: fundo (sevens + aurora + partículas + brilho do cursor no desktop), largura máxima, respiros verticais, animação de entrada e o link de retorno. Home, biker e páginas de parceiro passam a usar o mesmo shell — mesmo fundo, mesma entrada, mesmo ritmo.

### 2. Cards padronizados
`/biker` e as páginas de parceiro passam a usar o mesmo card das redes da home (nome da plataforma em destaque, usuário neutro ao lado, ícone sem círculo, borda LED sincronizada). O `LinkCard` antigo é aposentado para não existirem dois estilos de card no site.

### 3. Cabeçalho padrão
Mesmo bloco de título em todas as páginas: nome grande com a mesma animação, subtítulo curto opcional e, quando fizer sentido, a barra de contatos. Tipografia, pesos e espaçamentos vindos de um só lugar.

### 4. Sistema de adaptação por tamanho de tela
- Escala fluida de tipografia e espaçamento via `clamp()` em tokens no `src/styles.css`, para o site crescer suavemente de celular pequeno (320px) até desktop largo, sem saltos.
- Padrão de linha responsivo em todo header/card com conteúdo misto: grid de duas colunas no celular, flex a partir de `sm`, com `min-w-0`/`truncate` no texto e `shrink-0` nos ícones — elimina texto cortado ou estourando.
- Ícones e badges com tamanho por token, não valores soltos.
- Alvos de toque com mínimo de 44px no celular.
- Fundo animado e brilho do cursor reduzidos/desligados em telas pequenas para não pesar; respeito a `prefers-reduced-motion` mantido.

### 5. Vistoria e correções
Verificação em 320, 390, 768, 1024 e 1440px nas três rotas, corrigindo overflow horizontal, textos cortados, badges desalinhadas (status AO VIVO/OFFLINE), botão flutuante do LivePix sobrepondo conteúdo e espaçamento inconsistente entre seções.

## Detalhes técnicos

- Novo `src/components/site/PageShell.tsx` com os fundos e o container; `index.tsx`, `biker.tsx` e `$slug.tsx` reduzidos ao conteúdo.
- `CursorGlow`, `FloatingParticles` e `PageWrapper` saem do `index.tsx` para módulos próprios reutilizáveis.
- Novo `src/components/site/PageHeader.tsx`.
- Tokens `--step-*` (tipografia) e `--space-*` (espaçamento) em `@theme` no `src/styles.css` usando `clamp()`.
- `LinkCard.tsx` removido após migrar `/biker` para `SocialCard`.
- Sem mudança de dados, rotas ou lógica de servidor.
