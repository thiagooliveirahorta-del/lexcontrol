type Props = {
    values: {
        processo: string;
        tribunal: string;
        vara: string;
        comarca: string;
        endereco: string;
    };
};

export default function ProcessoSection({
    values,
}: Props) {
    return (
        <>
            <label className="md:col-span-2">
                Processo
                <input
                    name="processo"
                    defaultValue={values.processo}
                    placeholder="0000000-00.0000.0.00.0000"
                />
            </label>

            <label>
                Tribunal
                <input
                    name="tribunal"
                    defaultValue={values.tribunal}
                    placeholder="TJ/RJ, TRT, TRF..."
                />
            </label>

            <label>
                Vara
                <input
                    name="vara"
                    defaultValue={values.vara}
                    placeholder="Ex.: 2ª Vara Cível"
                />
            </label>

            <label>
                Comarca*
                <input
                    name="comarca"
                    defaultValue={values.comarca}
                    required
                    placeholder="Rio de Janeiro/RJ"
                />
            </label>

            <label className="md:col-span-2">
                Endereço / Local
                <input
                    name="endereco"
                    defaultValue={values.endereco}
                    placeholder="Fórum, Cartório ou endereço completo"
                />
            </label>
        </>
    );
}