import React from 'react';
import { CheckCircle2, ListTodo, AlertTriangle, Clock } from 'lucide-react';

export const Header = ({ metrics }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-400">
              AvaluAuto <span className="text-slate-100 font-normal">| Task Dashboard</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Gestión eficiente de tareas y seguimiento de entregas
            </p>
          </div>

          {/* Barra de Progreso General */}
          <div className="flex items-center gap-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700/50">
            <div className="text-right">
              <p className="text-xs font-medium text-slate-400">Progreso Total</p>
              <p className="text-lg font-bold text-emerald-400">{metrics.progress}%</p>
            </div>
            <div className="w-32 bg-slate-700 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${metrics.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tarjetas Resumen */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40 flex items-center gap-3">
            <ListTodo className="text-blue-400 w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Total</p>
              <p className="text-sm font-semibold text-slate-200">{metrics.total}</p>
            </div>
          </div>
          <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40 flex items-center gap-3">
            <CheckCircle2 className="text-emerald-400 w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Completadas</p>
              <p className="text-sm font-semibold text-slate-200">{metrics.completed}</p>
            </div>
          </div>
          <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40 flex items-center gap-3">
            <Clock className="text-amber-400 w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Pendientes</p>
              <p className="text-sm font-semibold text-slate-200">{metrics.pending}</p>
            </div>
          </div>
          <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40 flex items-center gap-3">
            <AlertTriangle className="text-rose-400 w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Vencidas</p>
              <p className="text-sm font-semibold text-slate-200">{metrics.expired}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};