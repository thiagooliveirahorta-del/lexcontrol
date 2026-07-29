type Props = {
    values: {
        data: string;
        hora: string;
    };
};

export default function AgendamentoSection({
    values,
}: Props) {
    return (
        <>
            <label>
                Data*
                <input
                    type="date"
                    name="data"
                    defaultValue={values.data}
                    required
                />
            </label>

            <label>
                Hora*
                <input
                    type="time"
                    name="hora"
                    defaultValue={values.hora}
                    required
                />
            </label>
        </>
    );
}