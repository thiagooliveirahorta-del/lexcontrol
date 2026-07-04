export type Priority = 'Alta' | 'Média' | 'Baixa';

export type DailyTask = {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  value: number;
  priority: Priority;
  status: 'Confirmada' | 'Pendente' | 'Aguardando documento';
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  variant: 'warning' | 'danger' | 'success';
};

export const todayTasks: DailyTask[] = [
  {
    id: '1',
    time: '09:30',
    title: 'Audiência de conciliação',
    description: 'Processo 0001234-56.2026.8.19.0001 · 3ª Vara Cível',
    location: 'Fórum Central - Rio de Janeiro/RJ',
    value: 450,
    priority: 'Alta',
    status: 'Confirmada',
  },
  {
    id: '2',
    time: '13:40',
    title: 'Despacho com cartório',
    description: 'Solicitar andamento e certidão de objeto e pé',
    location: 'TJ/RJ - Comarca de Niterói/RJ',
    value: 250,
    priority: 'Média',
    status: 'Pendente',
  },
  {
    id: '3',
    time: '16:00',
    title: 'Cópia integral de processo',
    description: 'Verificar documentos físicos e digitalizar principais peças',
    location: 'Cartório Judicial - São Gonçalo/RJ',
    value: 180,
    priority: 'Baixa',
    status: 'Aguardando documento',
  },
];

export const alerts: Alert[] = [
  {
    id: 'a1',
    title: 'Documento pendente',
    description: 'A cópia integral ainda não possui autorização anexada.',
    variant: 'warning',
  },
  {
    id: 'a2',
    title: 'Recebimento em aberto',
    description: 'Há R$ 250,00 previstos para recebimento até o fim do dia.',
    variant: 'danger',
  },
  {
    id: 'a3',
    title: 'Agenda organizada',
    description: 'Não há conflito de horários entre as diligências de hoje.',
    variant: 'success',
  },
];

export const commandSummary = {
  greeting: 'Bom dia, Thiago.',
  message: 'Hoje sua rotina possui 3 diligências, 2 deslocamentos relevantes e R$ 880,00 previstos para recebimento.',
  nextTask: todayTasks[0],
  totalToReceive: todayTasks.reduce((sum, task) => sum + task.value, 0),
  estimatedStreetTime: '3h20min',
  freeWindow: '11:20 às 13:10',
};
