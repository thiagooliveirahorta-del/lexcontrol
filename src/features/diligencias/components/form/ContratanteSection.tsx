type Props = {
    values: {
        contratante: string;
        advogadoSolicitante: string;
        whatsapp: string;
        telefone: string;
        email: string;
    };
};

export default function ContratanteSection({
    values,
}: Props) {
    return (
        <>
            <label>
                Contratante*
                <input
                    name="contratante"
                    defaultValue={values.contratante}
                    required
                    placeholder="Escritório ou advogado contratante"
                />
            </label>

            <label>
                Advogado solicitante
                <input
                    name="advogadoSolicitante"
                    defaultValue={values.advogadoSolicitante}
                    placeholder="Nome do solicitante"
                />
            </label>

            <label>
                WhatsApp
                <input
                    name="whatsapp"
                    defaultValue={values.whatsapp}
                    placeholder="21999999999"
                />
            </label>

            <label>
                Telefone
                <input
                    name="telefone"
                    defaultValue={values.telefone}
                    placeholder="2133334444"
                />
            </label>

            <label className="md:col-span-2">
                E-mail
                <input
                    type="email"
                    name="email"
                    defaultValue={values.email}
                    placeholder="contato@exemplo.com"
                />
            </label>
        </>
    );
}