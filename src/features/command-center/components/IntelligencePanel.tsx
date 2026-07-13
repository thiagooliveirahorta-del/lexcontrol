import { useEffect, useState } from 'react';
import {
  Brain,
  CheckCircle2,
  FileWarning,
  ShieldAlert,
} from 'lucide-react';

import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';

import { loadDiligencias } from '../../diligencias/services/diligenciasStorage';

type AlertItem = {
  id: string;
  title: string;
  description: string;
  variant: 'warning' | 'danger' | 'success';
};

const iconByVariant = {
  warning: FileWarning,
  danger: ShieldAlert,
  success: CheckCircle2,
};

export function IntelligencePanel() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    async function load() {
      const diligencias = await loadDiligencias();

      const ativos = diligencias.filter(
        (d) => !d.arquivada,
      );

      const aguardandoPagamento = ativos.filter(
        (d) =>
          d.status === 'Aguardando pagamento',
      );

      const urgentes = ativos.filter(
        (d) =>
          d.prioridade === 'Urgente',
      );

      const novosAlerts: AlertItem[] = [];

      if (urgentes.length > 0) {
        novosAlerts.push({
          id: 'urgentes',
          title: 'Diligências urgentes',
          description: `${urgentes.length} diligência(s) exigem atenção imediata.`,
          variant: 'warning',
        });
      }

      if (aguardandoPagamento.length > 0) {
        const total = aguardandoPagamento.reduce(
          (acc, item) =>
            acc +
            (item.valorContratado -
              item.valorRecebido),
          0,
        );

        novosAlerts.push({
          id: 'financeiro',
          title: 'Recebimentos pendentes',
          description: `Há R$ ${total.toFixed(
            2,
          )} aguardando recebimento.`,
          variant: 'danger',
        });
      }

      if (
        urgentes.length === 0 &&
        aguardandoPagamento.length === 0
      ) {
        novosAlerts.push({
          id: 'ok',
          title: 'Agenda organizada',
          description:
            'Nenhuma pendência crítica identificada.',
          variant: 'success',
        });
      }

      setAlerts(novosAlerts);
    }

    load();
  }, []);

  return (
    <Card className="accentCard intelligencePanel">
      <div className="sectionHead">
        <div>
          <Brain size={34} />
          <h3>Painel Inteligente</h3>
          <p>
            O LexControl começa a responder:
            o que precisa da sua atenção agora?
          </p>
        </div>

        <Badge variant="success">
          LexIA preparada
        </Badge>
      </div>

      <div className="alertList">
        {alerts.map((alert) => {
          const Icon =
            iconByVariant[alert.variant];

          return (
            <article
              key={alert.id}
              className={`smartAlert smartAlert--${alert.variant}`}
            >
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