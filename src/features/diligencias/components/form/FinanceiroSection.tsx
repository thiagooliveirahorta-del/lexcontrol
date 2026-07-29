type Props = {
    values: {
        valorContratado: number;
        valorRecebido: number;
    };
};

export default function FinanceiroSection({
    values,
}: Props) {
    return (
        <>
            <label>
                Valor contratado
                <input
                    type="number"
                    name="valorContratado"
                    min="0"
                    step="0.01"
                    defaultValue={values.valorContratado}
                />
            </label>

            <label>
                Valor recebido
                <input
                    type="number"
                    name="valorRecebido"
                    min="0"
                    step="0.01"
                    defaultValue={values.valorRecebido}
                />
            </label>
        </>
    );
}