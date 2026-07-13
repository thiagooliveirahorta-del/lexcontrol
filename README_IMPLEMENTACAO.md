# LexControl — Sprint 5: Cloud Sync

Objetivo: salvar as diligências no Supabase para permitir uso no computador e no celular.

## 1. Instalar dependência

```powershell
npm.cmd install @supabase/supabase-js
```

## 2. Copiar arquivos

Copie para o projeto:

- `src/lib/supabaseClient.ts`
- `src/features/diligencias/pages/DiligenciasPage.tsx`
- `src/features/diligencias/services/diligenciasStorage.ts`
- `src/features/diligencias/diligencias.css`
- `supabase/001_create_diligencias.sql`
- `.env.example`

## 3. Criar tabela no Supabase

No Supabase:

1. Abra o projeto.
2. Vá em SQL Editor.
3. Cole o conteúdo de `supabase/001_create_diligencias.sql`.
4. Clique em Run.

## 4. Criar arquivo `.env.local`

Na raiz do projeto, crie `.env.local` com:

```env
VITE_SUPABASE_URL=https://qdporriruigpcldmxnyq.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_EqSkttuaiPNFxGuiaPOUAg_27gBMBKB
```

Esses dados ficam em Supabase > Project Settings > API.

## 5. Rodar

```powershell
npm.cmd run dev
```

## 6. Migrar dados locais

Na tela Diligências, clique em **Sincronizar dados locais** uma única vez.

## Observação de segurança

Esta Sprint usa uma política temporária sem login para acelerar o uso prático. Quando implementarmos autenticação, a política será substituída por regras por usuário.
