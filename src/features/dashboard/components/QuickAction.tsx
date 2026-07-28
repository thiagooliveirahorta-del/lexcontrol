type Props = {

    titulo: string;

    onClick?: () => void;

};

export default function QuickAction({
    titulo,
    onClick,
}: Props) {

    return (

        <button
            onClick={onClick}
            className="rounded-lg border bg-white px-5 py-4 shadow-sm transition hover:bg-slate-50"
        >

            {titulo}

        </button>

    );

}