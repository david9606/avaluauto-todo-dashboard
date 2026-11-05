import React, { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { Header } from './components/Header';
import { TaskCard } from './components/TaskCard';
import { TaskFormModal } from './components/TaskFormModal';
import { Plus, Search, Filter } from 'lucide-react';

export default function App() {
  // Traemos los datos y funciones desde nuestro Hook de lógica
  const { tasks, metrics, filters, actions } = useTasks();

  // Estados locales para controlar el Modal (Ventana flotante)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Abrir modal para CREAR una nueva tarea
  const handleOpenCreate = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  // Abrir modal para EDITAR una tarea existente
  const handleOpenEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // Guardar datos (Crear o Editar)
  const handleFormSubmit = (formData) => {
    if (taskToEdit) {
      actions.updateTask(taskToEdit.id, formData);
    } else {
      actions.addTask(formData);
    }
  };

  // Eliminar con ventana de confirmación (Modal/Alerta de seguridad)
  const handleDeleteWithConfirm = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      actions.deleteTask(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* 1. Encabezado Fijo con Métricas y Progreso */}
      <Header metrics={metrics} />

      {/* 2. Área Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Barra de Herramientas: Buscador, Filtros y Botón Crear */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Buscador de texto */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar tareas por texto..."
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              value={filters.search}
              onChange={(e) => filters.setSearch(e.target.value)}
            />
          </div>

          {/* Filtros de Estado y Prioridad */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              
              {/* Filtro por Estado */}
              <select
                className="px-3 py-2 border rounded-lg text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.status}
                onChange={(e) => filters.setStatus(e.target.value)}
              >
                <option value="todas">Todos los estados</option>
                <option value="pendiente">Pendientes</option>
                <option value="en proceso">En proceso</option>
                <option value="completada">Completadas</option>
                <option value="vencida">Vencidas</option>
              </select>

              {/* Filtro por Prioridad */}
              <select
                className="px-3 py-2 border rounded-lg text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.priority}
                onChange={(e) => filters.setPriority(e.target.value)}
              >
                <option value="todas">Todas las prioridades</option>
                <option value="alta">Prioridad Alta</option>
                <option value="media">Prioridad Media</option>
                <option value="baja">Prioridad Baja</option>
              </select>
            </div>

            {/* Botón Nueva Tarea */}
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Nueva Tarea
            </button>
          </div>
        </div>

        {/* Grilla de Lista de Tareas */}
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleStatus={actions.toggleTaskStatus}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteWithConfirm}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 font-medium text-sm">No se encontraron tareas con los criterios actuales.</p>
            <p className="text-xs text-slate-400 mt-1">Prueba cambiando los filtros o agregando una nueva tarea.</p>
          </div>
        )}
      </main>

      {/* Ventana Modal del Formulario */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}