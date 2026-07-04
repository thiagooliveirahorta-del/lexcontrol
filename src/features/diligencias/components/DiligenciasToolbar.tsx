import { Plus, Search } from 'lucide-react';
import '../diligencias.css';

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  onCreate?: () => void;
};

export function DiligenciasToolbar({ search, onSearchChange, onCreate }: Props) {
  return (
    <div className="diligencias-toolbar">
      <div>
        <h2>Diligências</h2>
        <p>Gerencie o ciclo completo de cada diligência jurídica.</p>
      </div>

      <div className="diligencias-toolbar__actions">
        <label className="diligencias-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por processo, contratante, comarca..."
          />
        </label>

        <button type="button" onClick={onCreate}>
          <Plus size={18} />
          Nova diligência
        </button>
      </div>
    </div>
  );
}
