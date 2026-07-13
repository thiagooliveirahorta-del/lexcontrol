import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CalendarDays,
  CircleDollarSign,
  Navigation,
} from 'lucide-react';

import { Card } from '../../../components/ui/Card';

import { loadDiligencias } from '../../diligencias/services/diligenciasStorage';
import type { Diligencia } from '../../diligencias/types/diligencia';

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function CommandKpis() {
  const [diligencias, setDiligencias] = useState<Diligencia[]>([]);

  useEffect(() => {
    async function load() {
      const data = await loadDiligencias();
      setDiligencias(data.filter((d) => !d.arquivada));
    }

    load();
  }, []);

  const hoje = new Date().toISOString().slice(0, 10);

  const diligenciasHoje = diligencias.filter(
    (d) => d.data === hoje,
  );

  const valorReceberHoje = diligenciasHoje.reduce(
    (acc, item) =>
      acc +
      Math.max(
        0,
        item.valorContratado -
          item.valorRecebido,
      ),
    0,
  );

  const alertas =
    diligencias.filter(
      (d) =>
        d.prioridade === 'Urgente' ||
        d.status ===
          'Aguardando pagamento',
    ).length;

  const deslocamentos =
    diligenciasHoje.filter(
      (d) => d.endereco,
    ).length;

  const kpis = [
    {
      label: 'Diligências hoje',
      value: String(
        diligenciasHoje.length,
      ),
      hint: 'Rotina ativa',
      icon: CalendarDays,
    },
    {
      label: 'Receber hoje',
      value: money.format(
        valorReceberHoje,
      ),
      hint: 'Previsão financeira',
      icon: CircleDollarSign,
    },
    {
      label: 'Deslocamentos',
      value: String(
        deslocamentos,
      ),
      hint: 'Compromissos externos',
      icon: Navigation,
    },
    {
      label: 'Alertas',
      value: String(alertas),
      hint: 'Itens de atenção',
      icon: AlertTriangle,
    },
  ];

  return (
    <section className="kpiGrid">
      {kpis.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.label}
            className="kpiCard"
          >
            <div className="kpiIcon">
              <Icon />
            </div>

            <span>{item.label}</span>

            <strong>{item.value}</strong>

            <small>{item.hint}</small>
          </Card>
        );
      })}
    </section>
  );
}