import { useMemo, useState } from 'react';
import { DiligenciaCard } from '../components/DiligenciaCard';
import { DiligenciasToolbar } from '../components/DiligenciasToolbar';
import { EmptyDiligencias } from '../components/EmptyDiligencias';
import { mockDiligencias } from '../data/mockDiligencias';
import '../diligencias.css';

export function DiligenciasPage() {
  const [search, setSearch] = useState('');
  const diligencias = mockDiligencias;

  const filteredDiligencias = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return diligencias;

    return diligencias.filter((diligencia) => {
      const searchable = [
        diligencia.numeroInterno,
        diligencia.tipo,
        diligencia.status,
        diligencia.prioridade,
        diligencia.contratante,
        diligencia.advogadoSolicitante,
        diligencia.processo,
        diligencia.tribunal,
        diligencia.vara,
        diligencia.comarca,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchable.includes(term);
    });
  }, [diligencias, search]);

  function handleCreate() {
    alert('Milestone 4.2: aqui abriremos o formulário profissional de nova diligência.');
  }

  return (
    <main className="diligencias-page">
      <DiligenciasToolbar search={search} onSearchChange={setSearch} onCreate={handleCreate} />

      {filteredDiligencias.length === 0 ? (
        <EmptyDiligencias onCreate={handleCreate} />
      ) : (
        <section className="diligencias-grid">
          {filteredDiligencias.map((diligencia) => (
            <DiligenciaCard key={diligencia.id} diligencia={diligencia} />
          ))}
        </section>
      )}
    </main>
  );
}
