import type { Diligencia } from '../../diligencias/types/diligencia';

type Props = {
  month: Date;
  diligencias: Diligencia[];
};

const weekDays = [
  'Dom',
  'Seg',
  'Ter',
  'Qua',
  'Qui',
  'Sex',
  'Sáb',
];

export function AgendaMonthView({
  month,
  diligencias,
}: Props) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(
    year,
    monthIndex,
    1,
  );

  const lastDay = new Date(
    year,
    monthIndex + 1,
    0,
  );

  const firstWeekDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const cells: (number | null)[] = [];

  for (
    let i = 0;
    i < firstWeekDay;
    i++
  ) {
    cells.push(null);
  }

  for (
    let day = 1;
    day <= totalDays;
    day++
  ) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  function eventsOfDay(day: number) {
    const data = `${year}-${String(
      monthIndex + 1,
    ).padStart(2, '0')}-${String(
      day,
    ).padStart(2, '0')}`;

    return diligencias.filter(
      (d) => d.data === data,
    );
  }

  const today = new Date();

  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, '0')}-${String(
    today.getDate(),
  ).padStart(2, '0')}`;

  return (
    <section className="agenda-calendar">

      <div className="agenda-weekdays">
        {weekDays.map((weekday) => (
          <div
            key={weekday}
            className="agenda-weekday"
          >
            {weekday}
          </div>
        ))}
      </div>

      <div className="agenda-grid">
        {cells.map((day, index) => {
          if (day === null) {
            return (
              <div
                key={index}
                className="agenda-empty"
              />
            );
          }

          const data = `${year}-${String(
            monthIndex + 1,
          ).padStart(2, '0')}-${String(
            day,
          ).padStart(2, '0')}`;

          const eventos =
            eventsOfDay(day);

          return (
            <div
              key={index}
              className={`agenda-day ${
                data === todayString
                  ? 'agenda-day--today'
                  : ''
              }`}
            >
              <header>
                <strong>{day}</strong>
              </header>

              <div className="agenda-events">

                {eventos.length === 0 && (
                  <span className="agenda-empty-day">
                    —
                  </span>
                )}

                {eventos.map(
                  (evento) => (
                    <div
                      key={evento.id}
                      className="agenda-event-chip"
                    >
                      <strong>
                        {evento.hora}
                      </strong>

                      <span>
                        {evento.tipo}
                      </span>
                    </div>
                  ),
                )}

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}