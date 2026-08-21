# Implementation Plan: Gestión de gastos personales

**Branch**: `001-gestion-gastos` | **Date**: 2026-08-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-gestion-gastos/spec.md`

## Summary

App móvil de gastos personales con cuatro pantallas (listado, detalle, alta y
resumen por categoría) sobre Expo + expo-router. Toda la lectura y escritura de
datos pasa por una única capa `services/`, que expone funciones `async` con
latencia simulada y guarda en AsyncStorage; los mocks solo siembran datos de
ejemplo en el primer arranque. Esa capa es la costura que un backend real
reemplazaría sin tocar ninguna pantalla.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict), React 19.1, React Native 0.81.5

**Primary Dependencies**: Expo SDK 54, expo-router 6, `@react-native-async-storage/async-storage` (única dependencia a instalar; ya está nombrada en la constitución)

**Storage**: AsyncStorage local, una sola clave con el arreglo de gastos serializado

**Testing**: sin suite automatizada. La compuerta de calidad es la prueba manual en Expo Go, según la constitución. `npm run lint` como chequeo estático.

**Target Platform**: Android e iOS vía Expo Go

**Project Type**: mobile-app (proyecto único, sin backend)

**Performance Goals**: navegación e interacciones fluidas a 60 fps; volumen esperado de decenas a pocos cientos de gastos, sin paginación

**Constraints**: funciona 100% offline; toda lectura de datos atraviesa una latencia simulada de 500–1000 ms, así que los estados de carga son visibles siempre, no solo en el borde

**Scale/Scope**: 4 pantallas, 6 categorías fijas, 1 usuario, sin cuentas

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Gate | Estado inicial | Post-diseño |
|---|---|---|---|
| I. Desarrollo Guiado por Especificación | Todo lo planificado traza a un FR de la spec; nada de alcance extra | PASS | PASS |
| II. Capa de Datos Aislada | Ninguna pantalla importa mocks ni AsyncStorage; todo pasa por `services/`, `async`, con `setTimeout` de 500–1000 ms | PASS | PASS |
| III. Tres Estados en Toda Pantalla | Listado, detalle y resumen manejan carga, vacío y error | PASS | PASS |
| IV. Stack Fijo y Tipado | Solo Expo + expo-router + TS + AsyncStorage; componentes funcionales con hooks; tipos en `types/` | PASS | PASS |
| V. Español y Código Explicable | Textos y comentarios en español; sin abstracciones que no se puedan explicar | PASS | PASS |

**Notas sobre el gate IV (stack cerrado)**

- `@react-native-async-storage/async-storage` **no** requiere enmienda: la
  constitución ya lo nombra como el mecanismo de persistencia del proyecto.
  Instalarlo es cumplir el principio, no ampliarlo.
- Se **descartó** agregar un selector de fecha nativo
  (`@react-native-community/datetimepicker`). Es una dependencia no nombrada en
  la constitución, así que habría exigido una enmienda antes de usarse. La fecha
  se resuelve con un campo de texto validado. Ver
  [research.md](./research.md#decisión-3-entrada-de-fecha-sin-dependencia-nueva).

**Sin violaciones que justificar** → la sección Complexity Tracking se omite.

## Project Structure

### Documentation (this feature)

```text
specs/001-gestion-gastos/
├── plan.md              # Este archivo
├── spec.md              # Especificación de la feature
├── research.md          # Fase 0: decisiones técnicas
├── data-model.md        # Fase 1: entidades y validaciones
├── quickstart.md        # Fase 1: guía de verificación manual
├── contracts/
│   └── services.md      # Fase 1: contrato de la capa de datos
├── checklists/
│   └── requirements.md  # Checklist de calidad de la spec
└── tasks.md             # Fase 2: lo genera /speckit-tasks, no este comando
```

### Source Code (repository root)

```text
app/
├── _layout.tsx               # Stack raíz: tabs + pantalla de detalle
├── (tabs)/
│   ├── _layout.tsx           # Tabs: Gastos | Nuevo | Resumen
│   ├── index.tsx             # US1 — listado de gastos
│   ├── nuevo.tsx             # US2 — alta de gasto
│   └── resumen.tsx           # US5 — resumen por categoría
└── gasto/
    └── [id].tsx              # US3 — detalle, y US4 — borrado con confirmación

