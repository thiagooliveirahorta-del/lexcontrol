import { BriefcaseBusiness } from 'lucide-react';
import '../diligencias.css';

type Props = {
  onCreate?: () => void;
};

export function EmptyDiligencias({ onCreate }: Props) {
  return (
    <section className="empty-diligencias">
      <div className="empty-diligencias__icon">
        <BriefcaseBusiness size={34} />
      </div>
      <h2>Bem-vindo ao módulo de diligências.</h2>
      <p>
        Aqui ficará o coração operacional do LexControl: recebimento, agendamento,
        execução, histórico, financeiro e arquivamento de cada diligência.
      </p>
      <button type="button" onClick={onCreate}>
        Nova diligência
      </button>
    </section>
  );
}
