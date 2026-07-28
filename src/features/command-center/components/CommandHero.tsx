import { useEffect, useState } from 'react';
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Route,
} from 'lucide-react';

import { Badge } from '../../../components/ui/Badge';
import { Button } from "../../../components/ui";

import { loadDiligencias } from '../../diligencias/services/diligenciasStorage';
import type { Diligencia } from '../../diligencias/types/diligencia';

export function CommandHero() {
  const [proxima, setProxima] =
    useState<Diligencia | null>(null);

  const [totalHoje, setTotalHoje] =
    useState(0);

  useEffect(() => {
    async function load() {
      const data = await loadDiligencias();

      const ativos = data
        .filter((d) => !d.arquivada)
        .sort(
          (a, b) =>
            new Date(
              `${a.data}T${a.hora}:00`,
            ).getTime() -
            new Date(
              `${b.data}T${b.hora}:00`,
            ).getTime(),
        );

      const hoje =
        new Date().toISOString().slice(0, 10);

      const hojeList = ativos.filter(
        (d) => d.data === hoje,
      );

      setTotalHoje(hojeList.length);

      const agora = Date.now();

      const futura =
        ativos.find(
          (d) =>
            new Date(
              `${d.data}T${d.hora}:00`,
            ).getTime() >= agora,
        ) ?? null;

      setProxima(futura);
    }

    load();
  }, []);

  return (
    <section className="commandHero">
      <div className="commandHero__content">
        <Badge variant="success">
          Central de Comando
        </Badge>

        <h2>Bom dia, Thiago.</h2>

        <p>
          Hoje você possui{' '}
          {totalHoje} diligência(s)
          cadastrada(s) no LexControl.
        </p>

        <div className="commandHero__facts">
          <span>
            <CalendarCheck size={17} />
            {proxima
              ? ` Próxima às ${proxima.hora}`
              : ' Nenhuma diligência agendada'}
          </span>

          <span>
            <Route size={17} />
            {proxima?.comarca ??
              'Sem deslocamentos'}
          </span>

          <span>
            <Clock size={17} />
            Agenda sincronizada
          </span>
        </div>
      </div>

      <div className="commandHero__action">
        <small>Próxima prioridade</small>

        <strong>
          {proxima?.tipo ??
            'Sem diligências'}
        </strong>

        <span>
          {proxima?.contratante ??
            'Nenhum compromisso encontrado'}
        </span>

        <Button>
          Iniciar planejamento
          <ArrowRight size={18} />
        </Button>
      </div>
    </section>
  );
}