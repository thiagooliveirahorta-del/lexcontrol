import { supabase } from "../../../lib/supabaseClient";

import type { DashboardAlert } from "../types/dashboard";

import { criarAlerta } from "./dashboardAlerts";

export async function verificarDiligenciasVencidas(): Promise<DashboardAlert[]> {

    const hoje = new Date()
        .toISOString()
        .split("T")[0];

    const { count, error } = await supabase
        .from("diligencias")
        .select("*", {
            count: "exact",
            head: true,
        })
        .lt("data", hoje)
        .neq("status", "Concluída");

    if (error) {
        throw error;
    }

    if ((count ?? 0) === 0) {
        return [];
    }

    return [
        criarAlerta(
            "danger",
            `Existem ${count} diligência(s) vencida(s).`
        ),
    ];
}