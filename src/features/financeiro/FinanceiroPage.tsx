import { PageTitle } from '../../components/common/PageTitle';
import { Card } from '../../components/ui/Card';

export function FinanceiroPage() {
  return (
    <div className="pageStack">
      <PageTitle title="Financeiro" subtitle="Acompanhe valores contratados, recebidos e pendentes." />
      <Card>
        <h2>Módulo em preparação</h2>
        <p>Este módulo será desenvolvido nas próximas Sprints sobre a fundação criada na Sprint 2.</p>
      </Card>
    </div>
  );
}
