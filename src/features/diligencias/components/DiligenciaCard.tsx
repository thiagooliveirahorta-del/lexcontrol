import { CalendarDays, MapPin, Scale, Wallet } from 'lucide-react';
import type { Diligencia } from '../types/diligencia';
import '../diligencias.css';

type Props = {
  diligencia: Diligencia;
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

export function DiligenciaCard({ diligencia }: Props) {
  return (
    <article className="diligencia-card">
      <div className="diligencia-card__top">
        <div>
          <span className="diligencia-card__type">{diligencia.tipo}</span>
          <h3>{diligencia.numeroInterno}</h3>
        </div>

        <div className="diligencia-card__badges">
          <span className={`diligencia-badge ${statusClass[diligencia.status]}`}>
            {diligencia.status}
          </span>
          <span className={`diligencia-priority ${prioridadeClass[diligencia.prioridade]}`}>
            {diligencia.prioridade}
          </span>
        </div>
      </div>

      <div className="diligencia-card__process">
        <Scale size={16} />
        <span>{diligencia.processo || 'Processo não informado'}</span>
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

      {diligencia.endereco && (
        <a
          className="diligencia-card__map"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            diligencia.endereco,
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={16} />
          Iniciar rota
        </a>
      )}
    </article>
  );
}
