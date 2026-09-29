import CardHeader from "./CardHeader";
import CardInfo from "./CardInfo";
import CardFinanceiro from "./CardFinanceiro";
import CardActions from "./CardActions";

import type { Diligencia, DiligenciaStatus } from "../types/diligencia";

type Props = {
  diligencia: Diligencia;
  onEdit: (diligencia: Diligencia) => void;
  onStatusChange: (status: Exclude<DiligenciaStatus, "Arquivada">) => Promise<void>;
  onArchive: () => void;
};

function badgeStatus(status: string) {
  switch (status.toLowerCase()) {
    case "pendente":
      return "bg-yellow-100 text-yellow-800";

    case "em andamento":
      return "bg-blue-100 text-blue-700";

    case "concluída":
      return "bg-green-100 text-green-700";

    case "arquivada":
      return "bg-gray-200 text-gray-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function DiligenciaCard({
  diligencia,
  onEdit,
  onStatusChange,
  onArchive,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      <CardHeader
  tipo={diligencia.tipo}
  numeroInterno={diligencia.numeroInterno}
  processo={diligencia.processo}
  status={diligencia.status}
  statusClass={badgeStatus(diligencia.status)}
/>

      <CardInfo
        contratante={diligencia.contratante}
        tribunal={diligencia.tribunal ?? "Não informado"}
        comarca={diligencia.comarca}
        endereco={diligencia.endereco}
        data={diligencia.data}
        hora={diligencia.hora}
      />

      <CardFinanceiro
        valorContratado={Number(diligencia.valorContratado)}
        valorRecebido={Number(diligencia.valorRecebido)}
      />

      <CardActions
        diligencia={diligencia}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
        onArchive={onArchive}
      />

    </div>
  );
}
