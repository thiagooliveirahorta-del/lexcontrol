# LexControl — Fase 1: Gestão de Diligências Jurídicas

Esta é a primeira versão do sistema web, sem login e senha, pensada para uso simples no computador e no celular.

## O que esta versão já faz

- Dashboard com diligências de hoje, amanhã, atrasadas, valores recebidos e valores a receber.
- Cadastro completo de diligências.
- Tipos: audiência, cópia, acompanhamento, despacho, sustentação oral, protocolo, judicial, extrajudicial e outro.
- Cadastro de contratantes.
- Controle financeiro simples.
- Relatórios básicos.
- Botão para criar evento no Google Agenda.
- Botão para iniciar rota no Google Maps.
- Botão para chamar o contratante no WhatsApp.
- Exportação CSV.

## Importante

Nesta Fase 1, os dados ficam salvos no navegador em que você estiver usando o sistema, por meio do armazenamento local do próprio navegador.

Isso é ótimo para testar e começar, mas ainda não é a versão definitiva em nuvem. A próxima etapa recomendada é conectar ao Supabase, para salvar os dados online e permitir uso sincronizado entre celular e computador.

## Como abrir no computador

1. Extraia o arquivo ZIP.
2. Abra a pasta `lexcontrol-fase1`.
3. Clique duas vezes no arquivo `index.html`.
4. O sistema abrirá no navegador.

## Como usar no celular

A melhor forma é publicar na Vercel ou Netlify. Depois disso, você acessará por um link, como se fosse um site.

## Como publicar gratuitamente na Vercel — explicado para leigos

1. Crie uma conta gratuita em https://vercel.com.
2. Crie uma conta gratuita em https://github.com.
3. No computador, crie um repositório no GitHub chamado `lexcontrol-fase1`.
4. Envie os arquivos `index.html`, `styles.css` e `app.js` para esse repositório.
5. Entre na Vercel.
6. Clique em `Add New Project`.
7. Escolha o repositório `lexcontrol-fase1`.
8. Clique em `Deploy`.
9. A Vercel criará um link público para o sistema.
10. Abra esse link no celular e salve na tela inicial.

## Como criar lembrete no Google Agenda

1. Cadastre a diligência.
2. Na lista de diligências, clique em `Google Agenda`.
3. O Google Agenda será aberto com os dados preenchidos.
4. Confirme o evento.
5. Configure os lembretes desejados, como 1 dia antes, 2 horas antes e 30 minutos antes.

## Próxima etapa recomendada

Fase 1.1: conectar ao Supabase para deixar os dados salvos na nuvem e sincronizados entre celular e computador.

Fase 1.2: criar integração automática real com Google Agenda, sem precisar clicar manualmente no botão.

Fase 1.3: adicionar anexos, recibos e geração de relatório em PDF personalizado.
