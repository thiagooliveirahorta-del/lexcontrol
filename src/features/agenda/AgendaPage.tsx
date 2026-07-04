import { PageTitle } from '../../components/common/PageTitle';
import { Card } from '../../components/ui/Card';

export function AgendaPage() {
  return (
    <div className="pageStack">
      <PageTitle title="Agenda" subtitle="Visualize compromissos e prepare a integração com o Google Agenda." />
      <Card>
        <h2>Módulo em preparação</h2>
        <p>Este módulo será desenvolvido nas próximas Sprints sobre a fundação criada na Sprint 2.</p>
      </Card>
    </div>
  );
}
