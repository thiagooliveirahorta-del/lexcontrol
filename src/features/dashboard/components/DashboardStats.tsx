import {
    Briefcase,
    CalendarDays,
    Wallet,
    CircleDollarSign,
} from "lucide-react";

import StatCard from "./StatCard";

import type {
    DashboardStats as DashboardStatsType,
} from "../types/dashboard";

type Props = {
    stats: DashboardStatsType;
};

const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export default function DashboardStats({
    stats,
}: Props) {

    return (

        <section>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    titulo="Diligências abertas"
                    valor={stats.diligenciasAbertas}
                    descricao="Em andamento"
                    icone={<Briefcase size={28} />}
                    className="border-l-4 border-l-blue-600"
                />

                <StatCard
                    titulo="Hoje"
                    valor={stats.diligenciasHoje}
                    descricao="Compromissos do dia"
                    icone={<CalendarDays size={28} />}
                    className="border-l-4 border-l-green-600"
                />

                <StatCard
                    titulo="A receber"
                    valor={moeda.format(stats.valorReceber)}
                    descricao="Valores pendentes"
                    icone={<Wallet size={28} />}
                    className="border-l-4 border-l-yellow-500"
                />

                <StatCard
                    titulo="Recebido"
                    valor={moeda.format(stats.valorRecebido)}
                    descricao="Total recebido"
                    icone={<CircleDollarSign size={28} />}
                    className="border-l-4 border-l-emerald-600"
                />

            </div>

        </section>

    );

}