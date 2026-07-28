type Props = {
    titulo: string;
    valor: string | number;

    descricao?: string;

    icone?: React.ReactNode;

    onClick?: () => void;

    className?: string;
};

export default function StatCard({
    titulo,
    valor,
    descricao,
    icone,
    onClick,
    className = "",
}: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={!onClick}
            className={`
                w-full
                rounded-xl
                border
                bg-white
                p-6
                shadow-sm
                text-left
                transition
                hover:shadow-md
                hover:-translate-y-1
                disabled:hover:translate-y-0
                disabled:cursor-default
                ${className}
            `}
        >
            {icone && (
                <div className="mb-3 text-2xl">
                    {icone}
                </div>
            )}

            <p className="text-sm text-slate-500">
                {titulo}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
                {valor}
            </h2>

            {descricao && (
                <p className="mt-2 text-sm text-slate-500">
                    {descricao}
                </p>
            )}
        </button>
    );
}