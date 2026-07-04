import { MapPin, Timer } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
import { todayTasks } from '../data/commandCenterMock';

const priorityVariant = {
  Alta: 'danger',
  Média: 'warning',
  Baixa: 'default',
} as const;

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function TodayPriorities() {
  return (
    <Card>
      <div className="sectionHead">
        <div>
          <h3>Prioridades de hoje</h3>
          <p>O que merece sua atenção imediata, em ordem cronológica.</p>
        </div>
        <Badge>v0.3</Badge>
      </div>

      <div className="taskList">
        {todayTasks.map((task) => (
          <article key={task.id} className="taskItem">
            <div className="taskItem__time">
              <Timer size={16} />
              <strong>{task.time}</strong>
            </div>

            <div className="taskItem__body">
              <div className="taskItem__title">
                <h4>{task.title}</h4>
                <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
              </div>
              <p>{task.description}</p>
              <span><MapPin size={15} /> {task.location}</span>
            </div>

            <div className="taskItem__meta">
              <strong>{money.format(task.value)}</strong>
              <small>{task.status}</small>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}
