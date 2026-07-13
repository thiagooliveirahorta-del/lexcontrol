import { isSupabaseConfigured, supabase } from '../../../lib/supabaseClient';
import type { Diligencia, DiligenciaFormData, TimelineEvento } from '../types/diligencia';

const STORAGE_KEY = 'lexcontrol_diligencias_v1';
const TABLE = 'diligencias';

type DiligenciaRow = {
  id: string;
  numero_interno: string;
  tipo: Diligencia['tipo'];
  status: Diligencia['status'];
  prioridade: Diligencia['prioridade'];
  contratante: string;
  advogado_solicitante: string | null;
  telefone: string | null;
  whatsapp: string | null;
  email: string | null;
  processo: string | null;
  tribunal: string | null;
  vara: string | null;
  comarca: string;
  endereco: string | null;
  data: string;
  hora: string;
  valor_contratado: number;
  valor_recebido: number;
  observacoes: string | null;
  arquivada: boolean;
  timeline: TimelineEvento[];
  created_at: string;
  updated_at: string;
};

function fromRow(row: DiligenciaRow): Diligencia {
  return {
    id: row.id,
    numeroInterno: row.numero_interno,
    tipo: row.tipo,
    status: row.status,
    prioridade: row.prioridade,
    contratante: row.contratante,
    advogadoSolicitante: row.advogado_solicitante ?? '',
    telefone: row.telefone ?? '',
    whatsapp: row.whatsapp ?? '',
    email: row.email ?? '',
    processo: row.processo ?? '',
    tribunal: row.tribunal ?? '',
    vara: row.vara ?? '',
    comarca: row.comarca,
    endereco: row.endereco ?? '',
    data: row.data,
    hora: row.hora,
    valorContratado: Number(row.valor_contratado ?? 0),
    valorRecebido: Number(row.valor_recebido ?? 0),
    observacoes: row.observacoes ?? '',
    arquivada: row.arquivada,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    timeline: row.timeline ?? [],
  };
}

function toRow(diligencia: Diligencia): DiligenciaRow {
  return {
    id: diligencia.id,
    numero_interno: diligencia.numeroInterno,
    tipo: diligencia.tipo,
    status: diligencia.status,
    prioridade: diligencia.prioridade,
    contratante: diligencia.contratante,
    advogado_solicitante: diligencia.advogadoSolicitante || null,
    telefone: diligencia.telefone || null,
    whatsapp: diligencia.whatsapp || null,
    email: diligencia.email || null,
    processo: diligencia.processo || null,
    tribunal: diligencia.tribunal || null,
    vara: diligencia.vara || null,
    comarca: diligencia.comarca,
    endereco: diligencia.endereco || null,
    data: diligencia.data,
    hora: diligencia.hora,
    valor_contratado: Number(diligencia.valorContratado || 0),
    valor_recebido: Number(diligencia.valorRecebido || 0),
    observacoes: diligencia.observacoes || null,
    arquivada: Boolean(diligencia.arquivada),
    timeline: diligencia.timeline ?? [],
    created_at: diligencia.createdAt,
    updated_at: diligencia.updatedAt,
  };
}

function loadLocalDiligencias(): Diligencia[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Diligencia[];
  } catch {
    return [];
  }
}

function saveLocalDiligencias(diligencias: Diligencia[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(diligencias));
}

export async function loadDiligencias(): Promise<Diligencia[]> {
  if (!isSupabaseConfigured || !supabase) return loadLocalDiligencias();

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('data', { ascending: true })
    .order('hora', { ascending: true });

  if (error) {
    console.error('Erro ao carregar diligências no Supabase:', error.message);
    return loadLocalDiligencias();
  }

  const diligencias = (data as DiligenciaRow[]).map(fromRow);
  saveLocalDiligencias(diligencias);
  return diligencias;
}

async function upsertDiligencia(diligencia: Diligencia): Promise<Diligencia> {
  if (!isSupabaseConfigured || !supabase) return diligencia;

  const { data, error } = await supabase
    .from(TABLE)
    .upsert(toRow(diligencia), { onConflict: 'id' })
    .select('*')
    .single();

  if (error) {
    console.error('Erro ao salvar diligência no Supabase:', error.message);
    throw error;
  }

  return fromRow(data as DiligenciaRow);
}

