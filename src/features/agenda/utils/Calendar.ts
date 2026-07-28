export function getDaysInMonth(
  year: number,
  month: number,
): number {
  return new Date(
    year,
    month + 1,
    0,
  ).getDate();
}

export function getFirstWeekDay(
  year: number,
  month: number,
): number {
  return new Date(
    year,
    month,
    1,
  ).getDay();
}

export function buildCalendar(
  year: number,
  month: number,
) {
  const totalDays = getDaysInMonth(
    year,
    month,
  );

  const firstDay =
    getFirstWeekDay(year, month);

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (
    let day = 1;
    day <= totalDays;
    day++
  ) {
    days.push(day);
  }

  return days;
}