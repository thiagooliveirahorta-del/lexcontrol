import {
    ClipboardList,
    Clock3,
    CheckCircle2,
    Archive,
    DollarSign,
    Wallet,
} from "lucide-react";

type Props = {
    total: number;
    abertas: number;
    arquivadas: number;
    contratado: number;
    recebido: number;
    pendente: number;
};

function StatCard({
    titulo,
    valor,
    icon: Icon,
    cor,
}: {
    titulo: string;
    valor: string | number;
    icon: React.ElementType;
    cor: string;
}) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">
                        {titulo}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {valor}
                    </h2>

                </div>

                <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: cor }}
                >
                    <Icon
                        size={28}
                        color="white"
                    />
                </div>

            </div>

        </div>
    );
}

export function DiligenciaStats({
    total,
    abertas,
    arquivadas,
    contratado,
    recebido,
    pendente,
}: Props) {
    return (

        <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-6">

            <StatCard
                titulo="Total"
                valor={total}
                icon={ClipboardList}
                cor="#2563EB"
            />

            <StatCard
                titulo="Abertas"
                valor={abertas}
                icon={Clock3}
                cor="#F59E0B"
            />

            <StatCard
                titulo="Arquivadas"
                valor={arquivadas}
                icon={Archive}
                cor="#64748B"
            />

            <StatCard
                titulo="Contratado"
                valor={`R$ ${contratado.toFixed(2)}`}
                icon={DollarSign}
                cor="#16A34A"
            />

            <StatCard
                titulo="Recebido"
                valor={`R$ ${recebido.toFixed(2)}`}
                icon={CheckCircle2}
                cor="#22C55E"
            />

            <StatCard
                titulo="Pendente"
                valor={`R$ ${pendente.toFixed(2)}`}
                icon={Wallet}
                cor="#DC2626"
            />

        </div>

    );
}

export default DiligenciaStats;