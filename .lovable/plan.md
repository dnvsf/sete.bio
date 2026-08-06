# Modo Low Profile — animação de encerramento

Uma cena de "fechamento" do sete.bio: um interruptor OFF → ON que desliga o site, borra tudo permanentemente e bloqueia qualquer interação.

## Como vai funcionar

1. Ao abrir a página, o site aparece normalmente por ~1,5s.
2. Um painel central surge com um interruptor físico rotulado `LOW PROFILE`, estado `OFF`, e um subtítulo curto ("ficando quieto").
3. O interruptor desliza sozinho para `ON` (também clicável antes disso, para quem quiser acelerar).
4. Na virada: pulso de luz, o "𝟕" respira uma última vez, o fundo escurece e todo o conteúdo entra em desfoque progressivo (0 → 14px) até congelar borrado, com saturação reduzida.
5. Estado final permanente: site borrado, sem scroll, com uma linha nítida por cima — "MODO LOW PROFILE ATIVO · sete.bio" e um 𝟕 apagando devagar. Nada mais é clicável.

## Bloqueio de cliques

- Antes da ativação: todos os cards, ícones do topo, barra de contato e o botão flutuante do LivePix já estão inertes.
- Ao tentar clicar em qualquer um deles: aparece um cadeado animado (fecha + treme) sobre o elemento clicado, ele fica momentaneamente borrado, e some em ~1s.
- Durante e depois da animação: nenhuma interação, nenhum link abre, modais desativados.

## Escopo

- A rota `/biker` será removida.
- O botão flutuante do LivePix e seu modal entram na mesma camada de blur/bloqueio — nada fica de fora.
- As rotas de parceiro `/$slug` recebem o mesmo overlay, para o site inteiro estar coerente.

## Detalhes técnicos

- Novo `LowProfileProvider` (contexto) em `src/components/site/LowProfile.tsx`, montado no `__root.tsx`, com estados `idle → arming → engaged`.
- O provider envolve o `<Outlet />` num wrapper com `filter: blur()` animado via framer-motion, mais `pointer-events: none` global (aplicado no wrapper, não em cada componente — nenhum card precisa ser alterado).
- Um `onClickCapture` no wrapper intercepta o clique, guarda as coordenadas e renderiza `<LockPop />` (ícone de cadeado com animação de fechar/tremer) naquela posição.
- Novo componente `LowProfileSwitch`: trilho + knob, transição de cor OFF (neutro) → ON (preto profundo), com glow e ripple no instante da virada.
- Overlay final em camada acima do blur com `backdrop-filter` leve, texto em mono maiúsculo e o 𝟕 com fade lento (respeitando `prefers-reduced-motion`).
- Remoção de `src/routes/biker.tsx` (e do `LinkCard` se ficar sem uso).
- `head()` da index atualizado para refletir o encerramento.
