import { BriefcaseBusiness, CalendarRange, Coffee, WalletCards } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { commandSummary, todayTasks } from '../data/commandCenterMock';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function RoutineSnapshot() {
  return (
    <Card>
      <div className="sectionHead">
        <div>
          <h3>Minha rotina</h3>
          <p>Resumo executivo do dia para reduzir carga mental.</p>
        </div>
      </div>

      <div className="snapshotGrid">
        <div className="snapshotItem">
          <BriefcaseBusiness />
          <strong>{todayTasks.length} diligências</strong>
          <span>2 judiciais e 1 extrajudicial</span>
        </div>
        <div className="snapshotItem">
          <WalletCards />
          <strong>{money.format(commandSummary.totalToReceive)}</strong>
          <span>previsão de recebimento</span>
        </div>
        <div className="snapshotItem">
          <CalendarRange />
          <strong>{commandSummary.freeWindow}</strong>
          <span>melhor janela livre</span>
        </div>
        <div className="snapshotItem">
          <Coffee />
          <strong>Sem conflitos</strong>
          <span>agenda compatível</span>
        </div>
      </div>
    </Card>
  );
}
