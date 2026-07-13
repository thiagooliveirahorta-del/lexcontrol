import { useEffect, useState } from 'react';
import {
  BriefcaseBusiness,
  CalendarRange,
  Coffee,
  WalletCards,
} from 'lucide-react';

import { Card } from '../../../components/ui/Card';

import { loadDiligencias } from '../../diligencias/services/diligenciasStorage';
import type { Diligencia } from '../../diligencias/types/diligencia';

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function RoutineSnapshot() {
  const [diligencias, setDiligencias] = useState<Diligencia[]>([]);

  useEffect(() => {
    async function load() {
      const data = await loadDiligencias();

      setDiligencias(
        data.filter((d) => !d.arquivada),
      );
    }

    load();
  }, []);

  const hoje = new Date().toISOString().slice(0, 10);

  const diligenciasHoje = diligencias.filter(
    (d) => d.data === hoje,
  );

  const totalReceber = diligenciasHoje.reduce(
    (acc, item) =>
      acc +
      Math.max(
        0,
        item.valorContratado -
          item.valorRecebido,
      ),
    0,
  );

  const judiciais = diligenciasHoje.filter(
    (d) =>
      d.tipo === 'Audiência' ||
      d.tipo === 'Despacho' ||
      d.tipo === 'Perícia',
  ).length;

  const extrajudiciais =
    diligenciasHoje.length - judiciais;

  const conflitos = diligenciasHoje.filter(
    (d) => d.prioridade === 'Urgente',
  ).length;

  return (
    <Card>
      <div className="sectionHead">
        <div>
          <h3>Minha rotina</h3>
          <p>
            Resumo executivo do dia para
            reduzir carga mental.
          </p>
        </div>
      </div>

      <div className="snapshotGrid">
        <div className="snapshotItem">
          <BriefcaseBusiness />

          <strong>
            {diligenciasHoje.length} diligências
          </strong>

          <span>
            {judiciais} judiciais e{' '}
            {extrajudiciais} extrajudiciais
          </span>
        </div>

        <div className="snapshotItem">
          <WalletCards />

          <strong>
            {money.format(totalReceber)}
          </strong>

          <span>
            previsão de recebimento
          </span>
        </div>

        <div className="snapshotItem">
          <CalendarRange />

          <strong>
            {diligenciasHoje.length > 0
              ? `${diligenciasHoje[0].hora} em diante`
              : 'Sem compromissos'}
          </strong>

          <span>
            próxima atividade
          </span>
        </div>

        <div className="snapshotItem">
          <Coffee />

          <strong>
            {conflitos > 0
              ? `${conflitos} alerta(s)`
              : 'Sem conflitos'}
          </strong>

          <span>
            situação da agenda
          </span>
        </div>
      </div>
    </Card>
  );
}