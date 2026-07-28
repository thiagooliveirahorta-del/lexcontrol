import {
  Bell,
  BrainCircuit,
  CirclePlus,
  Search,
  UserCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="lex-header">

      <div className="flex items-center gap-4 w-full">

        <div className="relative flex-1 max-w-xl">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Pesquisar diligências, processos, contratantes..."
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-11
              pr-4
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
            "
          />

        </div>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => navigate("/diligencias")}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-blue-700
            px-5
            py-3
            text-white
            transition
            hover:bg-blue-800
          "
        >
          <CirclePlus size={18} />
          Nova diligência
        </button>

        <button className="rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-100 transition">
          <BrainCircuit size={20} />
        </button>

        <button className="rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-100 transition">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2">

          <UserCircle2
            size={38}
            className="text-slate-700"
          />

          <div>

            <strong className="block text-sm">
              Thiago Horta
            </strong>

            <small className="text-slate-500">
              Advogado
            </small>

          </div>

        </div>

      </div>

    </header>
  );
}