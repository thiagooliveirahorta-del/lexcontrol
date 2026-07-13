import { Archive, CalendarDays, CalendarPlus, Edit3, MapPin, Scale, Wallet } from 'lucide-react';
import type { Diligencia } from '../types/diligencia';
import '../diligencias.css';

type Props = {
  diligencia: Diligencia;
  onEdit: (diligencia: Diligencia) => void;
  onArchive: (id: string) => void;
};

const money = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const statusClass: Record<string, string> = {
  Recebida: 'badge-neutral',
  Confirmada: 'badge-info',
  Agendada: 'badge-primary',
  'Em deslocamento': 'badge-warning',
  'Em execução': 'badge-warning',
  Concluída: 'badge-success',
  'Aguardando pagamento': 'badge-danger',
  'Recebida financeiramente': 'badge-success',
  Arquivada: 'badge-neutral',
};

const prioridadeClass: Record<string, string> = {
  Baixa: 'priority-low',
  Média: 'priority-medium',
  Alta: 'priority-high',
  Urgente: 'priority-urgent',
};

function googleCalendarUrl(diligencia: Diligencia) {
  const horaNormalizada =
    diligencia.hora.length === 5
      ? `${diligencia.hora}:00`
      : diligencia.hora;

  const start = new Date(
    `${diligencia.data}T${horaNormalizada}`,
  );

  if (Number.isNaN(start.getTime())) {
    console.error('Data ou hora inválida na diligência:', {
      data: diligencia.data,
      hora: diligencia.hora,
    });

    return '#';
  }

  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const format = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0] + 'Z';

  const title = encodeURIComponent(
    `${diligencia.tipo} - ${diligencia.contratante}`,
  );

  const details = encodeURIComponent(
    `Processo: ${diligencia.processo || ''}
Tribunal: ${diligencia.tribunal || ''}
Vara: ${diligencia.vara || ''}
Comarca: ${diligencia.comarca || ''}
Observações: ${diligencia.observacoes || ''}`,
  );

  const location = encodeURIComponent(
    diligencia.endereco || diligencia.comarca || '',
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${format(start)}/${format(end)}&details=${details}&location=${location}`;
}
function mapsUrl(local?: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local || '')}`;
}

export function DiligenciaCard({ diligencia, onEdit, onArchive }: Props) {
  const pendente = Math.max(
    0,
    diligencia.valorContratado - diligencia.valorRecebido,
  );

  return (
    <article className="diligencia-card">
      <div className="diligencia-card__top">
        <div>
          <span className="diligencia-card__type">
            {diligencia.tipo}
          </span>

          <h3>{diligencia.numeroInterno}</h3>
        </div>

        <div className="diligencia-card__badges">
          <span
            className={`diligencia-badge ${
              statusClass[diligencia.status] || 'badge-neutral'
            }`}
          >
            {diligencia.status}
          </span>

          <span
            className={`diligencia-priority ${
              prioridadeClass[diligencia.prioridade] || 'priority-medium'
            }`}
          >
            {diligencia.prioridade}
          </span>
        </div>
      </div>

      <div className="diligencia-card__process">
        <Scale size={16} />
        <span>
          {diligencia.processo || 'Processo não informado'}
        </span>
      </div>

      <div className="diligencia-card__meta">
        <p>
          <strong>Contratante</strong>
          {diligencia.contratante}
        </p>

        <p>
          <strong>Comarca</strong>
          {diligencia.comarca}
        </p>
      </div>

      <div className="diligencia-card__footer">
        <span>
          <CalendarDays size={16} />
          {diligencia.data} às {diligencia.hora}
        </span>

        <span>
          <Wallet size={16} />
          {money(diligencia.valorContratado)}
        </span>
      </div>

      {pendente > 0 && (
        <div className="diligencia-pending">
          Pendente: {money(pendente)}
        </div>
      )}

      <div className="diligencia-card__actions">
        <a
          href={googleCalendarUrl(diligencia)}
          target="_blank"
          rel="noreferrer"
        >
          <CalendarPlus size={16} />
          Google Agenda
        </a>

        <a
          href={mapsUrl(
            diligencia.endereco || diligencia.comarca,
          )}
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={16} />
          Rota
        </a>

        <button
          type="button"
          onClick={() => onEdit(diligencia)}
        >
          <Edit3 size={16} />
          Editar
        </button>

        {!diligencia.arquivada && (
          <button
            type="button"
            onClick={() => onArchive(diligencia.id)}
          >
            <Archive size={16} />
            Arquivar
          </button>
        )}
      </div>
    </article>
  );
}