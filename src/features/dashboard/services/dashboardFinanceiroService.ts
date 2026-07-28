import { supabase } from "../../../lib/supabaseClient";

export const dashboardFinanceiroService = {

    async getValorReceber() {

        const { data, error } = await supabase
            .from("diligencias")
            .select("valor_contratado, valor_recebido");

        if (error) {
            throw error;
        }

        return (data ?? []).reduce((total, item) => {

            const contratado =
                Number(item.valor_contratado ?? 0);

            const recebido =
                Number(item.valor_recebido ?? 0);

            return total + (contratado - recebido);

        }, 0);

    },

    async getValorRecebido() {

        const { data, error } = await supabase
            .from("diligencias")
            .select("valor_recebido");

        if (error) {
            throw error;
        }

        return (data ?? []).reduce((total, item) => {

            return total + Number(item.valor_recebido ?? 0);

        }, 0);

    },

    async getValorRecebidoMes() {

    const inicioMes = new Date();

    inicioMes.setDate(1);

    const dataInicial =
        inicioMes.toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("diligencias")
        .select("valor_recebido")
        .gte("data", dataInicial);

    if (error) {
        throw error;
    }

    return (data ?? []).reduce((total, item) => {

        return total + Number(item.valor_recebido ?? 0);

    }, 0);

},

async getTicketMedio() {

    const { data, error } = await supabase
        .from("diligencias")
        .select("valor_contratado");

    if (error) {
        throw error;
    }

    if (!data?.length) {
        return 0;
    }

    const total = data.reduce((soma, item) => {

        return soma + Number(item.valor_contratado ?? 0);

    }, 0);

    return total / data.length;

},

async getPercentualRecebido() {

    const { data, error } = await supabase
        .from("diligencias")
        .select("valor_contratado, valor_recebido");

    if (error) {
        throw error;
    }

    const contratado = (data ?? []).reduce((soma, item) => {

        return soma + Number(item.valor_contratado ?? 0);

    }, 0);

    const recebido = (data ?? []).reduce((soma, item) => {

        return soma + Number(item.valor_recebido ?? 0);

    }, 0);

    if (contratado === 0) {

        return 0;

    }

    return (recebido / contratado) * 100;

},

};