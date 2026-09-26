type Props = {
    valorContratado: number;
    valorRecebido: number;
};

function moeda(valor: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor);
}

export default function CardFinanceiro({
    valorContratado,
    valorRecebido,
}: Props) {
    return (
        <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200">

                <p className="text-xs uppercase tracking-wide text-emerald-700">
                    Contratado
                </p>

                <h3 className="mt-2 text-xl font-bold text-emerald-800">
                    {moeda(valorContratado)}
                </h3>

            </div>

            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">

                <p className="text-xs uppercase tracking-wide text-blue-700">
                    Recebido
                </p>

                <h3 className="mt-2 text-xl font-bold text-blue-800">
                    {moeda(valorRecebido)}
                </h3>

            </div>

        </div>
    );
}