components/
├── tarjeta-gasto.tsx         # Fila del listado: monto, categoría, fecha
├── campo-texto.tsx           # Input con etiqueta y mensaje de error
├── selector-categoria.tsx    # Elección entre las 6 categorías fijas
├── estado-carga.tsx          # Indicador de carga reutilizable
├── estado-vacio.tsx          # Mensaje de vacío reutilizable
└── estado-error.tsx          # Mensaje de error con acción de reintentar

services/
├── gastos-service.ts         # API de datos: la única costura hacia el backend futuro
├── almacenamiento.ts         # Lectura/escritura en AsyncStorage (detalle interno)
└── mocks-gastos.ts           # Semilla de gastos de ejemplo del primer arranque

types/
└── gasto.ts                  # Gasto, Categoria, CATEGORIAS, ResumenCategoria

hooks/
└── use-gastos.ts             # Carga con estados carga/vacío/error y refresco al enfocar

utils/
├── fecha.ts                  # Conversión ISO ↔ dd/mm/aaaa y validación de fecha
└── validacion-gasto.ts       # Reglas y mensajes de validación del formulario
```

**Structure Decision**: proyecto único de app móvil, con la estructura que fija
la constitución (`app/`, `components/`, `services/`, `types/`). Se reutiliza el
`hooks/` que ya trae el starter para el hook de carga. Se agrega `utils/` para
dos ayudantes que no son ni datos ni interfaz: la conversión de fechas y las
reglas de validación del formulario. Van afuera de `services/` a propósito,
porque esa carpeta es la capa de datos y debe poder reemplazarse entera cuando
llegue un backend, sin arrastrar lógica de presentación. Las carpetas
`constants/` y los componentes de tema del starter se mantienen porque el
layout de Expo depende de ellos; las rutas de demostración del starter
(`explore.tsx`, `modal.tsx`) se reemplazan, ya que FR-020 fija exactamente
cuatro pantallas navegables y una pestaña "Explore" contradice ese requisito.

## Phase 0 — Research

Resuelto en [research.md](./research.md). Cinco decisiones tomadas:

1. Convivencia de mocks y AsyncStorage (siembra única en el primer arranque).
2. Sincronización entre pantallas sin store global (refresco al enfocar).
3. Entrada de fecha sin dependencia nueva (texto validado `dd/mm/aaaa`).
4. Representación del monto (entero de centavos vs. decimal).
5. Confirmación de borrado con el `Alert` nativo.

No quedaron NEEDS CLARIFICATION abiertos.

## Phase 1 — Design & Contracts

- [data-model.md](./data-model.md) — entidades `Gasto`, `Categoria` y
  `ResumenCategoria`, con las reglas de validación derivadas de FR-009 a FR-012
  y el criterio de orden estable de la spec.
- [contracts/services.md](./contracts/services.md) — firma y comportamiento de
  las cinco funciones de `services/gastos-service.ts`. Es el contrato que
  sobrevive a la llegada de un backend real.
- [quickstart.md](./quickstart.md) — guion de verificación manual en Expo Go,
  con el recorrido que cubre los nueve criterios de éxito de la spec.

## Trazabilidad: requisitos → diseño

| Requisitos | Dónde se resuelven |
|---|---|
| FR-001 a FR-004 | `app/(tabs)/index.tsx` + `components/tarjeta-gasto.tsx` + `obtenerGastos()` |
| FR-005, FR-006 | `app/gasto/[id].tsx` + `obtenerGastoPorId()` |
| FR-007 a FR-013 | `app/(tabs)/nuevo.tsx` + `components/campo-texto.tsx` + `selector-categoria.tsx` + `crearGasto()` |
| FR-014, FR-015 | `app/gasto/[id].tsx` con `Alert` de confirmación + `borrarGasto()` |
| FR-016, FR-017 | `app/(tabs)/resumen.tsx` + `obtenerResumenPorCategoria()` |
| FR-018 | Refresco al enfocar en `hooks/use-gastos.ts` |
| FR-019 | `estado-carga.tsx`, `estado-vacio.tsx`, `estado-error.tsx` |
| FR-020 | `app/_layout.tsx` + `app/(tabs)/_layout.tsx` |
| FR-021 | `types/gasto.ts`: sin campo de moneda; formateo fijo en pesos |
| FR-022 | `services/almacenamiento.ts` sobre AsyncStorage |
