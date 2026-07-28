import { useEffect, useState } from 'react';
import { MapPin, Timer } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
import { loadDiligencias } from '../../diligencias/services/diligenciasStorage';
import type { Diligencia } from '../../diligencias/types/diligencia';

const priorityVariant = {
  Alta: 'danger',
  Média: 'warning',
  Baixa: 'default',
  Urgente: 'danger',
} as const;

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function TodayPriorities() {
  const [diligencias, setDiligencias] = useState<Diligencia[]>([]);

  const proxima = diligencias[0];

  useEffect(() => {
    async function load() {
      const data = await loadDiligencias();

      const hoje = new Date().toISOString().slice(0, 10);

      const filtradas = data
        .filter(
          (d) =>
            !d.arquivada &&
            d.data === hoje,
        )
        .sort((a, b) =>
          a.hora.localeCompare(b.hora),
        );

      setDiligencias(filtradas);
    }

    load();
  }, []);

  return (
    <Card>
      <div className="sectionHead">
        <div>
          <h3>Prioridades de hoje</h3>
          <p>
            O que merece sua atenção imediata,
            em ordem cronológica.
          </p>
        </div>

        <Badge>{String(diligencias.length)}</Badge>
      </div>

      {proxima && (
        <div className="diligencia-sync-message">
          <strong>Próxima diligência:</strong>{' '}
          {proxima.hora} • {proxima.tipo}
        </div>
      )}

      <div className="taskList">
        {diligencias.length === 0 ? (
          <p>Nenhuma diligência para hoje.</p>
        ) : (
          diligencias.map((diligencia) => (
            <article
              key={diligencia.id}
              className="taskItem"
            >
              <div className="taskItem__time">
                <Timer size={16} />
                <strong>{diligencia.hora}</strong>
              </div>

              <div className="taskItem__body">
                <div className="taskItem__title">
                  <h4>{diligencia.tipo}</h4>

                  <Badge
                    variant={
                      priorityVariant[
                        diligencia.prioridade
                      ]
                    }
                  >
                    {diligencia.prioridade}
                  </Badge>
                </div>

                <p>
                  {diligencia.processo ||
                    'Processo não informado'}
                </p>

                <span>
                  <MapPin size={15} />
                  {diligencia.endereco ||
                    diligencia.comarca}
                </span>
              </div>

              <div className="taskItem__meta">
                <strong>
                  {money.format(
                    diligencia.valorContratado,
                  )}
                </strong>

                <small>
                  {diligencia.status}
                </small>
              </div>
            </article>
          ))
        )}
      </div>
    </Card>
  );
}