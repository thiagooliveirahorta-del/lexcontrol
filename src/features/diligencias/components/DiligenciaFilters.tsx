type Props = {
    textoPesquisa: string;
    statusFiltro: string;
    prioridadeFiltro: string;
    tipoFiltro: string;
    ordenacao: string;

    onTextoPesquisa: (v: string) => void;
    onStatusFiltro: (v: string) => void;
    onPrioridadeFiltro: (v: string) => void;
    onTipoFiltro: (v: string) => void;
    onOrdenacao: (v: string) => void;
};

export function DiligenciaFilters({
    textoPesquisa,
    statusFiltro,
    prioridadeFiltro,
    tipoFiltro,
    ordenacao,
    onTextoPesquisa,
    onStatusFiltro,
    onPrioridadeFiltro,
    onTipoFiltro,
    onOrdenacao,
}: Props) {
    return (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="grid gap-4 lg:grid-cols-5">

                <input
                    value={textoPesquisa}
                    onChange={(e) =>
                        onTextoPesquisa(e.target.value)
                    }
                    placeholder="Pesquisar..."
                    className="rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500"
                />

                <select
                    value={statusFiltro}
                    onChange={(e) =>
                        onStatusFiltro(e.target.value)
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3"
                >
                    <option value="todos">Todos os status</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluída">Concluída</option>
                </select>

                <select
                    value={prioridadeFiltro}
                    onChange={(e) =>
                        onPrioridadeFiltro(e.target.value)
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3"
                >
                    <option value="todas">Todas prioridades</option>
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                </select>

                <select
                    value={tipoFiltro}
                    onChange={(e) =>
                        onTipoFiltro(e.target.value)
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3"
                >
                    <option value="todos">Todos os tipos</option>
                    <option value="Audiência">Audiência</option>
                    <option value="Despacho">Despacho</option>
                    <option value="Protocolo">Protocolo</option>
                    <option value="Cópias">Cópias</option>
                    <option value="Carga">Carga</option>
                </select>

                <select
                    value={ordenacao}
                    onChange={(e) =>
                        onOrdenacao(e.target.value)
                    }
                    className="rounded-xl border border-slate-300 px-4 py-3"
                >
                    <option value="data">Data</option>
                    <option value="prioridade">Prioridade</option>
                    <option value="status">Status</option>
                    <option value="contratante">Contratante</option>
                </select>

            </div>

        </div>
    );
}

export default DiligenciaFilters;