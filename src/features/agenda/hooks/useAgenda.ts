import { useEffect, useMemo, useState } from 'react';

import { loadDiligencias } from '../../diligencias/services/diligenciasStorage';
import type { Diligencia } from '../../diligencias/types/diligencia';

export function useAgenda() {
  const [diligencias, setDiligencias] = useState<Diligencia[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const hoje = new Date();

    return new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      1,
    );
  });

  useEffect(() => {
    async function carregar() {
      try {
        const data = await loadDiligencias();

        const ordenadas = [...data].sort((a, b) => {
          const dataA = new Date(
            `${a.data}T${a.hora}:00`,
          ).getTime();

          const dataB = new Date(
            `${b.data}T${b.hora}:00`,
          ).getTime();

          return dataA - dataB;
        });

        setDiligencias(ordenadas);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  function nextMonth() {
    setCurrentMonth((mes) =>
      new Date(
        mes.getFullYear(),
        mes.getMonth() + 1,
        1,
      ),
    );
  }

  function previousMonth() {
    setCurrentMonth((mes) =>
      new Date(
        mes.getFullYear(),
        mes.getMonth() - 1,
        1,
      ),
    );
  }

  const monthName = useMemo(() => {
    return currentMonth.toLocaleDateString(
      'pt-BR',
      {
        month: 'long',
        year: 'numeric',
      },
    );
  }, [currentMonth]);

  const monthEvents = useMemo(() => {
    const ano = currentMonth.getFullYear();
    const mes = currentMonth.getMonth();

    return diligencias.filter((diligencia) => {
      const data = new Date(
        `${diligencia.data}T00:00:00`,
      );

      return (
        data.getFullYear() === ano &&
        data.getMonth() === mes
      );
    });
  }, [currentMonth, diligencias]);

  return {
    loading,

    diligencias,

    monthEvents,

    currentMonth,

    monthName,

    nextMonth,

    previousMonth,
  };
}