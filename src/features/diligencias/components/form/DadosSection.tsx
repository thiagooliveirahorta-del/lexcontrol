type Props = {
    values: {
        tipo: string;
        status: string;
        prioridade: string;
    };

    tipos: readonly string[];
    statusList: readonly string[];
    prioridades: readonly string[];
};

export default function DadosSection({
    values,
    tipos,
    statusList,
    prioridades,
}: Props) {
    return (
        <>
            <label>
                Tipo
                <select
                    name="tipo"
                    defaultValue={values.tipo}
                    required
                >
                    {tipos.map((tipo) => (
                        <option key={tipo}>
                            {tipo}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Status
                <select
                    name="status"
                    defaultValue={values.status}
                    required
                >
                    {statusList.map((status) => (
                        <option key={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Prioridade
                <select
                    name="prioridade"
                    defaultValue={values.prioridade}
                    required
                >
                    {prioridades.map((prioridade) => (
                        <option key={prioridade}>
                            {prioridade}
                        </option>
                    ))}
                </select>
            </label>
        </>
    );
}