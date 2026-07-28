import type { ReactNode } from "react";

type Props = {
    titulo: string;
    children: ReactNode;
};

export default function FormSection({
    titulo,
    children,
}: Props) {
    return (
        <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
                {titulo}
            </h3>

            <div className="grid gap-4">
                {children}
            </div>
        </section>
    );
}