export function createDiligenciaObject(data: DiligenciaFormData, current: Diligencia[]): Diligencia {
  const now = new Date().toISOString();
  const nextNumber = String(current.length + 1).padStart(4, '0');

  return {
    ...data,
    id: crypto.randomUUID(),
    numeroInterno: `LEX-${new Date().getFullYear()}-${nextNumber}`,
    createdAt: now,
    updatedAt: now,
    timeline: [
      {
        id: crypto.randomUUID(),
        dataHora: now,
        titulo: 'Diligência recebida',
        descricao: 'Diligência cadastrada no LexControl.',
      },
    ],
  };
}

export async function createDiligencia(data: DiligenciaFormData, current: Diligencia[]): Promise<Diligencia> {
  const diligencia = createDiligenciaObject(data, current);
  const saved = await upsertDiligencia(diligencia);
  saveLocalDiligencias([...current, saved]);
  return saved;
}

export function updateDiligenciaObject(id: string, data: DiligenciaFormData, current: Diligencia[]): Diligencia {
  const now = new Date().toISOString();
  const existing = current.find((diligencia) => diligencia.id === id);

  if (!existing) throw new Error('Diligência não encontrada.');

  return {
    ...existing,
    ...data,
    updatedAt: now,
    timeline: [
      ...existing.timeline,
      {
        id: crypto.randomUUID(),
        dataHora: now,
        titulo: 'Diligência atualizada',
        descricao: `Status atual: ${data.status}.`,
      },
    ],
  };
}

export async function updateDiligencia(
  id: string,
  data: DiligenciaFormData,
  current: Diligencia[],
): Promise<Diligencia> {
  const diligencia = updateDiligenciaObject(id, data, current);
  const saved = await upsertDiligencia(diligencia);
  const next = current.map((item) => (item.id === id ? saved : item));
  saveLocalDiligencias(next);
  return saved;
}

export function archiveDiligenciaObject(id: string, current: Diligencia[]): Diligencia {
  const now = new Date().toISOString();
  const existing = current.find((diligencia) => diligencia.id === id);

  if (!existing) throw new Error('Diligência não encontrada.');

  return {
    ...existing,
    status: 'Arquivada',
    arquivada: true,
    updatedAt: now,
    timeline: [
      ...existing.timeline,
      {
        id: crypto.randomUUID(),
        dataHora: now,
        titulo: 'Diligência arquivada',
        descricao: 'A diligência foi arquivada sem exclusão do histórico.',
      },
    ],
  };
}

export async function archiveDiligencia(id: string, current: Diligencia[]): Promise<Diligencia> {
  const diligencia = archiveDiligenciaObject(id, current);
  const saved = await upsertDiligencia(diligencia);
  const next = current.map((item) => (item.id === id ? saved : item));
  saveLocalDiligencias(next);
  return saved;
}

export async function syncLocalDiligenciasToCloud(): Promise<number> {
  if (!isSupabaseConfigured || !supabase) return 0;

  const local = loadLocalDiligencias();
  if (!local.length) return 0;

  const { error } = await supabase.from(TABLE).upsert(local.map(toRow), { onConflict: 'id' });
  if (error) throw error;

  return local.length;
}

export function hasScheduleConflict(candidate: Pick<Diligencia, 'data' | 'hora' | 'id'>, current: Diligencia[]) {
  const candidateTime = new Date(`${candidate.data}T${candidate.hora}:00`).getTime();
  const windowMs = 90 * 60 * 1000;

  return current.find((diligencia) => {
    if (diligencia.id === candidate.id || diligencia.arquivada) return false;
    if (diligencia.data !== candidate.data) return false;

    const existingTime = new Date(`${diligencia.data}T${diligencia.hora}:00`).getTime();
    return Math.abs(existingTime - candidateTime) < windowMs;
  });
}
