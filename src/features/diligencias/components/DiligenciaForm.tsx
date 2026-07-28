import type { ReactNode } from "react";

type Props = {
    titulo: string;
    children: ReactNode;
    className?: string;
};

export default function FormSection({
    titulo,
    children,
    className = "",
}: Props) {
    return (
        <section
            className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
        >
            <h3 className="mb-5 text-lg font-semibold text-slate-800">
                {titulo}
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
                {children}
            </div>
        </section>
    );
}