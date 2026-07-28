import { ClipboardList, Plus } from "lucide-react";

type Props = {
    onNovaDiligencia: () => void;
};

export default function EmptyState({
    onNovaDiligencia,
}: Props) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20">

            <div className="mx-auto flex max-w-md flex-col items-center text-center">

                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">

                    <ClipboardList
                        size={46}
                        className="text-blue-600"
                    />

                </div>

                <h2 className="text-2xl font-bold text-slate-800">

                    Nenhuma diligência encontrada

                </h2>

                <p className="mt-3 text-slate-500">

                    Cadastre sua primeira diligência para começar a
                    organizar sua agenda jurídica no LexControl.

                </p>

                <button
                    type="button"
                    onClick={onNovaDiligencia}
                    className="
                        mt-8
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-6
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-700
                    "
                >
                    <Plus size={18} />

                    Nova diligência

                </button>

            </div>

        </div>
    );
}