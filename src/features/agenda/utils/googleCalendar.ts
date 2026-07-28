export function createGoogleCalendarUrl({
  title,
  date,
  time,
  location,
  description,
}: {
  title: string;
  date: string;
  time: string;
  location?: string;
  description?: string;
}) {
  const start = new Date(`${date}T${time}:00`);

  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  const formatDate = (value: Date) =>
    value.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatDate(start)}/${formatDate(end)}`,
    location: location ?? '',
    details: description ?? '',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}