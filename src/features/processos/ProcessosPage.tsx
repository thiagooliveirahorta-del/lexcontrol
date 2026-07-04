import { PageTitle } from '../../components/common/PageTitle';
import { Card } from '../../components/ui/Card';

export function ProcessosPage() {
  return (
    <div className="pageStack">
      <PageTitle title="Processos" subtitle="Estruture a base para vincular diligências aos processos." />
      <Card>
        <h2>Módulo em preparação</h2>
        <p>Este módulo será desenvolvido nas próximas Sprints sobre a fundação criada na Sprint 2.</p>
      </Card>
    </div>
  );
}
