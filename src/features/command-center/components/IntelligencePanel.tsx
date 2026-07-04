import { Brain, CheckCircle2, FileWarning, ShieldAlert } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
import { alerts } from '../data/commandCenterMock';

const iconByVariant = {
  warning: FileWarning,
  danger: ShieldAlert,
  success: CheckCircle2,
};

export function IntelligencePanel() {
  return (
    <Card className="accentCard intelligencePanel">
      <div className="sectionHead">
        <div>
          <Brain size={34} />
          <h3>Painel Inteligente</h3>
          <p>O LexControl começa a responder: o que precisa da sua atenção agora?</p>
        </div>
        <Badge variant="success">LexIA preparada</Badge>
      </div>

      <div className="alertList">
        {alerts.map((alert) => {
          const Icon = iconByVariant[alert.variant];
          return (
            <article key={alert.id} className={`smartAlert smartAlert--${alert.variant}`}>
              <Icon size={20} />
              <div>
                <strong>{alert.title}</strong>
                <span>{alert.description}</span>
              </div>
            </article>
          );
        })}
      </div>
    </Card>
  );
}
