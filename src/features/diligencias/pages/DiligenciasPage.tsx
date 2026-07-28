import { useEffect, useMemo, useState } from "react";

import DiligenciaCard from "../components/DiligenciaCard";
import { DiligenciaForm } from "../components/DiligenciaForm";
import { DiligenciaFilters } from "../components/DiligenciaFilters";
import { DiligenciaStats } from "../components/DiligenciaStats";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";
import { useDiligencias } from "../hooks/useDiligencias";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { DiligenciaSkeleton } from "../components/DiligenciaSkeleton";

import type {
    Diligencia,
    DiligenciaFormData,
} from "../types/diligencia";

function DiligenciasPage() {

    const {

        diligencias,

        loading,

        saving,

        error,

        conflictMessage,

        estatisticas,

        criar,

        editar,

        arquivar,

    } = useDiligencias();

    const [mostrarFormulario, setMostrarFormulario] =
        useState(false);

    const [diligenciaSelecionada, setDiligenciaSelecionada] =
        useState<Diligencia | null>(null);

    const [textoPesquisa, setTextoPesquisa] = useState(
    () => localStorage.getItem("lex_pesquisa") ?? ""
);

const [textoPesquisaDebounce, setTextoPesquisaDebounce] = useState(
    () => localStorage.getItem("lex_pesquisa") ?? ""
);

const [statusFiltro, setStatusFiltro] = useState(
    () => localStorage.getItem("lex_status") ?? "todos"
);

const [prioridadeFiltro, setPrioridadeFiltro] = useState(
    () => localStorage.getItem("lex_prioridade") ?? "todas"
);

const [tipoFiltro, setTipoFiltro] = useState(
    () => localStorage.getItem("lex_tipo") ?? "todos"
);

const [ordenacao, setOrdenacao] = useState(
    () => localStorage.getItem("lex_ordenacao") ?? "data"
);

        const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

const [diligenciaParaArquivar, setDiligenciaParaArquivar] =
    useState<Diligencia | null>(null);

    useEffect(() => {

    const timer = setTimeout(() => {

        setTextoPesquisaDebounce(textoPesquisa);

    }, 300);

    return () => clearTimeout(timer);

}, [textoPesquisa]);

useEffect(() => {

    localStorage.setItem("lex_pesquisa", textoPesquisa);
    localStorage.setItem("lex_status", statusFiltro);
    localStorage.setItem("lex_prioridade", prioridadeFiltro);
    localStorage.setItem("lex_tipo", tipoFiltro);
    localStorage.setItem("lex_ordenacao", ordenacao);

}, [
    textoPesquisa,
    statusFiltro,
    prioridadeFiltro,
    tipoFiltro,
    ordenacao,
]);

    function novaDiligencia() {

        setDiligenciaSelecionada(null);

        setMostrarFormulario(true);

    }

    function editarDiligencia(
    diligencia: Diligencia
) {

    setDiligenciaSelecionada(diligencia);

    setMostrarFormulario(true);

}

function solicitarArquivamento(
    diligencia: Diligencia
) {

    setDiligenciaParaArquivar(diligencia);

    setConfirmDialogOpen(true);

}

async function confirmarArquivamento() {

    if (!diligenciaParaArquivar) return;

    try {

        await arquivar(diligenciaParaArquivar.id);

        toast.success("Diligência arquivada com sucesso!");

    } catch (error) {

        console.error(error);

        toast.error("Erro ao arquivar.");

    }

    setConfirmDialogOpen(false);

    setDiligenciaParaArquivar(null);

}

function fecharFormulario() {

    setMostrarFormulario(false);

    setDiligenciaSelecionada(null);

}

    async function salvar(
    dados: DiligenciaFormData
) {
    try {

        if (diligenciaSelecionada) {

            await editar(
                diligenciaSelecionada.id,
                dados
            );

            toast.success(
                "Diligência atualizada com sucesso!"
            );

        } else {

            await criar(dados);

            toast.success(
                "Diligência cadastrada com sucesso!"
            );

        }

        fecharFormulario();

    } catch (error) {

        console.error(error);

        toast.error(
            "Erro ao salvar a diligência."
        );

    }
}

           const diligenciasFiltradas = useMemo(() => {

        let lista = [...diligencias];

        if (textoPesquisaDebounce.trim()) {

            const pesquisa =
    textoPesquisaDebounce.toLowerCase();

            lista = lista.filter((d) =>

                d.numeroInterno
                    .toLowerCase()
                    .includes(pesquisa)

                ||

                d.contratante
                    .toLowerCase()
                    .includes(pesquisa)

                ||

                d.comarca
                    .toLowerCase()
                    .includes(pesquisa)

                ||

                (d.processo ?? "")
                    .toLowerCase()
                    .includes(pesquisa)

            );

        }

        if (statusFiltro !== "todos") {

            lista = lista.filter(

                (d) =>
                    d.status === statusFiltro

            );

        }

        if (prioridadeFiltro !== "todas") {

            lista = lista.filter(

                (d) =>
                    d.prioridade ===
                    prioridadeFiltro

            );

        }

        if (tipoFiltro !== "todos") {

            lista = lista.filter(

                (d) =>
                    d.tipo === tipoFiltro

            );

        }
                lista.sort((a, b) => {

            switch (ordenacao) {

                case "prioridade":

                    return a.prioridade.localeCompare(
                        b.prioridade
                    );

                case "status":

                    return a.status.localeCompare(
                        b.status
                    );

                case "contratante":

                    return a.contratante.localeCompare(
                        b.contratante
                    );

                default:

                    return (
                        new Date(
                            `${a.data}T${a.hora}`
                        ).getTime() -

                        new Date(
                            `${b.data}T${b.hora}`
                        ).getTime()
                    );

            }

        });

        return lista;

    }, [
    diligencias,
    textoPesquisaDebounce,
    statusFiltro,
    prioridadeFiltro,
    tipoFiltro,
    ordenacao,
]);

    if (loading) {

    return (

        <div className="container mx-auto p-6">

            <div className="mb-6">

                <div className="mb-3 h-8 w-60 animate-pulse rounded bg-gray-200"></div>

                <div className="h-4 w-96 animate-pulse rounded bg-gray-200"></div>

            </div>

            <div className="grid gap-6">

                <DiligenciaSkeleton />

                <DiligenciaSkeleton />

                <DiligenciaSkeleton />

                <DiligenciaSkeleton />

            </div>

        </div>

    );

}

    return (

        <div className="container mx-auto p-6">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Diligências

                    </h1>

                    <p className="text-gray-500">

                        Gerencie todas as diligências do LexControl.

                    </p>

                </div>

                <button

                    type="button"

                    onClick={novaDiligencia}

                    className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"

                >

                    Nova diligência

                </button>

            </div>

            {error && (

                <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">

                    {error}

                </div>

            )}

            <DiligenciaStats

                total={estatisticas.total}

                abertas={estatisticas.abertas}

                arquivadas={estatisticas.arquivadas}

                contratado={estatisticas.contratado}

                recebido={estatisticas.recebido}

                pendente={estatisticas.pendente}

            />

            <DiligenciaFilters

                textoPesquisa={textoPesquisa}

                statusFiltro={statusFiltro}

                prioridadeFiltro={prioridadeFiltro}

                tipoFiltro={tipoFiltro}

                ordenacao={ordenacao}

                onTextoPesquisa={setTextoPesquisa}

                onStatusFiltro={setStatusFiltro}

                onPrioridadeFiltro={setPrioridadeFiltro}

                onTipoFiltro={setTipoFiltro}

                onOrdenacao={setOrdenacao}

            />
                        {diligenciasFiltradas.length === 0 ? (

                <EmptyState
                    onNovaDiligencia={novaDiligencia}
                />

            ) : (

                <div className="grid gap-6">

                    {diligenciasFiltradas.map((diligencia) => (

                        <DiligenciaCard

                            key={diligencia.id}

                            diligencia={diligencia}

                            onEdit={editarDiligencia}

                            onArchive={() => solicitarArquivamento(diligencia)}

                        />

                    ))}

                </div>

            )}

            {mostrarFormulario && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

                    <div className="max-h-[95vh] w-full max-w-5xl overflow-auto rounded-xl bg-white shadow-2xl">

                        <DiligenciaForm

                            diligencia={diligenciaSelecionada}

                            conflictMessage={conflictMessage}

                            onCancel={fecharFormulario}

                            onSubmit={salvar}

                        />

                        <div className="border-t bg-gray-50 px-6 py-4">

                            <div className="flex items-center justify-between">

                                <span className="text-sm text-gray-500">

                                    {saving
                                        ? "Salvando..."
                                        : diligenciaSelecionada
                                        ? "Editando diligência"
                                        : "Nova diligência"}

                                </span>

                                <button

                                    type="button"

                                    onClick={fecharFormulario}

                                    className="rounded border px-4 py-2 hover:bg-gray-100"

                                >

                                    Fechar

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            <ConfirmDialog

    open={confirmDialogOpen}

    title="Arquivar diligência"

    message="Tem certeza que deseja arquivar esta diligência? Ela continuará disponível no histórico."

    onCancel={() => {

        setConfirmDialogOpen(false);

        setDiligenciaParaArquivar(null);

    }}

    onConfirm={confirmarArquivamento}

/>
                    </div>

    );

}
export default DiligenciasPage;