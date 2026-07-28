import type { DashboardAlert } from "../types/dashboard";

type Props = {
    alerta: DashboardAlert;
};

const cores = {
    success: "bg-green-50 border-green-300 text-green-800",
    warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
    danger: "bg-red-50 border-red-300 text-red-800",
    info: "bg-blue-50 border-blue-300 text-blue-800",
};

export default function AlertCard({ alerta }: Props) {

    return (

        <div
            className={`rounded-lg border p-4 ${cores[alerta.tipo]}`}
        >

            {alerta.mensagem}

        </div>

    );

}