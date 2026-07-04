import { AlertTriangle, CalendarDays, CircleDollarSign, Navigation } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { alerts, commandSummary, todayTasks } from '../data/commandCenterMock';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function CommandKpis() {
  const kpis = [
    { label: 'Diligências hoje', value: String(todayTasks.length), hint: 'Rotina ativa', icon: CalendarDays },
    { label: 'Receber hoje', value: money.format(commandSummary.totalToReceive), hint: 'Previsão financeira', icon: CircleDollarSign },
    { label: 'Deslocamento', value: commandSummary.estimatedStreetTime, hint: 'Tempo estimado', icon: Navigation },
    { label: 'Alertas', value: String(alerts.length), hint: 'Itens de atenção', icon: AlertTriangle },
  ];

  return (
    <section className="kpiGrid">
      {kpis.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="kpiCard">
            <div className="kpiIcon"><Icon /></div>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.hint}</small>
          </Card>
        );
      })}
    </section>
  );
}
