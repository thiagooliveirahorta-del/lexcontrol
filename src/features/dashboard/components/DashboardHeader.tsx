function saudacao() {
    const hora = new Date().getHours();

    if (hora < 12) return "Bom dia";
    if (hora < 18) return "Boa tarde";

    return "Boa noite";
}

export default function DashboardHeader() {
    const data = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date());

    return (
        <div className="flex flex-col justify-between gap-3 md:flex-row">
            <div>
                <h1 className="text-3xl font-bold">
                    {saudacao()}
                </h1>

                <p className="text-slate-500">
                    Bem-vindo ao LexControl
                </p>
            </div>

            <div className="text-right text-sm text-slate-500 capitalize">
                {data}
            </div>
        </div>
    );
}