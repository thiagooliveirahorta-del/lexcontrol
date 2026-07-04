import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { AgendaPage } from '../../features/agenda/AgendaPage';
import { ConfiguracoesPage } from '../../features/configuracoes/ConfiguracoesPage';
import { ContratantesPage } from '../../features/contratantes/ContratantesPage';
import { CommandCenterPage } from '../../features/command-center/CommandCenterPage';
import { DiligenciasPage } from '../../features/diligencias/DiligenciasPage';
import { FinanceiroPage } from '../../features/financeiro/FinanceiroPage';
import { ProcessosPage } from '../../features/processos/ProcessosPage';
import { RelatoriosPage } from '../../features/relatorios/RelatoriosPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<CommandCenterPage />} />
        <Route path="diligencias" element={<DiligenciasPage />} />
        <Route path="agenda" element={<AgendaPage />} />
        <Route path="contratantes" element={<ContratantesPage />} />
        <Route path="financeiro" element={<FinanceiroPage />} />
        <Route path="processos" element={<ProcessosPage />} />
        <Route path="relatorios" element={<RelatoriosPage />} />
        <Route path="configuracoes" element={<ConfiguracoesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
