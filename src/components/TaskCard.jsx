import React from 'react';
import { Calendar, Trash2, Edit2, CheckCircle, AlertCircle } from 'lucide-react';

export const TaskCard = ({ task, onToggleStatus, onEdit, onDelete }) => {
  // Comprobamos si la tarea está vencida comparando con la fecha actual
  const todayStr = new Date().toISOString().split('T')[0];
  const isExpired = task.dueDate < todayStr && task.status !== 'completada';

  // Estilos de colores dinámicos según la prioridad
  const priorityColors = {
    baja: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    media: 'bg-amber-100 text-amber-800 border-amber-200',
    alta: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  return (
    <div className={`p-4 rounded-xl border transition-all duration-200 bg-white shadow-sm hover:shadow-md ${
      isExpired ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Botón rápido para marcar como completada / pendiente */}
          <button 
            onClick={() => onToggleStatus(task.id)}
            className="mt-1 text-slate-400 hover:text-emerald-600 transition-colors"
            title="Cambiar estado"
          >
            <CheckCircle className={`w-5 h-5 ${task.status === 'completada' ? 'text-emerald-600 fill-emerald-100' : ''}`} />
          </button>
          
          <div>
            <h3 className={`font-semibold text-slate-800 ${task.status === 'completada' ? 'line-through text-slate-400' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Acciones: Editar y Eliminar */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Editar tarea"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Eliminar tarea"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pie de tarjeta: Prioridad, Estado de Vencimiento y Fecha Límite */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          {/* Badge de Prioridad */}
          <span className={`px-2 py-0.5 rounded-full border font-medium uppercase text-[10px] ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>

          {/* Badge de Vencida (si aplica) */}
          {isExpired && (
            <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-medium text-[10px] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Vencida
            </span>
          )}
        </div>

        {/* Fecha Límite */}
        <div className={`flex items-center gap-1 font-medium ${isExpired ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
          <Calendar className="w-3.5 h-3.5" />
          <span>{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
};