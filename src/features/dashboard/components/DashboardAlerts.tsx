import AlertCard from "./AlertCard";

import type { DashboardAlert } from "../types/dashboard";

type Props = {
    alertas: DashboardAlert[];
};

export default function DashboardAlerts({ alertas }: Props) {

    return (

        <section>

            <h2 className="mb-4 text-xl font-bold">

                Alertas

            </h2>

            <div className="space-y-3">

                {alertas.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">

                        Nenhum alerta encontrado.

                    </div>

                ) : (

                    alertas.map((alerta) => (

                        <AlertCard
                            key={alerta.id}
                            alerta={alerta}
                        />

                    ))

                )}

            </div>

        </section>

    );

}