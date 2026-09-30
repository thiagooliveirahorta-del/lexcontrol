import type { FormEvent } from 'react';
import type { Diligencia, DiligenciaFormData } from '../types/diligencia';
import { prioridadesDiligencia, statusDiligencia, tiposDiligencia } from '../types/diligencia';
import FormSection from "../../../components/ui/FormSection";
import DadosSection from "./form/DadosSection";
import ContratanteSection from "./form/ContratanteSection";
import ProcessoSection from "./form/ProcessoSection";
import AgendamentoSection from "./form/AgendamentoSection";
import FinanceiroSection from "./form/FinanceiroSection";
import ObservacoesSection from "./form/ObservacoesSection";

import '../diligencias.css';

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
      </div>

      {conflictMessage && <div className="diligencia-conflict">⚠ {conflictMessage}</div>}

      <form id="diligencia-form" className="diligencia-form" onSubmit={handleSubmit}>
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

        <FormSection titulo="Contratante e contato">
          <ContratanteSection
            values={{
              contratante: values.contratante,
              advogadoSolicitante: values.advogadoSolicitante ?? '',
              telefone: values.telefone ?? '',
              whatsapp: values.whatsapp ?? '',
              email: values.email ?? '',
            }}
          />
        </FormSection>

        <FormSection titulo="Processo">
          <ProcessoSection
            values={{
              processo: values.processo ?? '',
              tribunal: values.tribunal ?? '',
              vara: values.vara ?? '',
              comarca: values.comarca,
              endereco: values.endereco ?? '',
            }}
          />
        </FormSection>

        <FormSection titulo="Agendamento">
          <AgendamentoSection values={{ data: values.data, hora: values.hora }} />
        </FormSection>

        <FormSection titulo="Financeiro">
          <FinanceiroSection
            values={{
              valorContratado: values.valorContratado,
              valorRecebido: values.valorRecebido,
            }}
          />
        </FormSection>

        <FormSection titulo="Observações">
          <ObservacoesSection values={{ observacoes: values.observacoes ?? '' }} />
        </FormSection>

      </form>
      <div className="diligencia-form-panel__actions">
        <button type="button" className="diligencia-secondary-button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" form="diligencia-form" className="diligencia-primary-button">
          Salvar diligência
        </button>
      </div>
    </section>
  );
}
