---

description: "Task list for feature implementation"
---

# Tasks: Gestión de gastos personales

**Input**: Design documents from `/specs/001-gestion-gastos/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/services.md, quickstart.md

**Tests**: **No se generan tareas de test automatizado.** Ni la spec ni la
constitución los piden: la compuerta de calidad de este proyecto es la prueba
manual en Expo Go, guiada por [quickstart.md](./quickstart.md).

**Organization**: las tareas se agrupan por historia de usuario, para que cada
una se pueda implementar y probar por separado.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: puede hacerse en paralelo (archivos distintos, sin dependencias)
- **[Story]**: a qué historia pertenece (US1, US2, US3, US4, US5)
- Cada tarea indica la ruta exacta del archivo

## Path Conventions

Proyecto único de app móvil. Rutas relativas a la raíz del repositorio, según la
estructura fijada en la constitución: `app/`, `components/`, `services/`,
`types/`, más `hooks/` y `utils/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: dejar el proyecto listo, con la dependencia que falta y sin los
restos del starter de Expo.

- [x] T001 Instalar `@react-native-async-storage/async-storage` con `npx expo install` y verificar que quede registrada en `package.json`
- [x] T002 Quitar las rutas y componentes de demostración del starter: borrar `app/(tabs)/explore.tsx`, `app/modal.tsx`, `components/hello-wave.tsx` y `components/parallax-scroll-view.tsx`, y limpiar sus referencias en `app/(tabs)/_layout.tsx` y `app/_layout.tsx`

**Checkpoint**: la app sigue levantando en Expo Go, con una sola pestaña vacía.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: los tipos, la capa de datos y la navegación que todas las historias
necesitan.

**⚠️ CRÍTICO**: ninguna historia de usuario puede empezar hasta terminar esta fase.

- [x] T003 [P] Definir `Gasto`, `Categoria`, la constante `CATEGORIAS` y `ResumenCategoria` en `types/gasto.ts`, según [data-model.md](./data-model.md)
- [x] T004 [P] Escribir las funciones de conversión y formato de fecha (ISO `AAAA-MM-DD` ↔ `dd/mm/aaaa`, y validación de fecha existente) en `utils/fecha.ts`
- [x] T005 Crear la semilla de 5 a 8 gastos de ejemplo en `services/mocks-gastos.ts`, cubriendo al menos cuatro categorías y con al menos dos gastos compartiendo fecha
- [x] T006 Implementar la lectura y escritura en AsyncStorage sobre la clave `gastos-app:gastos` en `services/almacenamiento.ts`, incluyendo la siembra en el primer arranque y el tratamiento del JSON corrupto como error de lectura
- [x] T007 Implementar las cinco funciones de `services/gastos-service.ts` (`obtenerGastos`, `obtenerGastoPorId`, `crearGasto`, `borrarGasto`, `obtenerResumenPorCategoria`) con latencia simulada de 500–1000 ms, según [contracts/services.md](./contracts/services.md) (depende de T003, T005, T006)
- [x] T008 [P] Crear los tres componentes de estado reutilizables: `components/estado-carga.tsx`, `components/estado-vacio.tsx` y `components/estado-error.tsx` (este último con acción de reintentar)
- [x] T009 Crear el hook de carga con estados carga/vacío/error y refresco al ganar foco en `hooks/use-gastos.ts` (depende de T007)
- [x] T010 Armar la navegación de las cuatro pantallas en `app/_layout.tsx` (stack raíz con el detalle) y `app/(tabs)/_layout.tsx` (pestañas Gastos, Nuevo, Resumen), con las pantallas aún vacías

**Checkpoint**: se navega entre las cuatro pantallas y la capa de datos responde,
aunque las pantallas todavía no muestren nada.

---

## Phase 3: User Story 1 - Ver el listado de gastos (Priority: P1) 🎯 MVP

**Goal**: la persona abre la app y ve sus gastos ordenados del más reciente al
más viejo, con monto, categoría y fecha.

**Independent Test**: abrir la app con la semilla cargada y verificar que se ve
el indicador de carga, después el listado ordenado; y que borrando la clave de
almacenamiento se ve el estado vacío.

- [x] T011 [US1] Crear la fila del listado con monto, categoría y fecha en `components/tarjeta-gasto.tsx` (depende de T003, T004)
- [x] T012 [US1] Implementar la pantalla de listado en `app/(tabs)/index.tsx`, con los tres estados y navegación al detalle al tocar una fila (depende de T009, T011)

**Checkpoint**: US1 funciona sola. Es el MVP: ya hay algo demostrable.

---

## Phase 4: User Story 2 - Cargar un gasto nuevo (Priority: P2)

**Goal**: registrar un gasto con un formulario que valida antes de guardar y no
pierde lo ya cargado.

**Independent Test**: completar el formulario con datos válidos y ver el gasto
aparecer en el listado; y probar cada regla de validación verificando que bloquea
el guardado con un mensaje junto al campo.

- [x] T013 [P] [US2] Crear el input con etiqueta y mensaje de error en `components/campo-texto.tsx`
- [ ] T014 [P] [US2] Crear el selector de las seis categorías fijas en `components/selector-categoria.tsx` (depende de T003)
- [ ] T015 [US2] Escribir las reglas de validación del formulario (monto, categoría y fecha) con sus mensajes en español en `utils/validacion-gasto.ts`, según la tabla de [data-model.md](./data-model.md) (depende de T004)
- [ ] T016 [US2] Implementar la pantalla de alta en `app/(tabs)/nuevo.tsx`: fecha precargada con hoy, validación al guardar, conservación de los campos válidos al fallar, y vuelta al listado tras guardar (depende de T007, T013, T014, T015)

