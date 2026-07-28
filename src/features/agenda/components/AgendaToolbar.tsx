import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

type Props = {
  currentMonth: Date;
  onPrevious: () => void;
  onNext: () => void;
};

export function AgendaToolbar({
  currentMonth,
  onPrevious,
  onNext,
}: Props) {
  const monthLabel = currentMonth.toLocaleDateString(
    'pt-BR',
    {
      month: 'long',
      year: 'numeric',
    },
  );

  return (
    <section className="agenda-toolbar">
      <div className="agenda-toolbar__left">
        <CalendarDays size={22} />

        <div>
          <h2>Agenda</h2>

          <span>
            {monthLabel.charAt(0).toUpperCase() +
              monthLabel.slice(1)}
          </span>
        </div>
      </div>

      <div className="agenda-toolbar__actions">
        <button
          type="button"
          onClick={onPrevious}
          className="agenda-toolbar-button"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={onNext}
          className="agenda-toolbar-button"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}