import { AlertTriangle } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Confirmação",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center gap-4 border-b p-6">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">

            <AlertTriangle
              size={24}
              className="text-red-600"
            />

          </div>

          <div>

            <h2 className="text-lg font-semibold">

              {title}

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              {message}

            </p>

          </div>

        </div>

        <div className="flex justify-end gap-3 p-6">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-100 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Processando..." : confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}