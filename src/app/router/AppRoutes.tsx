import { Routes, Route, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '../../features/auth/components/ProtectedRoute';

import { LoginPage } from '../../features/auth/pages/LoginPage';
import { ForgotPasswordPage } from '../../features/auth/pages/ForgotPasswordPage';

import { CommandCenterPage } from '../../features/command-center/CommandCenterPage';

import DashboardPage from "../../features/dashboard/DashboardPage";

import DiligenciasPage from '../../features/diligencias/pages/DiligenciasPage';

import { AgendaPage } from '../../features/agenda/pages/AgendaPage';

import { FinanceiroPage } from '../../features/financeiro/FinanceiroPage';

import { ProcessosPage } from '../../features/processos/ProcessosPage';

import { ContratantesPage } from '../../features/contratantes/ContratantesPage';

import { RelatoriosPage } from '../../features/relatorios/RelatoriosPage';

import { ConfiguracoesPage } from '../../features/configuracoes/ConfiguracoesPage';

import MainLayout from "../../layouts/MainLayout";

export function AppRoutes() {
  return (
    <Routes>

      {/* ========================= */}
      {/* Rotas Públicas            */}
      {/* ========================= */}

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      {/* ========================= */}
      {/* Dashboard                 */}
      {/* ========================= */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* Command Center            */}
      {/* ========================= */}

      <Route
        path="/command-center"
        element={
          <ProtectedRoute>
            <MainLayout>
              <CommandCenterPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* Diligências               */}
      {/* ========================= */}

      <Route
    path="/diligencias"
    element={
        <ProtectedRoute>
            <MainLayout>
                <DiligenciasPage />
            </MainLayout>
        </ProtectedRoute>
    }
/>

      {/* ========================= */}
      {/* Agenda                    */}
      {/* ========================= */}

      <Route
        path="/agenda"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AgendaPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* Financeiro                */}
      {/* ========================= */}

      <Route
        path="/financeiro"
        element={
          <ProtectedRoute>
            <MainLayout>
              <FinanceiroPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* Processos                 */}
      {/* ========================= */}

      <Route
        path="/processos"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProcessosPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* Contratantes              */}
      {/* ========================= */}

      <Route
        path="/contratantes"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ContratantesPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* Relatórios                */}
      {/* ========================= */}

      <Route
        path="/relatorios"
        element={
          <ProtectedRoute>
            <MainLayout>
              <RelatoriosPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* Configurações             */}
      {/* ========================= */}

      <Route
        path="/configuracoes"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ConfiguracoesPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* Página inexistente        */}
      {/* ========================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default AppRoutes;