import { ArrowRight, CalendarCheck, CircleDollarSign, Clock, FileWarning, MapPinned, ShieldCheck } from 'lucide-react';
import { PageTitle } from '../../components/common/PageTitle';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export function DashboardPage() {
  return (
    <div className="pageStack">
      <PageTitle
        title="Central de Comando"
        subtitle="Tecnologia para que o advogado se preocupe apenas em advogar."
      />

      <section className="heroPanel">
        <div>
          <Badge variant="success">Bom dia, Thiago</Badge>
          <h2>Hoje sua rotina está organizada.</h2>
          <p>
            A Central de Comando será o ponto de partida do LexControl: agenda, alertas,
            valores, diligências e providências prioritárias em uma única visão.
          </p>
        </div>
        <Button>
          Planejar o dia <ArrowRight size={18} />
        </Button>
      </section>

      <section className="kpiGrid">
        <KpiCard icon={<CalendarCheck />} label="Diligências hoje" value="0" hint="Nenhuma pendência" />
        <KpiCard icon={<Clock />} label="Próxima diligência" value="--:--" hint="Agenda livre" />
        <KpiCard icon={<CircleDollarSign />} label="Receber hoje" value="R$ 0,00" hint="Financeiro regular" />
        <KpiCard icon={<FileWarning />} label="Alertas" value="0" hint="Nenhum risco" />
      </section>

      <section className="contentGrid">
        <Card>
          <div className="sectionHead">
            <div>
              <h3>Prioridades do dia</h3>
              <p>Quando as diligências forem cadastradas, elas aparecerão aqui em ordem de urgência.</p>
            </div>
            <Badge>Foundation</Badge>
          </div>
          <div className="emptyState">
            <ShieldCheck size={38} />
            <strong>Nenhuma prioridade cadastrada.</strong>
            <span>A Sprint 2 prepara a base para os módulos reais das próximas versões.</span>
          </div>
        </Card>

        <Card className="accentCard">
          <MapPinned size={34} />
          <h3>Painel Inteligente</h3>
          <p>
            Em breve, o LexControl mostrará rotas, tempo de deslocamento, pendências de documentos,
            valores a receber e lembretes automáticos.
          </p>
        </Card>
      </section>
    </div>
  );
}

function KpiCard({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint: string }) {
  return (
    <Card className="kpiCard">
      <div className="kpiIcon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </Card>
  );
}
