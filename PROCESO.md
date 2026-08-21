# Proceso de trabajo

Registro de cómo se construyó el gestor de gastos personales. Una entrada por
tarea, en orden cronológico. Cada entrada documenta el prompt usado, qué generó
el asistente, cómo se verificó el resultado y qué se corrigió a mano después.

---

## Constitución del proyecto — v1.0.0

**Fecha:** 2026-08-21
**Commit:** `7e995ec` — `docs: ratificar constitución del proyecto v1.0.0`

### Prompt usado

```
/speckit-constitution
```

Sin argumentos: no se dictaron principios por escrito. La consigna fue que el
comando derivara la constitución del contexto ya existente en el repositorio.

### Qué se generó

`.specify/memory/constitution.md` (130 líneas). El archivo venía de la plantilla
de Spec Kit con todos los placeholders `[ALL_CAPS]` sin completar; se reemplazó
por contenido concreto derivado de `CLAUDE.md` y del estado del repo.

Cinco principios, redactados como reglas verificables (`SE DEBE` / `NO SE DEBE`)
y cada uno con su razón:

| # | Principio | De dónde sale |
|---|---|---|
| I | Desarrollo Guiado por Especificación (NO NEGOCIABLE) | flujo SDD: una tarea por vez, plan antes de código, confirmación en Expo Go |
| II | Capa de Datos Aislada | mocks en `/services`, `async` + `setTimeout` 500–1000 ms, nada hardcodeado |
| III | Tres Estados en Toda Pantalla | cargando / vacío / error |
| IV | Stack Fijo y Tipado | Expo + expo-router + TypeScript + AsyncStorage, funcionales con hooks |
| V | Español y Código Explicable | idioma del proyecto y "explicable línea por línea" |

Más dos secciones de apoyo: **Restricciones Técnicas** (estructura de carpetas,
alcance funcional, sin backend) y **Flujo de Desarrollo y Calidad** (un commit
por tarea, formato del mensaje, registro en este archivo, prueba manual en
dispositivo como compuerta de calidad). Cierra con **Governance**: procedimiento
de enmienda, política de versionado semántico y expectativa de cumplimiento.

Versión **1.0.0**, ratificada el 2026-08-21. Se registró el Sync Impact Report
como comentario HTML al tope del archivo.

### Cómo se verificó

Esta tarea no toca la app, así que **no se probó en Expo Go**: no hay nada que
renderizar. La verificación fue documental:

- La plantilla se resolvió con `resolve-template.ps1 constitution-template -Json`
  y el comando terminó sin error (fuente: `core`).
- `grep` de `\[[A-Z_]*\]` sobre el archivo final: sin placeholders pendientes.
- `grep` de espacios al final de línea: ninguno.
- Fechas en formato ISO `YYYY-MM-DD` y línea de versión coherente con el
  Sync Impact Report.
- Lectura completa del archivo para confirmar que cada principio sale de una
  regla real de `CLAUDE.md` y no de una invención del asistente.

Quedaron señaladas dos inconsistencias del repo, no resueltas en esta tarea:
AsyncStorage figura en la constitución pero todavía no es dependencia en
`package.json`, y `PROCESO.md` y `specs/` no existían al momento de ratificar.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## Instrucciones del proyecto en CLAUDE.md

**Fecha:** 2026-08-21
**Commit:** `bb0a92a` — `docs: documentar stack, convenciones y flujo en CLAUDE.md`

### Prompt usado

<!-- COMPLETAR: este archivo ya estaba escrito en el working tree al inicio de
     la sesión de la constitución. No hay registro de si se redactó a mano o con
     ayuda del asistente, ni del prompt en ese caso. -->

_(pendiente — ver nota abajo)_

### Qué se generó

`CLAUDE.md` pasó de una sola línea (`@AGENTS.md`, que importaba el archivo de
instrucciones genérico) a 55 líneas con las instrucciones propias del proyecto:

- **Descripción**: app de gastos en React Native + Expo para la Actividad Áulica
  N.º 1, sin backend real.
- **Stack y restricciones (fijo)**: Expo + expo-router, TypeScript, mocks en
  `/services` con `setTimeout` de 500–1000 ms, AsyncStorage, idioma español.
- **Estructura del proyecto**: `app/`, `components/`, `services/`, `types/`.
- **Convenciones de código**: funcionales con hooks, tres estados por pantalla,
  nada hardcodeado, comentarios breves.
- **Flujo de trabajo (SDD)**: spec/plan/tasks mandan, una tarea por vez, plan
  antes de código, nada terminado sin prueba en Expo Go.
- **Git y commits**: uno por tarea, formato `feat: T## - descripción corta`,
  mensajes en español e imperativo, asunto de menos de 72 caracteres.
- **Documentación del proceso**: obligación de registrar cada tarea en este
  archivo.

Es la fuente de la que después se derivó la constitución.

### Cómo se verificó

