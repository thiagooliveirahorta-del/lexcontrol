import type { FormEvent } from 'react';
import type { Diligencia, DiligenciaFormData } from '../types/diligencia';
import { prioridadesDiligencia, statusDiligencia, tiposDiligencia } from '../types/diligencia';
import FormSection from "../../../components/ui/FormSection";
import DadosSection from "./form/DadosSection";

type Props = {
  diligencia?: Diligencia | null;
  conflictMessage?: string | null;
  onCancel: () => void;
  onSubmit: (data: DiligenciaFormData) => void;
};

const initialData: DiligenciaFormData = {
  tipo: 'Audiência',
  status: 'Recebida',
  prioridade: 'Média',
  contratante: '',
  advogadoSolicitante: '',
  telefone: '',
  whatsapp: '',
  email: '',
  processo: '',
  tribunal: '',
  vara: '',
  comarca: '',
  endereco: '',
  data: '',
  hora: '',
  valorContratado: 0,
  valorRecebido: 0,
  observacoes: '',
  arquivada: false,
};

export function DiligenciaForm({ diligencia, conflictMessage, onCancel, onSubmit }: Props) {
  const values = diligencia ?? initialData;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    onSubmit({
      tipo: form.get('tipo') as DiligenciaFormData['tipo'],
      status: form.get('status') as DiligenciaFormData['status'],
      prioridade: form.get('prioridade') as DiligenciaFormData['prioridade'],
      contratante: String(form.get('contratante') || '').trim(),
      advogadoSolicitante: String(form.get('advogadoSolicitante') || '').trim(),
      telefone: String(form.get('telefone') || '').trim(),
      whatsapp: String(form.get('whatsapp') || '').trim(),
      email: String(form.get('email') || '').trim(),
      processo: String(form.get('processo') || '').trim(),
      tribunal: String(form.get('tribunal') || '').trim(),
      vara: String(form.get('vara') || '').trim(),
      comarca: String(form.get('comarca') || '').trim(),
      endereco: String(form.get('endereco') || '').trim(),
      data: String(form.get('data') || ''),
      hora: String(form.get('hora') || ''),
      valorContratado: Number(form.get('valorContratado') || 0),
      valorRecebido: Number(form.get('valorRecebido') || 0),
      observacoes: String(form.get('observacoes') || '').trim(),
      arquivada: false,
    });
  }

  return (
    <section className="diligencia-form-panel">
      <div className="diligencia-form-panel__header">
        <div>
          <span>Cadastro rápido</span>
          <h3>{diligencia ? 'Editar diligência' : 'Nova diligência'}</h3>
        </div>
        <button type="button" className="diligencia-secondary-button" onClick={onCancel}>
          Fechar
        </button>
      </div>

      {conflictMessage && <div className="diligencia-conflict">⚠ {conflictMessage}</div>}

      <form className="diligencia-form" onSubmit={handleSubmit}>
        <FormSection titulo="📋 Dados da diligência">
    <DadosSection
        values={{
            tipo: values.tipo,
            status: values.status,
            prioridade: values.prioridade,
        }}
        tipos={tiposDiligencia}
        statusList={statusDiligencia}
        prioridades={prioridadesDiligencia}
    />
</FormSection>

        <label>
          Contratante*
          <input name="contratante" defaultValue={values.contratante} required placeholder="Escritório ou advogado contratante" />
        </label>

        <label>
          Advogado solicitante
          <input name="advogadoSolicitante" defaultValue={values.advogadoSolicitante} placeholder="Nome do solicitante" />
        </label>

        <label>
          WhatsApp
          <input name="whatsapp" defaultValue={values.whatsapp} placeholder="21999999999" />
        </label>

        <label>
          Processo
          <input name="processo" defaultValue={values.processo} placeholder="0000000-00.0000.0.00.0000" />
        </label>

        <label>
          Tribunal
          <input name="tribunal" defaultValue={values.tribunal} placeholder="TJ/RJ, TRT, JF..." />
        </label>

        <label>
          Vara
          <input name="vara" defaultValue={values.vara} placeholder="Ex.: 2ª Vara Cível" />
        </label>

        <label>
          Comarca*
          <input name="comarca" defaultValue={values.comarca} required placeholder="Ex.: Rio de Janeiro/RJ" />
        </label>

        <label>
          Data*
          <input name="data" type="date" defaultValue={values.data} required />
        </label>

        <label>
          Hora*
          <input name="hora" type="time" defaultValue={values.hora} required />
        </label>

        <label className="full">
          Endereço/local
          <input name="endereco" defaultValue={values.endereco} placeholder="Fórum, cartório ou endereço completo" />
        </label>

        <label>
          Valor contratado
          <input name="valorContratado" type="number" min="0" step="0.01" defaultValue={values.valorContratado} />
        </label>

        <label>
          Valor recebido
          <input name="valorRecebido" type="number" min="0" step="0.01" defaultValue={values.valorRecebido} />
        </label>

        <label>
          E-mail
          <input name="email" type="email" defaultValue={values.email} />
        </label>

        <label className="full">
          Observações
          <textarea name="observacoes" defaultValue={values.observacoes} placeholder="Orientações, documentos necessários, observações do contratante..." />
        </label>

        <button type="submit" className="diligencia-primary-button full">
          Salvar diligência
        </button>
      </form>
    </section>
  );
}
