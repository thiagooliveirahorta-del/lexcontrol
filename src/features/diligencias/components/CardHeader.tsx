type Props = {
    tipo: string;
    numeroInterno: string;
    processo?: string;
    status: string;
    statusClass: string;
};

export default function CardHeader({
    tipo,
    numeroInterno,
    processo,
    status,
    statusClass,
}: Props) {
    return (
        <div className="flex items-start justify-between">

            <div>

                <span className="text-sm font-semibold text-blue-600">

                    {tipo}

                </span>

                <h2 className="mt-1 text-xl font-bold text-slate-800">

                    {numeroInterno}

                </h2>

                <p className="text-sm text-slate-500">

                    {processo || "Sem número de processo"}

                </p>

            </div>

            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
            >
                {status}
            </span>

        </div>
    );
}