**Checkpoint**: US1 y US2 funcionan por separado. La app ya sirve para uso real.

---

## Phase 5: User Story 3 - Ver el detalle de un gasto (Priority: P3)

**Goal**: ver todos los datos de un gasto en su propia pantalla, incluida la
descripción.

**Independent Test**: tocar un gasto del listado y verificar que se ven monto,
categoría, fecha y descripción, y que se puede volver sin alterar nada.

- [ ] T017 [US3] Implementar la pantalla de detalle en `app/gasto/[id].tsx`, con los tres estados, el caso de descripción vacía y el mensaje claro cuando el `id` no existe (depende de T007, T008)

**Checkpoint**: US1, US2 y US3 funcionan por separado.

---

## Phase 6: User Story 4 - Borrar un gasto (Priority: P4)

**Goal**: eliminar un gasto, siempre con confirmación previa.

**Independent Test**: pedir borrar desde el detalle y probar los dos caminos:
cancelar no borra nada, confirmar elimina el gasto del listado.

- [ ] T018 [US4] Agregar la acción de borrado con confirmación mediante `Alert` nativo (cancelar y borrar destructivo) en `app/gasto/[id].tsx`, volviendo al listado tras confirmar (depende de T017)

**Checkpoint**: el ciclo completo de un gasto —alta, consulta y borrado— está cerrado.

---

## Phase 7: User Story 5 - Ver el resumen por categoría (Priority: P5)

**Goal**: ver cuánto se gastó en cada categoría, sin sumar a mano.

**Independent Test**: abrir el resumen con datos conocidos y comparar cada total
con la suma manual de los gastos de esa categoría.

- [ ] T019 [US5] Implementar la pantalla de resumen en `app/(tabs)/resumen.tsx`, con los tres estados, solo categorías con gastos y sin fila de total general (depende de T007, T008, T009)

**Checkpoint**: las cinco historias funcionan por separado.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: cierre de calidad sobre todo lo construido.

- [ ] T020 Revisar que todos los textos visibles y los comentarios estén en español y que los comentarios sean breves y solo donde aporten, recorriendo `app/`, `components/`, `services/`, `types/`, `hooks/` y `utils/`
- [ ] T021 Ejecutar `npm run lint` y corregir lo que aparezca
- [ ] T022 Recorrer completo el guion de [quickstart.md](./quickstart.md) en Expo Go y registrar el resultado de los trece bloques

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Fase 1)**: sin dependencias, arranca de una.
- **Foundational (Fase 2)**: depende de la Fase 1. **Bloquea todas las historias.**
- **Historias (Fases 3 a 7)**: todas dependen de la Fase 2 completa.
- **Polish (Fase 8)**: depende de las historias que se quieran incluir.

### User Story Dependencies

- **US1 (P1)**: solo depende de la Fase 2. Sin dependencias con otras historias.
- **US2 (P2)**: solo depende de la Fase 2. Se verifica mejor con US1 lista, pero no la necesita.
- **US3 (P3)**: solo depende de la Fase 2. Se llega por navegación directa aunque US1 no esté.
- **US4 (P4)**: **depende de US3**, porque el borrado vive en la pantalla de detalle. Es la única dependencia real entre historias.
- **US5 (P5)**: solo depende de la Fase 2.

### Parallel Opportunities

- T003 y T004 en paralelo: tipos y utilidades de fecha, archivos distintos.
- T008 en paralelo con T005, T006 y T007: los componentes de estado no tocan la capa de datos.
- T013 y T014 en paralelo: dos componentes independientes.
- Terminada la Fase 2, US1, US2, US3 y US5 podrían encararse en paralelo.

**Aclaración sobre `[P]` en este proyecto**: la marca indica que los archivos no
se pisan. **No** es una invitación a trabajar en paralelo: la constitución fija
una tarea por vez, en orden, con un commit por tarea y confirmación en Expo Go
antes de pasar a la siguiente. Acá `[P]` sirve para saber que reordenar esas
tareas entre sí no rompe nada.

---

## Implementation Strategy

### MVP primero (solo US1)

1. Fase 1: Setup (T001–T002)
2. Fase 2: Foundational (T003–T010) — bloquea todo lo demás
3. Fase 3: US1 (T011–T012)
4. **Parar y validar**: probar el listado en Expo Go
5. Ya hay algo demostrable

### Entrega incremental

1. Setup + Foundational → base lista
2. US1 → listado funcionando (**MVP**)
3. US2 → la app sirve para uso real
4. US3 → consulta completa
5. US4 → ciclo del gasto cerrado
6. US5 → la vista que interpreta los datos
7. Fase 8 → cierre de calidad

Cada historia agrega valor sin romper las anteriores.

---

## Notes

- **Un commit por tarea**, con el formato `feat: T## - descripción corta` (o
  `fix:`, `refactor:`, `docs:`, `chore:`), en español e imperativo.
- **Ninguna tarea se da por terminada** hasta probarla en el teléfono con Expo Go
  y confirmarlo.
- **Después de cada tarea** se agrega su entrada a `PROCESO.md`, dejando señalada
  la parte de "qué corregí a mano".
- Las pantallas nunca importan `services/almacenamiento.ts` ni `services/mocks-gastos.ts`:
  todo dato entra por `services/gastos-service.ts` (constitución, principio II).
- Toda pantalla que consulte datos maneja carga, vacío y error (principio III).
