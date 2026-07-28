import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  FolderKanban,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  Scale,
} from "lucide-react";

import { NavLink } from "react-router-dom";

type MenuItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

const menu: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Agenda",
    path: "/agenda",
    icon: CalendarDays,
  },
  {
    label: "Diligências",
    path: "/diligencias",
    icon: ClipboardList,
  },
  {
    label: "Processos",
    path: "/processos",
    icon: FolderKanban,
  },
  {
    label: "Contratantes",
    path: "/contratantes",
    icon: Users,
  },
  {
    label: "Financeiro",
    path: "/financeiro",
    icon: DollarSign,
  },
  {
    label: "Relatórios",
    path: "/relatorios",
    icon: BarChart3,
  },
  {
    label: "Configurações",
    path: "/configuracoes",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="lex-sidebar">

      <div className="lex-sidebar-logo">

        <Scale
          size={34}
          color="#D4AF37"
        />

        <div>

          <strong>LEX</strong>

          <span
            style={{
              color: "#60A5FA",
            }}
          >
            Control
          </span>

        </div>

      </div>

      <nav className="lex-sidebar-nav">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "lex-menu-item active"
                  : "lex-menu-item"
              }
            >

              <Icon size={20} />

              <span>
                {item.label}
              </span>

            </NavLink>
          );

        })}

      </nav>

      <div className="lex-sidebar-footer">

        <small
          style={{
            color: "#CBD5E1",
            display: "block",
            fontWeight: 600,
          }}
        >
          LexControl
        </small>

        <small
          style={{
            color: "#94A3B8",
          }}
        >
          Sprint 6
        </small>

      </div>

    </aside>
  );
}