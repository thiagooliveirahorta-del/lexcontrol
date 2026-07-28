import type { DashboardAlert } from "../types/dashboard";

export function criarAlerta(
    tipo: DashboardAlert["tipo"],
    mensagem: string,
): DashboardAlert {

    return {

        id: crypto.randomUUID(),

        tipo,

        mensagem,

    };

}