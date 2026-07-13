import { useEffect, useMemo, useState } from 'react';
import { DiligenciaCard } from '../components/DiligenciaCard';
import { DiligenciaForm } from '../components/DiligenciaForm';
import { DiligenciasToolbar } from '../components/DiligenciasToolbar';
import { EmptyDiligencias } from '../components/EmptyDiligencias';
import {
  archiveDiligencia,
  createDiligencia,
  hasScheduleConflict,
  loadDiligencias,
  syncLocalDiligenciasToCloud,
  updateDiligencia,
} from '../services/diligenciasStorage';
import type { Diligencia, DiligenciaFormData } from '../types/diligencia';
import '../diligencias.css';

export function DiligenciasPage() {
  const [search, setSearch] = useState('');
  const [diligencias, setDiligencias] = useState<Diligencia[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Diligencia | null>(null);
  const [conflictMessage, setConflictMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function start() {
      setLoading(true);
      const loaded = await loadDiligencias();
      if (mounted) {
        setDiligencias(loaded);
        setLoading(false);
      }
    }

    start();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredDiligencias = useMemo(() => {
    const term = search.trim().toLowerCase();

    const ordered = [...diligencias]
      .filter((diligencia) => !diligencia.arquivada)
      .sort((a, b) => new Date(`${a.data}T${a.hora}:00`).getTime() - new Date(`${b.data}T${b.hora}:00`).getTime());

    if (!term) return ordered;

    return ordered.filter((diligencia) => {
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
    setEditing(null);
    setConflictMessage(null);
    setShowForm(true);
  }

  function handleEdit(diligencia: Diligencia) {
    setEditing(diligencia);
    setConflictMessage(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(data: DiligenciaFormData) {
    const candidate = { id: editing?.id ?? '', data: data.data, hora: data.hora };
    const conflict = hasScheduleConflict(candidate, diligencias);

    if (conflict) {
      const message = `Possível conflito: ${conflict.tipo} de ${conflict.contratante} no mesmo dia às ${conflict.hora}.`;
      setConflictMessage(message);

      const confirmSave = window.confirm(`${message}\n\nDeseja salvar mesmo assim?`);
      if (!confirmSave) return;
    }

    try {
      setSaving(true);
      if (editing) {
        const saved = await updateDiligencia(editing.id, data, diligencias);
        setDiligencias((current) => current.map((item) => (item.id === saved.id ? saved : item)));
      } else {
        const saved = await createDiligencia(data, diligencias);
        setDiligencias((current) => [...current, saved]);
      }

      setShowForm(false);
      setEditing(null);
      setConflictMessage(null);
    } catch (error) {
      console.error(error);
      alert('Não foi possível salvar na nuvem. Confira a configuração do Supabase.');
    } finally {
      setSaving(false);
    }
  }

  async function handleArchive(id: string) {
    const confirmArchive = window.confirm('Arquivar esta diligência? Ela não será apagada do histórico.');
    if (!confirmArchive) return;

    try {
      const saved = await archiveDiligencia(id, diligencias);
      setDiligencias((current) => current.map((item) => (item.id === saved.id ? saved : item)));
    } catch (error) {
      console.error(error);
      alert('Não foi possível arquivar na nuvem. Confira a configuração do Supabase.');
    }
  }

  async function handleSyncLocal() {
    try {
      const total = await syncLocalDiligenciasToCloud();
      const loaded = await loadDiligencias();
      setDiligencias(loaded);
      setSyncMessage(total ? `${total} diligência(s) sincronizada(s) com a nuvem.` : 'Não há diligências locais para sincronizar.');
    } catch (error) {
      console.error(error);
      setSyncMessage('Não foi possível sincronizar. Confira as variáveis do Supabase.');
    }
  }

  return (
    <main className="diligencias-page">
      <DiligenciasToolbar search={search} onSearchChange={setSearch} onCreate={handleCreate} />

      <section className="diligencias-cloud-panel">
        <div>
          <strong>Cloud Sync</strong>
          <p>Use este botão uma vez para enviar ao Supabase as diligências que estavam salvas apenas neste navegador.</p>
        </div>
        <button type="button" className="diligencia-secondary-button" onClick={handleSyncLocal}>
          Sincronizar dados locais
        </button>
      </section>

      {syncMessage && <div className="diligencia-sync-message">{syncMessage}</div>}
      {saving && <div className="diligencia-sync-message">Salvando diligência...</div>}

      {showForm && (
        <DiligenciaForm
          diligencia={editing}
          conflictMessage={conflictMessage}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
            setConflictMessage(null);
          }}
          onSubmit={handleSubmit}
        />
      )}

      <section className="diligencias-summary">
        <article>
          <span>Total ativo</span>
          <strong>{filteredDiligencias.length}</strong>
        </article>
        <article>
          <span>Hoje</span>
          <strong>{filteredDiligencias.filter((d) => d.data === new Date().toISOString().slice(0, 10)).length}</strong>
        </article>
        <article>
          <span>Urgentes</span>
          <strong>{filteredDiligencias.filter((d) => d.prioridade === 'Urgente').length}</strong>
        </article>
      </section>

      {loading ? (
        <section className="diligencia-form-panel">Carregando diligências...</section>
      ) : filteredDiligencias.length === 0 ? (
        <EmptyDiligencias onCreate={handleCreate} />
      ) : (
        <section className="diligencias-grid">
          {filteredDiligencias.map((diligencia) => (
            <DiligenciaCard
              key={diligencia.id}
              diligencia={diligencia}
              onEdit={handleEdit}
              onArchive={handleArchive}
            />
          ))}
        </section>
      )}
    </main>
  );
}
