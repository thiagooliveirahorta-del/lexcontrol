import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function MainLayout() {
  return (
    <div className="shell">
      <Sidebar />
      <div className="workspace">
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
