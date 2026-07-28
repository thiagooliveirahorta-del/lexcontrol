import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import QuickAction from "./components/QuickAction";
import DashboardAgenda from "./components/DashboardAgenda";
import DashboardAlerts from "./components/DashboardAlerts";

import useDashboard from "./hooks/useDashboard";

export default function DashboardPage() {

    const {
        dashboard,
        loading,
        error,
    } = useDashboard();

    if (loading) {

        return (
            <div className="p-8">
                Carregando Dashboard...
            </div>
        );

    }

    if (error) {

        return (
            <div className="p-8 text-red-600">
                {error}
            </div>
        );

    }

    if (!dashboard) {

        return null;

    }

    return (

        <div className="space-y-8 p-8">

            <DashboardHeader />

            <DashboardStats
                stats={dashboard.stats}
            />

            <section>

                <h2 className="mb-4 text-xl font-bold">
                    Ações rápidas
                </h2>

                <div className="grid gap-3 md:grid-cols-4">

                    <QuickAction titulo="Nova diligência" />

                    <QuickAction titulo="Agenda" />

                    <QuickAction titulo="Financeiro" />

                    <QuickAction titulo="Processos" />

                </div>

            </section>

            <div className="grid gap-6 lg:grid-cols-2">

                <DashboardAgenda
    agenda={dashboard.agenda}
/>

                <DashboardAlerts
    alertas={dashboard.alertas}
/>

            </div>

        </div>

    );

}