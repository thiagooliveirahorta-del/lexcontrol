import { useMemo, useState } from 'react';
import { CalendarDays, List } from 'lucide-react';

import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

import { AgendaToolbar } from '../components/AgendaToolbar';
import { AgendaMonthView } from '../components/AgendaMonthView';
import { AgendaEventCard } from '../components/AgendaEventCard';
import { useAgenda } from '../hooks/useAgenda';

import type { Diligencia } from '../../diligencias/types/diligencia';

import '../agenda.css';

type ViewMode = 'month' | 'timeline';

export function AgendaPage() {
  const {
    diligencias,
    currentMonth,
    monthName,
    nextMonth,
    previousMonth,
    loading,
  } = useAgenda();

  const [view, setView] =
    useState<ViewMode>('month');

  const eventosHoje = useMemo(() => {
    const hoje = new Date()
      .toISOString()
      .slice(0, 10);

    return diligencias.filter(
      (d: Diligencia) => d.data === hoje,
    );
  }, [diligencias]);

  return (
    <main className="agenda-page">

      <AgendaToolbar
        currentMonth={currentMonth}
        onPrevious={previousMonth}
        onNext={nextMonth}
      />

      <section className="agenda-summary">

        <Card>

          <div className="agenda-summary-header">

            <div>

              <h2>Agenda Jurídica</h2>

              <p>
                Visualize todas as diligências do mês,
                acompanhe seus compromissos e organize
                sua rotina.
              </p>

            </div>

            <Badge>
              {diligencias.length}
            </Badge>

          </div>

          <div className="agenda-summary-info">

            <div>

              <strong>Mês atual</strong>

              <span>{monthName}</span>

            </div>

            <div>

              <strong>Hoje</strong>

              <span>
                {eventosHoje.length} diligência(s)
              </span>

            </div>

          </div>

          <div className="agenda-summary-buttons">

            <button
              type="button"
              className={
                view === 'month'
                  ? 'agenda-view-active'
                  : ''
              }
              onClick={() =>
                setView('month')
              }
            >
              <CalendarDays size={18} />

              Calendário

            </button>

            <button
              type="button"
              className={
                view === 'timeline'
                  ? 'agenda-view-active'
                  : ''
              }
              onClick={() =>
                setView('timeline')
              }
            >
              <List size={18} />

              Timeline

            </button>

          </div>

        </Card>

      </section>

      {loading ? (

        <Card>

          <p>Carregando agenda...</p>

        </Card>

      ) : view === 'month' ? (

        <AgendaMonthView
          month={currentMonth}
          diligencias={diligencias}
        />

      ) : (

        <section className="agenda-timeline">

          <Card>

            <h3>
              Próximas diligências
            </h3>

            {diligencias.length === 0 ? (

              <p>
                Nenhuma diligência cadastrada.
              </p>

            ) : (

              <div className="agenda-events-list">

                {diligencias.map(
                  (diligencia: Diligencia) => (

                    <AgendaEventCard
                      key={diligencia.id}
                      diligencia={diligencia}
                    />

                  ),
                )}

              </div>

            )}

          </Card>

        </section>

      )}

      <section className="agenda-footer">

        <Card>

          <div className="agenda-footer-grid">

            <div>

              <strong>
                {diligencias.length}
              </strong>

              <span>
                Total de diligências
              </span>

            </div>

            <div>

              <strong>
                {eventosHoje.length}
              </strong>

              <span>
                Para hoje
              </span>

            </div>

            <div>

              <strong>
                {
                  diligencias.filter(
                    (
                      d: Diligencia,
                    ) =>
                      d.status ===
                      'Concluída',
                  ).length
                }
              </strong>

              <span>
                Concluídas
              </span>

            </div>

            <div>

              <strong>
                {
                  diligencias.filter(
                    (
                      d: Diligencia,
                    ) =>
                      d.status !==
                      'Concluída',
                  ).length
                }
              </strong>

              <span>
                Pendentes
              </span>

            </div>

          </div>

        </Card>

      </section>

    </main>
  );
}