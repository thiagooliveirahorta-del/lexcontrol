import { CalendarDays, FileText, Gauge, Landmark, LayoutDashboard, Scale, Settings, Users, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menu = [
  { label: 'Central de Comando', path: '/', icon: LayoutDashboard },
  { label: 'Diligências', path: '/diligencias', icon: Scale },
  { label: 'Agenda', path: '/agenda', icon: CalendarDays },
  { label: 'Contratantes', path: '/contratantes', icon: Users },
  { label: 'Financeiro', path: '/financeiro', icon: Wallet },
  { label: 'Processos', path: '/processos', icon: Landmark },
  { label: 'Relatórios', path: '/relatorios', icon: FileText },
  { label: 'Configurações', path: '/configuracoes', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand__mark">LH</div>
        <div>
          <strong>LexControl</strong>
          <span>Thiago Horta</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `sidebar__item ${isActive ? 'is-active' : ''}`}>
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <Gauge size={16} />
        <span>v0.3 — Command Center</span>
      </div>
    </aside>
  );
}
