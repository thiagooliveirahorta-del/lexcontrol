import React from 'react';
import ReactDOM from 'react-dom/client';

import DashboardPage from "./features/dashboard/DashboardPage";

import './styles/global.css';

ReactDOM.createRoot(
  document.getElementById('root')!,
).render(
  <React.StrictMode>
    <DashboardPage />
  </React.StrictMode>,
);