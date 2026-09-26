# LexControl — Instruções do Projeto

## 1. Objetivo

LexControl é um sistema web para gerenciamento de diligências jurídicas.

O projeto está sendo desenvolvido inicialmente para uso pessoal e operacional do advogado, com prioridade para:

- uso em computador;
- uso em celular;
- cadastro de diligências;
- acompanhamento de compromissos;
- controle financeiro das diligências;
- organização de informações processuais;
- facilidade de acesso a telefone, WhatsApp, mapas e outras ferramentas do dispositivo.

O sistema não deve ser tratado, nesta fase, como uma plataforma multiusuário para escritórios.

---

## 2. Stack

Tecnologias principais:

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Supabase, quando aplicável
- Git para controle de versão

O projeto deve permanecer compatível com a estrutura e dependências já existentes.

Não substituir tecnologias ou realizar grandes migrações sem necessidade e sem orientação explícita.

---

## 3. Regra principal de desenvolvimento

Preservar o que já funciona.

Antes de modificar um componente:

1. analisar o código atual;
2. identificar dependências;
3. verificar como o componente é utilizado;
4. fazer a menor alteração necessária;
5. preservar funcionalidades existentes;
6. executar o build após alterações relevantes.

Evitar refatorações grandes quando uma alteração pequena resolver o problema.

---

## 4. Qualidade

O projeto deve permanecer compilável.

Após alterações significativas, executar:

npm.cmd run build

Não considerar uma alteração concluída se houver erros de TypeScript ou de build.

Não inventar propriedades, tipos, funções ou arquivos que não existam.

Quando houver dúvida sobre a estrutura atual, primeiro analisar os arquivos existentes.

---

## 5. Interface

A interface deve priorizar:

- simplicidade;
- aparência profissional;
- boa leitura;
- responsividade;
- experiência mobile;
- poucos cliques;
- informações importantes facilmente acessíveis.

O sistema deve funcionar bem em telas pequenas e grandes.

Evitar interfaces excessivamente carregadas.

---

## 6. Diligências

A entidade principal do sistema é a diligência.

Campos atualmente utilizados incluem:

- número interno;
- tipo;
- status;
- prioridade;
- contratante;
- advogado solicitante;
- telefone;
- WhatsApp;
- e-mail;
- processo;
- tribunal;
- vara;
- comarca;
- endereço;
- data;
- hora;
- valor contratado;
- valor recebido;
- observações;
- arquivada;
- timeline.

Não remover campos existentes sem orientação explícita.

---

## 7. Componentização

O projeto utiliza componentes especializados.

Na área de diligências existem componentes para:

- formulário;
- cartões;
- informações;
- ações;
- financeiro;
- cabeçalho;
- seções do formulário.

Sempre que uma alteração puder ser feita de forma clara e isolada em um componente existente, preferir essa abordagem.

Evitar criar abstrações desnecessárias.

---

## 8. Estado atual

O projeto está atualmente no Sprint 2.2.

Último checkpoint Git:

a93b42c — Sprint 2.2 - Modularização dos cartões de diligência

O Sprint 2.2 realizou a modularização dos cartões de diligência.

Componentes relacionados:

src/features/diligencias/components/DiligenciaCard.tsx

src/features/diligencias/components/CardHeader.tsx

src/features/diligencias/components/CardInfo.tsx

src/features/diligencias/components/CardFinanceiro.tsx

src/features/diligencias/components/CardActions.tsx

O build foi validado como funcionando após essas alterações.

---

## 9. Próximo objetivo

O próximo trabalho planejado é o Sprint 2.3 — Integrações dos cartões de diligência.

A sequência planejada é:

1. Google Maps;
2. WhatsApp;
3. telefone;
4. copiar número do processo;
5. copiar endereço;
6. concluir/alterar status da diligência.

As funcionalidades devem ser implementadas de forma incremental.

Não implementar todas de uma vez.

Após cada etapa relevante:

1. verificar o código;
2. executar o build;
3. corrigir eventuais erros;
4. somente então avançar.

---

## 10. Integrações externas

Para funcionalidades como:

- Google Maps;
- WhatsApp;
- telefone;
- calendário;

preferir inicialmente mecanismos simples e nativos, quando forem suficientes.

Não adicionar bibliotecas ou APIs externas sem necessidade.

Antes de instalar uma nova dependência, verificar se a funcionalidade pode ser implementada utilizando recursos já disponíveis no projeto ou links/protocolos padrão do navegador.

---

## 11. Git

O projeto utiliza Git.

Não apagar histórico.

Não fazer reset destrutivo.

Não executar comandos que possam eliminar alterações do usuário sem autorização explícita.

Antes de grandes alterações, criar um checkpoint quando apropriado.

Commits devem possuir mensagens claras e relacionadas ao Sprint ou funcionalidade implementada.

---

## 12. Forma de trabalho

Trabalhar de forma incremental.

Para cada tarefa:

1. analisar;
2. explicar brevemente o que será alterado;
3. implementar;
4. verificar;
5. executar build;
6. corrigir erros;
7. apresentar o resultado.

Evitar alterações não relacionadas à tarefa solicitada.

Não modificar arquivos que não sejam necessários.

---

## 13. Segurança de dados

Não expor credenciais, chaves privadas ou variáveis de ambiente.

Não colocar secrets diretamente no código.

Respeitar arquivos `.env` e configurações existentes.

---

## 14. Regra de ouro

A prioridade é:

FUNCIONAR → SER SIMPLES → SER RESPONSIVO → SER PROFISSIONAL → EVOLUIR GRADUALMENTE

Não sacrificar uma base estável em favor de uma grande quantidade de funcionalidades.