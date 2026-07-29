type Props = {
    values: {
        observacoes: string;
    };
};

export default function ObservacoesSection({
    values,
}: Props) {
    return (
        <label className="md:col-span-2">
            Observações

            <textarea
                name="observacoes"
                defaultValue={values.observacoes}
                placeholder="Orientações, documentos necessários, observações do contratante..."
                rows={5}
            />
        </label>
    );
}