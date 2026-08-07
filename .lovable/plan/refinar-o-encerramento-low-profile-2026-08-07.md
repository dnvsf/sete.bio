# Refinar o encerramento Low Profile

Três ajustes no componente do modo Low Profile (`src/components/site/LowProfile.tsx`).

## 1. Página escurece junto com o borrão
Hoje o overlay escuro chega só a 12% de opacidade. Passa a escurecer até preto quase total, em sincronia com o blur: `idle` = 0, `arming` = ~0.45, `engaged` = ~0.92, com a mesma curva/duração da animação de blur (instantâneo quando o estado vem salvo do navegador). O conteúdo fica borrado e praticamente apagado atrás do preto, e o interruptor continua legível por cima.

## 2. Interruptor redesenhado
- Fundo transparente, apenas uma borda fina e discreta para separar do fundo (borda ganha leve tom vermelho em OFF e verde em ON).
- A bola desliza da esquerda para a direita com mola suave, mudando de vermelho para verde.
- Texto dentro da bola: "OFF" quando desligado, "ON" quando ligado, com troca em fade.
- Rastro: cópias da bola com atraso e opacidade decrescente (blur + fade) seguem o movimento, criando o efeito de trilha durante a transição.
- Bola um pouco mais larga que a atual para caber o texto; o trilho acompanha a nova largura.

## 3. Rótulo dinâmico acima do interruptor
- OFF → "INFLUENCER"
- ON → "LOW PROFILE"
Troca com fade/blur curto, mantendo o mesmo estilo mono em maiúsculas com tracking largo.

## Detalhes técnicos
- Alterações restritas a `LowProfileProvider`, `LowProfileSwitch` e ao overlay escuro no mesmo arquivo; nenhuma outra rota ou componente muda.
- Rastro feito com 2–3 `motion.span` animados pelo mesmo alvo de posição com `transition.delay` crescente, sem biblioteca nova.
- Persistência em `localStorage`, bloqueio de cliques, cadeado e `prefers-reduced-motion` continuam como estão (com movimento reduzido, apenas fade sem rastro).
