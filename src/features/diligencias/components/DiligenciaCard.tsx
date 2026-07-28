import {
  Calendar,
  Clock3,
  Building2,
  Landmark,
  FileText,
  Pencil,
  Archive,
} from "lucide-react";

import type { Diligencia } from "../types/diligencia";

type Props = {
  diligencia: Diligencia;
  onEdit: (diligencia: Diligencia) => void;
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

function badgePrioridade(prioridade: string) {
  switch (prioridade.toLowerCase()) {
    case "alta":
      return "bg-red-100 text-red-700";

    case "média":
      return "bg-yellow-100 text-yellow-700";

    case "baixa":
      return "bg-green-100 text-green-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function DiligenciaCard({
  diligencia,
  onEdit,
  onArchive,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold">

            {diligencia.numeroInterno}

          </h2>

          <p className="mt-1 text-sm text-slate-500">

            {diligencia.processo || "Sem número de processo"}

          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStatus(
            diligencia.status
          )}`}
        >
          {diligencia.status}
        </span>

      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">

        <div className="flex items-center gap-2">

          <Building2 size={18} />

          {diligencia.contratante}

        </div>

        <div className="flex items-center gap-2">

          <Landmark size={18} />

          {diligencia.tribunal}

        </div>

        <div className="flex items-center gap-2">

          <FileText size={18} />

          {diligencia.comarca}

        </div>

        <div className="flex items-center gap-2">

          <Calendar size={18} />

          {diligencia.data}

        </div>

        <div className="flex items-center gap-2">

          <Clock3 size={18} />

          {diligencia.hora}

        </div>

        <div className="font-semibold text-green-700">

          R$ {Number(diligencia.valorContratado).toFixed(2)}

        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgePrioridade(
            diligencia.prioridade
          )}`}
        >
          {diligencia.prioridade}
        </span>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={() => onEdit(diligencia)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-100"
          >
            <Pencil size={16} />
            Editar
          </button>

          <button
            type="button"
            onClick={onArchive}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            <Archive size={16} />
            Arquivar
          </button>

        </div>

      </div>

    </div>
  );
}