No aplica prueba en Expo Go: es un archivo de instrucciones, no toca la app. Se
verificó leyendo el diff completo (`git diff CLAUDE.md`, +55 −1) antes de
commitear, y confirmando que las reglas quedaran reflejadas sin contradicciones
en `constitution.md`.

Quedó señalado un efecto colateral: `AGENTS.md` sigue en el repo pero ya no lo
referencia nadie, quedó huérfano. Decidir si se borra o se vuelve a enlazar.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## Andamiaje de Spec Kit

**Fecha:** 2026-08-21
**Commit:** `4433c4b` — `chore: agregar andamiaje de Spec Kit`

### Prompt usado

Ninguno. Estos archivos no los generó el asistente: los instaló el CLI de
Specify sobre el repo existente, según registra `.specify/init-options.json`:

```
specify init --here --ai claude --script ps
```

Spec Kit **v0.16.5**, integración `claude`, scripts en PowerShell, skills de IA
habilitados (`ai_skills: true`), numeración de features secuencial.

La única intervención del asistente fue decidir el alcance del commit y
redactar el mensaje.

### Qué se generó

29 archivos, 4734 líneas, en dos ubicaciones:

- **`.specify/`** — scripts de PowerShell (`create-new-feature.ps1`,
  `setup-plan.ps1`, `setup-tasks.ps1`, `check-prerequisites.ps1`,
  `resolve-template.ps1`, `common.ps1`), plantillas de `spec`, `plan`, `tasks`,
  `checklist` y `constitution`, manifests de integración, y la definición del
  workflow SDD.
- **`.claude/skills/`** — los 10 skills `speckit-*` (`specify`, `plan`, `tasks`,
  `implement`, `analyze`, `clarify`, `checklist`, `converge`, `constitution`,
  `taskstoissues`).

Se incluyeron los skills en el mismo commit por ser parte de la misma
instalación, no de un cambio propio del proyecto.

### Cómo se verificó

No aplica prueba en Expo Go: son herramientas del flujo de trabajo, no código de
la app. Se verificó que:

- `resolve-template.ps1` corre y resuelve la plantilla de constitución sin error
  — es decir, el andamiaje funciona en esta máquina.
- El `.gitignore` propio de `.specify/` excluye el estado local (`feature.json`,
  `extensions/*/local-config.yml`), así que no se commiteó estado por máquina.
- La lista de archivos stageados se revisó una por una antes de commitear.

Git avisó que convertirá LF→CRLF en todos estos archivos (Windows sin
`.gitattributes`). Queda anotado por si el repo se abre en Mac o Linux.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## Especificación de la feature — 001-gestion-gastos

**Fecha:** 2026-08-21
**Commit:** `d735bc0` — `docs: agregar spec, plan y tareas de gestión de gastos`

### Prompt usado

```
/speckit-specify

App móvil de gestión de gastos personales para registrar y consultar gastos
del día a día. Sin backend: los datos vienen de mocks.

Historias de usuario:
- Como usuario, quiero ver la lista de mis gastos [...]
- Como usuario, quiero ver el detalle de un gasto [...]
- Como usuario, quiero cargar un gasto nuevo mediante un formulario validado.
- Como usuario, quiero borrar un gasto que ya no quiero tener registrado.
- Como usuario, quiero ver un resumen con el total gastado por categoría.

Pantallas (4, con navegación entre ellas): listado, detalle, alta, resumen.
Datos de un gasto: monto (>0), categoría (lista fija), fecha (por defecto hoy),
descripción opcional, moneda única en pesos.
Categorías fijas: Comida, Transporte, Servicios, Ocio, Salud, Otros.
Criterios de aceptación y lista de "fuera de alcance" incluidos en el prompt.
```

(El prompt completo, con los cinco criterios de aceptación y los ocho puntos
fuera de alcance, está reproducido en el campo **Input** de `spec.md`.)

### Qué se generó

`specs/001-gestion-gastos/spec.md` — 5 historias de usuario priorizadas de P1 a
P5, con sus escenarios en formato Given/When/Then; 22 requisitos funcionales
agrupados por pantalla; 3 entidades clave; 9 criterios de éxito medibles y sin
referencias técnicas; 10 edge cases; y secciones de **Assumptions** y
**Out of Scope**.

También `specs/001-gestion-gastos/checklists/requirements.md`, el checklist de
calidad de la spec, con 16 ítems.

### Cómo se verificó

No aplica prueba en Expo Go: es documentación, no toca la app. La verificación
fue la validación contra el checklist de calidad, en dos pasadas:

- **Primera pasada**, dos fallas corregidas:
  - Faltaba la persistencia entre cierres de la app. No estaba en el prompt,
    pero la constitución (principio IV) la exige. Se agregaron **FR-022** y
    **SC-008**.
  - El "fuera de alcance" estaba solo en el prompt y no en la spec. Se agregó
    la sección **Out of Scope**.
