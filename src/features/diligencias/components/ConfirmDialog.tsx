type Props = {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDialog({
    open,
    title,
    message,
    onConfirm,
    onCancel,
}: Props) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                <div className="border-b p-6">

                    <h2 className="text-xl font-semibold">
                        {title}
                    </h2>

                </div>

                <div className="p-6">

                    <p className="text-gray-600">
                        {message}
                    </p>

                </div>

                <div className="flex justify-end gap-3 border-t p-4">

                    <button
                        onClick={onCancel}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Confirmar
                    </button>

                </div>

            </div>

        </div>

    );

}