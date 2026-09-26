# Reformulação estática do sete.bio

## Resultado
- Reabrir o perfil ao público, removendo completamente o modo Low Profile, bloqueios, blur, cadeados e restrições de clique/cópia.
- Transformar o site em uma experiência escura, íntima e discreta, com fundo quase preto e vinho como único destaque luminoso.
- Manter conteúdo, links, status da live, parceiros e eventos em arquivos de configuração versionados no GitHub, sem Lovable Cloud ou Supabase.

## Página principal
1. Criar uma configuração local clara para editar redes, contatos e o boolean `liveOnline`, inicialmente `true`.
2. Substituir os cards de Twitch/Kick e demais blocos atuais por um banner 16:9 em largura total:
   - arte abstrata escura em preto e vinho;
   - link para `https://www.tiktok.com/@setexxl/live`;
   - indicador ONLINE com pulso vinho suave ou OFFLINE cinza, conforme o boolean no código;
   - entrada, foco, toque e passagem do cursor com movimentos sutis e acessíveis.
3. Exibir somente três cards sociais, nesta ordem:
   - Instagram — `@setexxl`;
   - YouTube — `@canaldosete`;
   - TikTok — `@setexxl`.
4. Inserir o divisor “PARCERIAS” com letras espaçadas e respiro vertical.
5. Abaixo dele, exibir apenas links textuais para `contact@sete.cc` e DM do Instagram `@setexxl`, seguidos de uma área vazia e discreta reservada para futuros logos.
6. Remover da página inicial Twitch, Kick, Discord, Cortes de Lives, LivePix, modais e outros contatos/redes não solicitados.

## Visual e movimento
- Atualizar os tokens globais para fundo `#0A0A0A`, superfícies escuras legíveis, texto claro e destaque vinho inspirado em `#B0203F`.
- Converter brilhos, bordas animadas, seleção, ripples e gradientes existentes para tons de vinho com baixa intensidade.
- Preservar a tipografia de sistema no estilo Apple e eliminar conflitos de contraste.
- Manter animações coordenadas de entrada, borda e interação, com versão reduzida para quem prefere menos movimento e sem partículas aleatórias que causem inconsistência visual.

## Site totalmente em código
- Substituir as consultas atuais de redes, parceiros, eventos e redirecionamentos por dados locais tipados.
- Manter as URLs como `/side` funcionando a partir desse catálogo local; novos parceiros, eventos ou atalhos serão adicionados por edição de código e enviados ao GitHub.
- Retirar da aplicação as integrações e funções Supabase que deixarem de ser usadas, além das dependências associadas quando não houver mais nenhuma referência.
- Registrar no guia técnico do projeto que o conteúdo público é estático e controlado pelo GitHub.

## Qualidade e validação
- Completar os metadados próprios da página inicial e das páginas de parceiros, incluindo título, descrição, Open Graph e cartão do Twitter.
- Validar a página em celular e desktop, testando o banner, os três links sociais, os dois contatos, o status ONLINE/OFFLINE e uma URL de parceiro.
- Confirmar ausência de erros de compilação, execução, hidratação e navegação antes de concluir.
