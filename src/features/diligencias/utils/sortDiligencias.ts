import type { Diligencia } from '../types/diligencia';

export function sortDiligencias(
  diligencias: Diligencia[],
): Diligencia[] {
  return [...diligencias].sort((a, b) => {
    const dataA = new Date(
      `${a.data}T${a.hora}:00`,
    ).getTime();

    const dataB = new Date(
      `${b.data}T${b.hora}:00`,
    ).getTime();

    return dataA - dataB;
  });
}