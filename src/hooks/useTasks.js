import { useState, useEffect } from 'react';

// Clave única para guardar los datos en el navegador
const STORAGE_KEY = 'avaluauto_tasks_v1';

export const useTasks = () => {
  // 1. Estado para almacenar las tareas
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error al cargar datos de localStorage', e);
      }
    }
    // Tarea de ejemplo inicial
    return [
      {
        id: '1',
        title: 'Prueba Técnica AvalUAuto',
        description: 'Construir el To-Do Dashboard responsive en React y Tailwind CSS',
        dueDate: '2026-10-30',
        priority: 'alta',
        status: 'en proceso',
        createdAt: new Date().toISOString()
      }
    ];
  });

  // Estados para Filtros y Búsqueda
  const [filterStatus, setFilterStatus] = useState('todas');
  const [filterPriority, setFilterPriority] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Persistencia automática en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // 3. Funciones de manipulación (CRUD)
  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    setTasks((prev) => [taskWithId, ...prev]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const newStatus = task.status === 'completada' ? 'pendiente' : 'completada';
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  // 4. Lógica de Filtrado y Tareas Vencidas
  const todayStr = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter((task) => {
    const isExpired = task.dueDate < todayStr && task.status !== 'completada';
    const effectiveStatus = isExpired ? 'vencida' : task.status;

    if (filterStatus !== 'todas') {
      if (filterStatus === 'vencida' && !isExpired) return false;
      if (filterStatus !== 'vencida' && effectiveStatus !== filterStatus) return false;
    }

    if (filterPriority !== 'todas' && task.priority !== filterPriority) {
      return false;
    }

    if (searchTerm.trim() !== '') {
      const matchTitle = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDesc = task.description.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchTitle && !matchDesc) return false;
    }

    return true;
  });

  // 5. Métricas Dinámicas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completada').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pendiente' || t.status === 'en proceso').length;
  const expiredTasks = tasks.filter((t) => t.dueDate < todayStr && t.status !== 'completada').length;
  
  const progressPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return {
    tasks: filteredTasks,
    metrics: {
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      expired: expiredTasks,
      progress: progressPercentage
    },
    filters: {
      status: filterStatus,
      setStatus: setFilterStatus,
      priority: filterPriority,
      setPriority: setFilterPriority,
      search: searchTerm,
      setSearch: setSearchTerm
    },
    actions: {
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus
    }
  };
};