- **Segunda pasada**: sin hallazgos. Los 16 ítems pasan.
- `grep` de marcadores `[NEEDS CLARIFICATION]`: cero.

Quedaron tres supuestos documentados en la spec, señalados como "a confirmar":
mocks como semilla de primer arranque, fechas futuras permitidas, y resumen sin
total general.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## Plan de implementación — 001-gestion-gastos

**Fecha:** 2026-08-21
**Commit:** `d735bc0` — `docs: agregar spec, plan y tareas de gestión de gastos`

### Prompt usado

```
/speckit-plan
```

Sin argumentos: el comando trabaja sobre `spec.md` y la constitución.

### Qué se generó

Cuatro artefactos en `specs/001-gestion-gastos/`:

- **`plan.md`** — contexto técnico, Constitution Check contra los cinco
  principios, árbol de archivos a crear, y una tabla de trazabilidad que mapea
  cada requisito funcional al archivo donde se resuelve.
- **`research.md`** — cinco decisiones técnicas, cada una con su alternativa
  descartada y el motivo: convivencia de mocks y AsyncStorage, sincronización
  entre pantallas, entrada de fecha, representación del monto, y confirmación
  de borrado.
- **`data-model.md`** — entidades `Gasto`, `Categoria` y `ResumenCategoria`,
  tabla de reglas de validación con sus mensajes en español, criterio de orden
  estable, y forma de persistencia en AsyncStorage.
- **`contracts/services.md`** — las cinco funciones de la capa de datos con su
  firma, qué devuelven, cuándo lanzan y a qué requisito responden. Es el
  contrato que sobrevive a la llegada de un backend real.
- **`quickstart.md`** — guion de verificación manual en Expo Go, 13 bloques que
  cubren los 9 criterios de éxito.

### Cómo se verificó

No aplica prueba en Expo Go: son documentos de diseño. La verificación fue el
Constitution Check, evaluado antes y después del diseño: los cinco principios
pasan, sin violaciones que justificar.

El gate que exigió una decisión real fue el **IV (stack cerrado)**:

- AsyncStorage no requiere enmienda, porque la constitución ya lo nombra.
- Se descartó el selector de fecha nativo
  (`@react-native-community/datetimepicker`) justamente por ese principio: es
  una dependencia no nombrada y habría exigido enmendar la constitución antes
  de usarla. La fecha se resuelve con un campo de texto validado.

Se verificó además que no quedaran placeholders de plantilla ni marcadores
`[NEEDS CLARIFICATION]` sin resolver.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## Lista de tareas — 001-gestion-gastos

**Fecha:** 2026-08-21
**Commit:** `d735bc0` — `docs: agregar spec, plan y tareas de gestión de gastos`

### Prompt usado

```
/speckit-tasks
```

Sin argumentos: el comando trabaja sobre `plan.md`, `spec.md` y los artefactos
de diseño.

### Qué se generó

`specs/001-gestion-gastos/tasks.md` — 22 tareas (T001 a T022) organizadas en
ocho fases:

| Fase | Tareas | |
|---|---|---|
| 1. Setup | T001–T002 | 2 |
| 2. Foundational | T003–T010 | 8 |
| 3. US1 — Listado | T011–T012 | 2 (MVP) |
| 4. US2 — Alta | T013–T016 | 4 |
| 5. US3 — Detalle | T017 | 1 |
| 6. US4 — Borrado | T018 | 1 |
| 7. US5 — Resumen | T019 | 1 |
| 8. Polish | T020–T022 | 3 |

**No se generaron tareas de test automatizado.** Ni la spec ni la constitución
los piden: la compuerta de calidad del proyecto es la prueba manual en Expo Go,
y eso quedó como la tarea T022 (recorrer el guion de `quickstart.md`).

Dos decisiones que se tomaron al generar las tareas:

- Se agregó la carpeta `utils/` a la estructura, para la conversión de fechas y
  las reglas de validación del formulario. Van afuera de `services/` a
  propósito, porque esa carpeta tiene que poder reemplazarse entera cuando
  llegue un backend, sin arrastrar lógica de presentación. Se actualizó
  `plan.md` para que quede consistente.
- La marca `[P]` se documentó con un significado acotado: indica que los
  archivos no se pisan, **no** que se trabaje en paralelo. La constitución fija
  una tarea por vez, en orden.

### Cómo se verificó

No aplica prueba en Expo Go: es documentación. Se verificó por script que:

- Las 22 tareas cumplen el formato obligatorio: checkbox, ID secuencial,
  etiqueta de historia donde corresponde, y ruta de archivo. Cero fuera de
  formato.
- El reparto por historia da 2 + 4 + 1 + 1 + 1 = 9 tareas etiquetadas, más 13
  sin etiqueta entre Setup, Foundational y Polish. Suma 22.
- 5 tareas marcadas como paralelizables.

Se identificó una única dependencia real entre historias: **US4 depende de
US3**, porque el borrado vive en la pantalla de detalle y T018 modifica el
archivo que crea T017.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---
