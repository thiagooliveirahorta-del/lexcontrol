import {
    Pencil,
    Archive,
    MapPinned,
    MessageCircle,
    Phone,
    Copy,
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

    function abrirWhatsApp() {
        const numeroOriginal = diligencia.whatsapp?.trim();

        if (!numeroOriginal) {
            toast.error("Esta diligência não possui WhatsApp cadastrado.");
            return;
        }

        let numero = numeroOriginal.replace(/\D/g, "");

        if (numero.startsWith("00")) {
            numero = numero.slice(2);
        } else if (
            !numeroOriginal.startsWith("+") &&
            !(numero.startsWith("55") && (numero.length === 12 || numero.length === 13))
        ) {
            numero = `55${numero}`;
        }

        if (!numero) {
            toast.error("O número de WhatsApp cadastrado é inválido.");
            return;
        }

        window.open(`https://wa.me/${numero}`, "_blank", "noopener,noreferrer");
    }

    function iniciarChamada() {
        const telefoneOriginal = diligencia.telefone?.trim();

        if (!telefoneOriginal) {
            toast.error("Esta diligência não possui telefone cadastrado.");
            return;
        }

        let telefone = telefoneOriginal.replace(/\D/g, "");

        if (telefone.startsWith("00")) {
            telefone = telefone.slice(2);
        } else if (
            !telefoneOriginal.startsWith("+") &&
            !(telefone.startsWith("55") && (telefone.length === 12 || telefone.length === 13))
        ) {
            telefone = `55${telefone}`;
        }

        if (telefone.length < 8 || telefone.length > 15) {
            toast.error("O telefone cadastrado é inválido.");
            return;
        }

        window.location.href = `tel:+${telefone}`;
    }

    async function copiarTexto(
        valor: string | undefined,
        descricao: string,
        descricaoVazia: string,
    ) {
        const texto = valor?.trim();

        if (!texto) {
            toast.error(`Esta diligência não possui ${descricaoVazia}.`);
            return;
        }

        try {
            await navigator.clipboard.writeText(texto);
            toast.success(`${descricao} copiado.`);
        } catch {
            toast.error("Não foi possível copiar. Verifique a permissão da área de transferência.");
        }
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
                onClick={abrirWhatsApp}
                className="flex items-center gap-2 rounded-lg border border-green-300 px-4 py-2 text-green-700 hover:bg-green-50"
            >
                <MessageCircle size={16} />
                WhatsApp
            </button>

            <button
                type="button"
                onClick={iniciarChamada}
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
            >
                <Phone size={16} />
                Ligar
            </button>

            <button
                type="button"
                onClick={() => copiarTexto(diligencia.processo, "Número do processo", "número do processo cadastrado")}
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
            >
                <Copy size={16} />
                Copiar processo
            </button>

            <button
                type="button"
                onClick={() => copiarTexto(diligencia.endereco, "Endereço", "endereço cadastrado")}
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
            >
                <Copy size={16} />
                Copiar endereço
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
