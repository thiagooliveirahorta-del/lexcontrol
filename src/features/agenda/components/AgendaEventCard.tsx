import {
  CalendarDays,
  Clock3,
  MapPin,
  Scale,
  User,
} from 'lucide-react';

import type { Diligencia } from '../../diligencias/types/diligencia';

type Props = {
  diligencia: Diligencia;
};

export function AgendaEventCard({
  diligencia,
}: Props) {
  return (
    <article className="agenda-event-card">

      <header className="agenda-event-card__header">

        <h3>
          {diligencia.tipo}
        </h3>

        <span className="agenda-status">
          {diligencia.status}
        </span>

      </header>

      <div className="agenda-event-card__body">

        <div className="agenda-item">
          <CalendarDays size={16} />

          <span>
            {diligencia.data}
          </span>
        </div>

        <div className="agenda-item">
          <Clock3 size={16} />

          <span>
            {diligencia.hora}
          </span>
        </div>

        <div className="agenda-item">
          <User size={16} />

          <span>
            {diligencia.contratante}
          </span>
        </div>

        <div className="agenda-item">
          <Scale size={16} />

          <span>
            {diligencia.processo ||
              'Processo não informado'}
          </span>
        </div>

        <div className="agenda-item">
          <MapPin size={16} />

          <span>
            {diligencia.endereco ||
              diligencia.comarca ||
              'Local não informado'}
          </span>
        </div>

      </div>

      {diligencia.observacoes && (
        <footer className="agenda-event-card__footer">

          <strong>
            Observações
          </strong>

          <p>
            {diligencia.observacoes}
          </p>

        </footer>
      )}

    </article>
  );
}