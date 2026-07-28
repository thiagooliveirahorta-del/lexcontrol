import AgendaCard from "./AgendaCard";

import type { AgendaItem } from "../types/dashboard";

type Props = {
    agenda: AgendaItem[];
};

export default function DashboardAgenda({ agenda }: Props) {

    return (

        <section>

            <h2 className="mb-4 text-xl font-bold">

                Próximas diligências

            </h2>

            <div className="space-y-3">

                {agenda.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">

                        Nenhuma diligência agendada para hoje.

                    </div>

                ) : (

                    agenda.map((item) => (

                        <AgendaCard
                            key={item.id}
                            item={item}
                        />

                    ))

                )}

            </div>

        </section>

    );

}