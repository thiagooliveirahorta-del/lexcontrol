import { useCallback, useEffect, useState } from "react";

import { dashboardService } from "../services/dashboardService";

import type { DashboardData } from "../types/dashboard";

   

export default function useDashboard() {

    const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const carregarDashboard =
        useCallback(async () => {

            try {

                setLoading(true);

                setError(null);

                const dados =
                    await dashboardService.getDashboard();

                setDashboard(dados);

            } catch (err) {

                console.error(err);

                setError(
                    "Não foi possível carregar o Dashboard."
                );

            } finally {

                setLoading(false);

            }

        }, []);

    useEffect(() => {

        carregarDashboard();

    }, [carregarDashboard]);

    return {

        dashboard,

        loading,

        error,

        reload: carregarDashboard,

    };

}