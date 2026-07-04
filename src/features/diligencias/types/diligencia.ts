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
  timeline: TimelineEvento[];
};
