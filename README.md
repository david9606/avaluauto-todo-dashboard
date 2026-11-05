# To-Do Dashboard — AvalUAuto Technical Test

Aplicación web interactiva para la gestión eficiente de tareas (To-Do Dashboard) desarrollada como parte de la prueba técnica para aspirantes al área de desarrollo de AvalUAuto.

---

## 🚀 Funcionalidades Principales

- Gestión de Tareas (CRUD completo): Crear, editar, eliminar y cambiar el estado de las tareas.
- Resumen Dinámico (Dashboard): Métricas en tiempo real sobre total de tareas, completadas, pendientes, vencidas y porcentaje de progreso global.
- Sistema de Filtros y Búsqueda:
  - Filtrado por estado (*Pendiente, En proceso, Completada, Vencida*).
  - Filtrado por prioridad (*Baja, Media, Alta*).
  - Buscador predictivo por texto en título y descripción.
- Detección Automática de Vencimiento: Validación lógica contra la fecha actual que resalta visualmente las tareas vencidas.
- Persistencia de Datos: Almacenamiento local mediante `localStorage` para conservar el estado al recargar la página.
- Diseño Responsive: Interfaz construida bajo el enfoque *Mobile-First* adaptada a dispositivos móviles, tablets y monitores.

---

## 🛠️ Tecnologías Utilizadas

- *Core: React 19 + Vite 8
- Estilos: Tailwind CSS v4
- Iconografía: Lucide React
- Control de Versiones: Git & GitHub

---

## 📦 Instalación y Ejecución Local

1. Clonar el repositorio:
   ```bash
   git clone <LINK_DE_TU_REPOSITORIO>
   cd todo-dashboard