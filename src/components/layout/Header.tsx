import { Bell, CalendarClock, Search } from 'lucide-react';

export function Header() {
  const today = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="header">
      <div className="header__search">
        <Search size={18} />
        <input placeholder="Pesquisar diligências, processos ou contratantes..." />
      </div>

      <div className="header__actions">
        <div className="header__date">
          <CalendarClock size={17} />
          <span>{today}</span>
        </div>
        <button className="iconButton" aria-label="Notificações">
          <Bell size={18} />
        </button>
        <div className="avatar">TH</div>
      </div>
    </header>
  );
}
