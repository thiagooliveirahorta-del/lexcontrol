import { useState } from 'react'
import { MainLayout } from './layouts/MainLayout'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { DiligenciasPage } from './features/diligencias/DiligenciasPage'
import { AgendaPage } from './features/agenda/AgendaPage'
import { ContratantesPage } from './features/contratantes/ContratantesPage'
import { FinanceiroPage } from './features/financeiro/FinanceiroPage'
import { ProcessosPage } from './features/processos/ProcessosPage'
import { RelatoriosPage } from './features/relatorios/RelatoriosPage'
import { ConfiguracoesPage } from './features/configuracoes/ConfiguracoesPage'
import type { AppRoute } from './types/navigation'

const pages: Record<AppRoute, JSX.Element> = {
  dashboard: <DashboardPage />,
  diligencias: <DiligenciasPage />,
  agenda: <AgendaPage />,
  contratantes: <ContratantesPage />,
  financeiro: <FinanceiroPage />,
  processos: <ProcessosPage />,
  relatorios: <RelatoriosPage />,
  configuracoes: <ConfiguracoesPage />,
}

function App() {
  const [activeRoute, setActiveRoute] = useState<AppRoute>('dashboard')

  return (
    <MainLayout activeRoute={activeRoute} onNavigate={setActiveRoute}>
      {pages[activeRoute]}
    </MainLayout>
  )
}

export default App
