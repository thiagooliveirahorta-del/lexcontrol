import { ArrowRight, CalendarCheck, Clock, Route } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { commandSummary } from '../data/commandCenterMock';

export function CommandHero() {
  return (
    <section className="commandHero">
      <div className="commandHero__content">
        <Badge variant="success">Central de Comando</Badge>
        <h2>{commandSummary.greeting}</h2>
        <p>{commandSummary.message}</p>

        <div className="commandHero__facts">
          <span>
            <CalendarCheck size={17} /> Primeira diligência às {commandSummary.nextTask.time}
          </span>
          <span>
            <Route size={17} /> Tempo na rua: {commandSummary.estimatedStreetTime}
          </span>
          <span>
            <Clock size={17} /> Janela livre: {commandSummary.freeWindow}
          </span>
        </div>
      </div>

      <div className="commandHero__action">
        <small>Próxima prioridade</small>
        <strong>{commandSummary.nextTask.title}</strong>
        <span>{commandSummary.nextTask.location}</span>
        <Button>
          Iniciar planejamento <ArrowRight size={18} />
        </Button>
      </div>
    </section>
  );
}
