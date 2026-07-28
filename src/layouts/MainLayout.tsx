import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export default function MainLayout({
  children,
}: Props) {
  return (
    <div className="lex-app">

      <Sidebar />

      <div className="lex-container">

        <Header />

        <main className="lex-main">

          <div className="mx-auto w-full max-w-7xl">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}