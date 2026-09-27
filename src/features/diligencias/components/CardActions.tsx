import {
    Pencil,
    Archive,
    MapPinned,
    MessageCircle,
    Phone,
} from "lucide-react";
import toast from "react-hot-toast";

import type { Diligencia } from "../types/diligencia";

type Props = {
    diligencia: Diligencia;
    onEdit: (diligencia: Diligencia) => void;
    onArchive: () => void;
};

export default function CardActions({
    diligencia,
    onEdit,
    onArchive,
}: Props) {
    function abrirMapa() {
        const endereco = diligencia.endereco?.trim();

        if (!endereco) {
            toast.error("Esta diligência não possui endereço cadastrado.");
            return;
        }

        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    }

    return (
        <div className="mt-6 flex flex-wrap gap-2">

            <button
                type="button"
                onClick={() => onEdit(diligencia)}
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
            >
                <Pencil size={16} />
                Editar
            </button>

            <button
                type="button"
                onClick={abrirMapa}
                className="flex items-center gap-2 rounded-lg border border-blue-300 px-4 py-2 text-blue-700 hover:bg-blue-50"
            >
                <MapPinned size={16} />
                Mapa
            </button>

            <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-green-300 px-4 py-2 text-green-700 hover:bg-green-50"
            >
                <MessageCircle size={16} />
                WhatsApp
            </button>

            <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
            >
                <Phone size={16} />
                Ligar
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
    );
}