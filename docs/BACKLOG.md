# TrackTrash — Backlog del panel web (frontend)

> Estado y pendientes del frontend del panel municipal.
> Rama de trabajo: `feat/dashboard-panel` · Actualizado: 2026-10-12

## Estado actual

El frontend es **una sola vista** (`/`) con el Panel general (sidebar, topbar, KPIs,
gráfico de tendencia, mini-mapa y tabla de alertas). Todo con datos mock
(`src/lib/mock-data.ts`), navegación por estado local (`useState`), dark mode no
persistente y sin integración con backend.

## Cómo leer este backlog

Bloques **A–H**. Al final hay un **orden sugerido** que conviene respetar para no
reescribir trabajo.

---

## A. Rutas y layout

- [ ] Crear rutas reales: `/panel`, `/mapa`, `/alertas`, `/incidencias`, `/contenedores`, `/rutas`, `/recicladores`, `/reportes`, `/configuracion`.
- [ ] Route group `(dashboard)` con sidebar + topbar como layout compartido (fuera de cada página).
- [ ] Derivar el ítem activo del nav desde la URL (no `useState`).
- [ ] `not-found.tsx`, `error.tsx`, `loading.tsx`.
- [ ] Breadcrumbs derivados de la ruta.

## B. Autenticación, roles y multi-tenant

- [ ] Pantalla `/login` con layout sin sidebar.
- [ ] Sesión con JWT en **cookie httpOnly** + guard en el servidor (middleware). Logout.
- [ ] RBAC: `vecino / reciclador / personal_municipal / institucion / admin`.
- [ ] Selector de municipalidad/distrito ligado a la sesión (hoy es decorativo).
- [ ] Redirección por rol.

## C. Capa de datos

- [ ] Tipos TS del contrato de API (.NET).
- [ ] Cliente HTTP centralizado (base URL, auth, manejo de errores).
- [ ] MSW con mocks por distrito (permite desarrollar sin backend).
- [ ] Estados `loading / empty / error / retry` (Skeleton, EmptyState).
- [ ] TanStack Query (o RSC) para cache/refetch.
- [ ] Nivel de contenedores casi en tiempo real (polling o SSE/SignalR).

## D. Design system y componentes

- [x] **Decidir estrategia de estilos** → Tailwind v4 como capa de utilidades + tokens de marca. _(en curso)_
- [x] Tokens de diseño como única fuente (color, radios, espaciado) expuestos a Tailwind (`src/app/tokens.css` + `@theme inline`).
- [x] Componentes base en `src/components/ui/`: **StatusChip** (badge, tonos ok/warning/critical/info), **Card** (title/subtitle/actions), **Skeleton** (`animate-pulse`), **Input** (label/error/hint/icon), **Select** (nativo estilizado), **Checkbox**, **Table** (genérica tipada, orden client-side + estado vacío), **Pagination**, **EmptyState**, **Modal/Dialog** (Esc + backdrop) y **Tabs** (controladas, teclado). Vista previa en `/design-system`.
- [ ] Componentes base pendientes: **Drawer**, **Tooltip**, **Toast**, **Dropdown menu**, **DatePicker**.
- [ ] Migrar el CSS del panel para consumir los tokens (eliminar variables duplicadas).

## E. Pantallas / funcionalidad

- [ ] **Mapa** real (Leaflet/MapLibre + OSM): clusters, popups, posición de camión, filtro por distrito. Reemplaza el `MiniMap` decorativo.
- [ ] **Alertas**: lista completa, filtros, orden por criticidad, acción "atender".
- [ ] **Incidencias**: tabla + kanban (abrir/asignar/resolver), detalle, adjuntar foto.
- [ ] **Contenedores**: detalle, historial de nivel (chart), dispositivo IoT, batería/último contacto, alta/edición.
- [ ] **Rutas y camiones**: mapa de rutas, horarios, posición, sugerencia por saturación.
- [ ] **Recicladores**: directorio, materiales que aceptan, entregas, confirmar entrega con código.
- [ ] **Reportes**: indicadores por distrito + exportar CSV/PDF (el botón hoy no hace nada).
- [ ] **Configuración**: perfil, preferencias de notificación, tema.
- [ ] **Notificaciones**: bandeja in-app con historial y estado de lectura (el popover hoy es estático).

## F. Transversal

- [ ] Dark mode persistente (`next-themes` + `prefers-color-scheme`).
- [ ] Responsive: quitar `min-width: 1180px`; adaptar tablet/móvil con nav colapsable.
- [ ] Accesibilidad AA: foco, ARIA, contraste, teclado, labels.
- [ ] Locale `es-PE` (fechas, números, teléfono).
- [ ] Performance: lazy-load del mapa.
- [ ] Error boundary global.

## G. Calidad / tooling

- [ ] Tests: Vitest + React Testing Library (componentes/hooks).
- [ ] E2E con Playwright (login, ver alertas, atender incidencia).
- [ ] CI en GitHub Actions: lint + typecheck + build + tests por PR.
- [ ] Prettier + Husky + lint-staged (pre-commit) + commitlint.

## H. Documentación

- [ ] README real (setup, scripts, arquitectura, convenciones).
- [ ] `.env.example`.
- [ ] Documentar el contrato de API.

---

## Orden sugerido

1. **D** — tokens + componentes base (todo lo demás los consume).
2. **C** — capa de datos + MSW (dejar de depender del backend).
3. **A + B** — rutas + auth/roles.
4. **E** — pantallas, empezando por **Mapa** y **Alertas**.
5. **F** y **G** en paralelo, en cuanto haya superficie que testear.
