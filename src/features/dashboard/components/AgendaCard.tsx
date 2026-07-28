import type { AgendaItem } from "../types/dashboard";

type Props = {
    item: AgendaItem;
};

export default function AgendaCard({ item }: Props) {

    return (

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="flex items-center justify-between">

                <strong className="text-lg">
                    {item.hora}
                </strong>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {item.tipo}
                </span>

            </div>

            <p className="mt-3 font-medium">
                {item.processo ?? "Processo não informado"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
                {item.tribunal
                    ?? item.comarca
                    ?? item.endereco
                    ?? "Local não informado"}
            </p>

        </div>

    );

}