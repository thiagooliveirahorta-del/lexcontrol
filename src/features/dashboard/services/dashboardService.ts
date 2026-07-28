import { supabase } from "../../../lib/supabaseClient";

import { dashboardFinanceiroService } from "./dashboardFinanceiroService";
import { dashboardAlertService } from "./dashboardAlertService";

export const dashboardService = {

    async getDashboard() {

        const [

            abertas,

            hoje,

            valorReceber,

            valorRecebido,

            valorRecebidoMes,

            ticketMedio,

            percentualRecebido,

            agenda,

            alertas,

        ] = await Promise.all([

            this.getDiligenciasAbertas(),

            this.getDiligenciasHoje(),

            dashboardFinanceiroService.getValorReceber(),

            dashboardFinanceiroService.getValorRecebido(),

            dashboardFinanceiroService.getValorRecebidoMes(),

            dashboardFinanceiroService.getTicketMedio(),

            dashboardFinanceiroService.getPercentualRecebido(),

            this.getAgendaHoje(),

            dashboardAlertService.getDashboardAlerts(),

        ]);

        return {

            stats: {

                diligenciasAbertas: abertas,

                diligenciasHoje: hoje,

                valorReceber,

                valorRecebido,

                valorRecebidoMes,

                ticketMedio,

                percentualRecebido,

            },

            agenda,

            alertas,

        };

    },

    async getDiligenciasAbertas() {

        const { count, error } = await supabase

            .from("diligencias")

            .select("*", {

                count: "exact",

                head: true,

            })

            .neq("status", "Concluída");

        if (error) throw error;

        return count ?? 0;

    },

    async getDiligenciasHoje() {

        const hoje = new Date()

            .toISOString()

            .split("T")[0];

        const { count, error } = await supabase

            .from("diligencias")

            .select("*", {

                count: "exact",

                head: true,

            })

            .eq("data", hoje);

        if (error) throw error;

        return count ?? 0;

    },

    async getAgendaHoje() {

        const hoje = new Date()

            .toISOString()

            .split("T")[0];

        const { data, error } = await supabase

            .from("diligencias")

            .select(`
                id,
                tipo,
                hora,
                processo,
                tribunal,
                comarca,
                endereco
            `)

            .eq("data", hoje)

            .order("hora", { ascending: true });

        if (error) throw error;

        return data ?? [];

    },

};