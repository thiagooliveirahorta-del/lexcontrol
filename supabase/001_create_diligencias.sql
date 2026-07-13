create table if not exists public.diligencias (
  id uuid primary key,
  numero_interno text not null,
  tipo text not null,
  status text not null,
  prioridade text not null,
  contratante text not null,
  advogado_solicitante text,
  telefone text,
  whatsapp text,
  email text,
  processo text,
  tribunal text,
  vara text,
  comarca text not null,
  endereco text,
  data date not null,
  hora time not null,
  valor_contratado numeric(12,2) not null default 0,
  valor_recebido numeric(12,2) not null default 0,
  observacoes text,
  arquivada boolean not null default false,
  timeline jsonb not null default '[]'::jsonb,
  created_at timestamptz not null,
  updated_at timestamptz not null
);

create index if not exists idx_diligencias_data_hora on public.diligencias (data, hora);
create index if not exists idx_diligencias_arquivada on public.diligencias (arquivada);
create index if not exists idx_diligencias_contratante on public.diligencias (contratante);

alter table public.diligencias enable row level security;

drop policy if exists "Uso temporario sem login" on public.diligencias;
create policy "Uso temporario sem login"
  on public.diligencias
  for all
  using (true)
  with check (true);
