import { PageTitle } from '../../components/common/PageTitle';
import { CommandHero } from './components/CommandHero';
import { CommandKpis } from './components/CommandKpis';
import { IntelligencePanel } from './components/IntelligencePanel';
import { RoutineSnapshot } from './components/RoutineSnapshot';
import { TodayPriorities } from './components/TodayPriorities';

export function CommandCenterPage() {
  return (
    <div className="pageStack">
      <PageTitle
        title="Central de Comando"
        subtitle="Tecnologia para que o advogado se preocupe apenas em advogar."
      />

      <CommandHero />
      <CommandKpis />

      <section className="contentGrid commandGrid">
        <TodayPriorities />
        <div className="sideStack">
          <IntelligencePanel />
          <RoutineSnapshot />
        </div>
      </section>
    </div>
  );
}
