export interface DashboardStats {

    diligenciasAbertas: number;
    diligenciasHoje: number;
    valorReceber: number;
    valorRecebido: number;

    valorRecebidoMes: number;

    ticketMedio: number;

    percentualRecebido: number;

}

export interface AgendaItem {

    id: string;

    tipo: string;

    hora: string;

    processo: string | null;

    tribunal: string | null;

    comarca: string | null;

    endereco: string | null;

}

export interface DashboardData {

    stats: DashboardStats;

    agenda: AgendaItem[];

    alertas: DashboardAlert[];

}

export interface DashboardAlert {

    id: string;

    tipo: "success" | "warning" | "danger" | "info";

    mensagem: string;

}