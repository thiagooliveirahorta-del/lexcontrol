# Decisions

## ADR-003 — Central de Comando como tela inicial

Decidimos que a tela inicial do LexControl será a Central de Comando, e não um dashboard tradicional.

Motivo: o advogado precisa saber primeiro o que exige atenção agora. Métricas são importantes, mas a prioridade operacional deve vir antes da análise estatística.

Consequência: a tela inicial será orientada por rotina, alertas, prioridades e próximos passos.

## ADR-004 — Dados simulados antes do banco

A Sprint 3 utilizará dados simulados em arquivo local.

Motivo: validar experiência, layout e linguagem antes de conectar ao Supabase, evitando retrabalho no modelo de dados.
