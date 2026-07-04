import type { ReactNode } from 'react'
import {
  Bell,
  CalendarDays,
  FileText,
  LayoutDashboard,
  Scale,
  Search,
  Settings,
  Users,
  Wallet,
  BriefcaseBusiness,
  Gavel,
} from 'lucide-react'
import { Button } from '../components/Button'
import type { AppRoute } from '../types/navigation'

type MainLayoutProps = {
  children: ReactNode
  activeRoute: AppRoute
  onNavigate: (route: AppRoute) => void
}

const menu = [
  { route: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { route: 'diligencias', label: 'Diligências', icon: BriefcaseBusiness },
  { route: 'agenda', label: 'Agenda', icon: CalendarDays },
  { route: 'contratantes', label: 'Contratantes', icon: Users },
  { route: 'financeiro', label: 'Financeiro', icon: Wallet },
  { route: 'processos', label: 'Processos', icon: Scale },
  { route: 'relatorios', label: 'Relatórios', icon: FileText },
  { route: 'configuracoes', label: 'Configurações', icon: Settings },
] as const

const pageTitles: Record<AppRoute, string> = {
  dashboard: 'Dashboard',
  diligencias: 'Diligências',
  agenda: 'Agenda',
  contratantes: 'Contratantes',
  financeiro: 'Financeiro',
  processos: 'Processos',
  relatorios: 'Relatórios',
  configuracoes: 'Configurações',
}

export function MainLayout({ children, activeRoute, onNavigate }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Gavel size={24} /></div>
          <div>
            <strong>LexControl</strong>
            <span>Diligências Jurídicas</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menu.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.route}
                type="button"
                className={activeRoute === item.route ? 'active' : ''}
                onClick={() => onNavigate(item.route)}
              >
                <Icon size={18} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <span>Fase 1 · Sprint 01</span>
          <small>Arquitetura React</small>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <h1>{pageTitles[activeRoute]}</h1>
            <p>Gestão jurídica inteligente para diligências, agenda e financeiro.</p>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <Search size={16} />
              <input placeholder="Pesquisar..." />
            </div>
            <button className="icon-button" aria-label="Notificações"><Bell size={18} /></button>
            <Button onClick={() => onNavigate('diligencias')}>Nova diligência</Button>
          </div>
        </header>

        {children}
      </main>
    </div>
  )
}
