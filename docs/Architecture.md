# LexControl Architecture

## Versão

v0.2 — Foundation

## Arquitetura

O LexControl adota uma arquitetura baseada em funcionalidades, separando a aplicação em camadas simples e escaláveis.

```text
src/
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── services/
├── styles/
├── types/
└── utils/
```

## Decisão técnica

A aplicação deixa de concentrar a interface em um único App.tsx e passa a usar layout, rotas e componentes reutilizáveis.
