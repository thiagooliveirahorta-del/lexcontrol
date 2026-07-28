export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR');
}

export function formatMonth(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
}

export function isToday(date: Date): boolean {
  const today = new Date();

  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
}

export function toDate(
  data: string,
  hora = '00:00',
): Date {
  return new Date(`${data}T${hora}:00`);
}

export function compareDates(
  dataA: string,
  horaA: string,
  dataB: string,
  horaB: string,
) {
  return (
    toDate(dataA, horaA).getTime() -
    toDate(dataB, horaB).getTime()
  );
}