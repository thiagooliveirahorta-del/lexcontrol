export type DiligenciaTipo =
  | 'Audiência'
  | 'Despacho'
  | 'Sustentação oral'
  | 'Protocolo'
  | 'Carga'
  | 'Cópias'
  | 'Acompanhamento'
  | 'Diligência externa'
  | 'Extrajudicial'
  | 'Perícia'
  | 'Outro';

export type DiligenciaStatus =
  | 'Recebida'
  | 'Confirmada'
  | 'Agendada'
  | 'Em deslocamento'
  | 'Em execução'
  | 'Concluída'
  | 'Aguardando pagamento'
  | 'Recebida financeiramente'
  | 'Arquivada';

export type DiligenciaPrioridade = 'Baixa' | 'Média' | 'Alta' | 'Urgente';

export type TimelineEvento = {
  id: string;
  dataHora: string;
  titulo: string;
  descricao?: string;
};

export type Diligencia = {
  id: string;
  numeroInterno: string;
  tipo: DiligenciaTipo;
  status: DiligenciaStatus;
  prioridade: DiligenciaPrioridade;
  contratante: string;
  advogadoSolicitante?: string;
  telefone?: string;
  whatsapp?: string;
  email?: string;
  processo?: string;
  tribunal?: string;
  vara?: string;
  comarca: string;
  endereco?: string;
  data: string;
  hora: string;
  valorContratado: number;
  valorRecebido: number;
  observacoes?: string;
  arquivada?: boolean;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvento[];
};

export type DiligenciaFormData = Omit<
  Diligencia,
  'id' | 'numeroInterno' | 'createdAt' | 'updatedAt' | 'timeline'
> & {
  dataPrevistaPagamento?: string;
  dataPagamento?: string;
};

export const tiposDiligencia: DiligenciaTipo[] = [
  'Audiência',
  'Despacho',
  'Sustentação oral',
  'Protocolo',
  'Carga',
  'Cópias',
  'Acompanhamento',
  'Diligência externa',
  'Extrajudicial',
  'Perícia',
  'Outro',
];

export const statusDiligencia: DiligenciaStatus[] = [
  'Recebida',
  'Confirmada',
  'Agendada',
  'Em deslocamento',
  'Em execução',
  'Concluída',
  'Aguardando pagamento',
  'Recebida financeiramente',
  'Arquivada',
];

export const prioridadesDiligencia: DiligenciaPrioridade[] = ['Baixa', 'Média', 'Alta', 'Urgente'];
