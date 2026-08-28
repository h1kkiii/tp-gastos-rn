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

## T001 — Instalar AsyncStorage

**Fecha:** 2026-08-21
**Tarea:** T001 de `specs/001-gestion-gastos/tasks.md` (Fase 1, Setup)

### Prompt usado

```
Quiero implementar la tarea T001 de tasks.md: instalar
@react-native-async-storage/async-storage con npx expo install y verificar
que quede registrada en package.json.

Antes de tocar nada, mostrame un plan breve de qué vas a hacer.
```

Se revisó el plan antes de ejecutar, según el flujo de trabajo del proyecto.

### Qué se generó

No se escribió código. La tarea es solo la instalación de la dependencia:

```bash
npx expo install @react-native-async-storage/async-storage
```

Se usó `expo install` y no `npm install` a propósito: elige la versión
compatible con el SDK instalado en lugar de la última publicada. Resultado:
**`@react-native-async-storage/async-storage` 2.2.0**, compatible con Expo
SDK 54.

Archivos modificados: `package.json` y `package-lock.json`.

El primer `import` de AsyncStorage no ocurre en esta tarea: llega en T006,
cuando se escriba `services/almacenamiento.ts`. Importarlo ahora habría
adelantado otra tarea.

### Cómo se verificó

- `@react-native-async-storage/async-storage: "2.2.0"` figura en `dependencies`
  de `package.json`, con versión fijada.
- Existe `node_modules/@react-native-async-storage/async-storage`, y su
  `package.json` reporta la versión 2.2.0.
- `package-lock.json` quedó actualizado.

**Probado en Expo Go: funciona.** La verificación se hizo después del commit,
no antes. En un primer momento se decidió saltearla por tratarse de una
instalación sin cambios de código, y así quedó registrado; enseguida se
reconsideró, con el criterio de que es más barato descubrir una rotura de
bundle con un solo commit encima que diez tareas más adelante.

Se levantó el servidor con `npm start` y se cargó `exp://192.168.1.174:8081`
en Expo Go. La app bundleó y arrancó sin error, mostrando todavía el starter
de Expo (las pestañas "Home" y "Explore"), que es lo esperado porque T002
—la limpieza del starter— aún no se hizo. Confirmado: instalar AsyncStorage no
rompió el bundle.

Efecto colateral menor: npm reordenó `react-native-worklets` alfabéticamente
dentro de `dependencies` al reescribir el archivo. Es ruido de formato, sin
cambio de versión.

Aviso pendiente de la instalación: npm reporta 19 vulnerabilidades (10
moderadas, 9 altas) en el árbol de dependencias, heredadas del template de
Expo. No se tocaron, para no alterar el stack fijado por la constitución sin
una tarea que lo cubra.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T002 — Quitar rutas y componentes del starter

**Fecha:** 2026-08-21
**Tarea:** T002 de `specs/001-gestion-gastos/tasks.md` (Fase 1, Setup)

### Prompt usado

```
Quiero implementar la tarea T002 de tasks.md.
Antes de tocar nada, mostrame un plan breve de qué vas a hacer.
```

Y tras revisar el plan:

```
haz lo que debas hacer en T002, mejor si no dejas archivos rotos,
cuando esté, lo pruebo con expo go
```

### Qué se generó

**Cuatro archivos borrados**, los que nombra la tarea:

- `app/(tabs)/explore.tsx`
- `app/modal.tsx`
- `components/hello-wave.tsx`
- `components/parallax-scroll-view.tsx`

**Tres archivos modificados**:

- `app/(tabs)/_layout.tsx` — se quitó el `Tabs.Screen` de "explore" y se
  renombró la pestaña restante de "Home" a "Gastos".
- `app/_layout.tsx` — se quitó el `Stack.Screen` del modal.
- `app/(tabs)/index.tsx` — reducido a una pantalla provisoria con el título
  "Gastos", con un comentario que señala que T012 la reemplaza por el listado
  real.

**El texto de la tarea estaba incompleto.** T002 nombraba solo los dos layouts
como archivos con referencias a limpiar, pero `app/(tabs)/index.tsx` también
importaba `HelloWave` y `ParallaxScrollView` y linkeaba a `/modal`. Sin tocarlo,
borrar los componentes dejaba tres imports rotos y la app no bundleaba. Se
detectó al revisar el plan, antes de escribir código, y se resolvió dentro de la
misma tarea para no dejar el repositorio en un estado roto entre commits.

### Cómo se verificó

Antes de pasar a prueba manual:

- `npm run lint` — sin hallazgos.
- `npx tsc --noEmit` — sin errores. Es el chequeo que de verdad atrapa imports
  rotos, más que el linter.
- `grep` de referencias a lo borrado (`hello-wave`, `parallax-scroll-view`,
  `name="explore"`, `name="modal"`, `href="/modal"`) — ninguna.

**Probado en Expo Go: funciona.** La app arranca con una sola pestaña "Gastos" y
sin rastros del starter.

En el primer intento seguían apareciendo las dos pestañas viejas. Se verificó
que el código en disco fuera el correcto, se descartó un problema real y se
confirmó que era un bundle cacheado; tras reiniciar Expo Go, la app mostró el
estado esperado.

### Pendientes que dejó esta tarea

`components/ui/collapsible.tsx` y `components/external-link.tsx` quedaron sin
ningún consumidor: su único uso era `explore.tsx`. No se borraron dentro de T002,
porque la tarea no los nombra. **Se eliminaron enseguida después**, por decisión
explícita de la autora, en un commit `chore:` aparte.

Al buscar huérfanos apareció una trampa: `components/ui/icon-symbol.ios.tsx` y
`hooks/use-color-scheme.web.ts` también dan cero usos en un grep, pero **sí se
usan**. React Native los resuelve por extensión de plataforma, así que borrarlos
rompería iOS y web. Se conservaron.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T003 — Definir los tipos del dominio

**Fecha:** 2026-08-21
**Tarea:** T003 de `specs/001-gestion-gastos/tasks.md` (Fase 2, Foundational)

### Prompt usado

```
prosigamos con el T003, recuerda, siempre que avancemos a una siguiente tarea
primero especificame que harás
```

Se revisó el plan antes de escribir código, y se aprobó con "avanza".

### Qué se generó

`types/gasto.ts`, un único archivo nuevo. No se tocó nada existente.

- **`CATEGORIAS`** — arreglo `as const` con las seis categorías en el orden de la
  spec, no alfabético. Es la única fuente para poblar el selector (T014) y para
  recorrer el resumen (T019).
- **`Categoria`** — se deriva del arreglo con `(typeof CATEGORIAS)[number]`, en
  lugar de escribirse como una unión aparte. Así el tipo y la lista no pueden
  divergir: agregar una categoría en un solo lugar alcanza.
- **`Gasto`** — `id`, `monto`, `categoria`, `fecha` (ISO `AAAA-MM-DD`),
  `descripcion` y `creadoEn`. Sin campo de moneda: FR-021 fija pesos, y
  modelarlo sería agregar algo que la spec deja fuera de alcance.
- **`ResumenCategoria`** — `categoria` y `total`, con un comentario que aclara
  que es un valor derivado, no almacenado.

**Decisión de modelado señalada antes de implementar**: `descripcion` quedó como
`string` requerido con cadena vacía cuando no hay, en vez de `descripcion?:
string`. Así ninguna pantalla necesita chequear `undefined` antes de renderizar.
La alternativa era legítima y se marcó para poder cambiarla ahora y no después.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.
- **Prueba de tipos con archivo temporal**: se escribió un archivo que asigna
  una categoría válida, construye un `Gasto` y un `ResumenCategoria` completos, e
  intenta asignar `'Viajes'` a `Categoria` bajo `@ts-expect-error`. Compiló en
  cero, lo que prueba dos cosas: que las formas de los tipos son usables, y que
  la categoría inventada es efectivamente rechazada (si no lo fuera, `tsc`
  habría fallado por una directiva `@ts-expect-error` sin uso). El archivo se
  borró después de la verificación.

**No se probó en Expo Go, y en este caso no correspondía**: son solo tipos, se
borran al compilar y ninguna pantalla los usa todavía. Abrir la app habría sido
una comprobación vacía. El primer uso real llega en T005.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T004 — Conversión y validación de fechas

**Fecha:** 2026-08-27
**Tarea:** T004 de `specs/001-gestion-gastos/tasks.md` (Fase 2, Foundational)

### Prompt usado

```
lee el claude.md y proceso.md para ver en que parte del trabajo nos quedamos
```

Y tras revisar el plan de la tarea:

```
bien, procede
```

### Qué se generó

`utils/fecha.ts`, un único archivo nuevo (73 líneas). No se tocó nada existente.
Es la primera vez que aparece la carpeta `utils/`.

Cuatro funciones exportadas, más dos auxiliares privadas:

- **`aIsoDesdeDdMmAaaa(texto)`** — pasa `dd/mm/aaaa` a ISO `AAAA-MM-DD`.
  Devuelve `null` si el formato no coincide o si el día no existe. Es lo que va
  a usar la validación del formulario en T015.
- **`aDdMmAaaaDesdeIso(iso)`** — la inversa, para mostrar en la tarjeta (T011),
  el detalle (T017) y precargar el campo de alta (T016).
- **`esFechaValida(texto)`** — se apoya en la primera: es válida si convierte.
  Una sola definición de "fecha válida", no dos que puedan divergir.
- **`hoyIso()`** — la fecha de hoy en ISO, para precargar el formulario (FR-012).

Auxiliares: `existeEnCalendario(anio, mes, dia)` y `conDosDigitos(numero)`.

Tres decisiones de implementación:

- **La validación no se resuelve con regex sola.** Una regex acepta `31/02/2026`
  sin quejarse. La función construye la fecha con `new Date(anio, mes - 1, dia)`
  y compara las partes del resultado con las de entrada: si `Date` corrió el día
  solo —31 de febrero se vuelve 3 de marzo— las partes no coinciden y se rechaza.
- **Fechas construidas en horario local, nunca con `new Date("2026-08-27")`.**
  Ese constructor parsea la cadena como UTC, así que en Argentina (UTC−3) puede
  devolver el día anterior. Con el constructor de tres argumentos eso no pasa.
- **Se permiten fechas futuras**, según `data-model.md` línea 31. No hay ningún
  chequeo de tope superior.

Se descartó una función de "formato lindo" tipo *27 de agosto de 2026*: ninguna
tarea la pide y `dd/mm/aaaa` es lo que fija el data-model para pantalla.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.
- **Prueba de comportamiento con 22 casos.** Como son funciones puras, se
  compiló el archivo a JavaScript en un directorio temporal
  (`npx tsc utils/fecha.ts --outDir <tmp> --module commonjs --target es2020`) y
  se corrió con Node un script que compara cada resultado contra el esperado.
  **22 de 22 pasan.** Los casos cubren: conversión normal en ambos sentidos, año
  bisiesto (`29/02/2024` válido) y no bisiesto (`29/02/2026` rechazado), día
  inexistente (`31/02/2026`), día cero (`00/01/2026`), mes 13, año de dos
  dígitos (`1/1/26`), separador equivocado (`27-08-2026`), texto libre
  (`'ayer'`), cadena vacía, cada formato pasado a la función del otro, ida y
  vuelta sin pérdida, y `hoyIso()` contra la fecha local del sistema. El
  directorio temporal quedó fuera del repositorio.

**No se probó en Expo Go, y en este caso no correspondía**: son funciones puras
que ninguna pantalla importa todavía. Abrir la app habría sido una comprobación
vacía —el bundle es idéntico al de T003, porque el módulo no lo alcanza ningún
`import`—. El primer uso real llega en T011, con la tarjeta del listado, y ahí sí
se ve la fecha en pantalla.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T005 — Semilla de gastos de ejemplo

**Fecha:** 2026-08-27
**Tarea:** T005 de `specs/001-gestion-gastos/tasks.md` (Fase 2, Foundational)

### Prompt usado

```
haz el commit y pasemos a la siguiente tarea, recuerda siempre primero decirme
que vas a hacer y esperar mi confirmacion para avanzar con nuevas tareas
```

Y tras revisar el plan de la tarea:

```
avanza
```

### Qué se generó

`services/mocks-gastos.ts`, un único archivo nuevo. Es la primera vez que aparece
la carpeta `services/`. No se tocó nada existente.

Exporta una sola constante, `GASTOS_SEMILLA: Gasto[]`, con **seis gastos**
fechados entre el 17 y el 22 de agosto de 2026. Los datos no son al azar: cada
elección habilita una verificación posterior.

| Elección | Para qué |
|---|---|
| 6 gastos | la tarea pide entre 5 y 8 |
| 5 categorías, dejando **Otros vacía** | comprobar en T019 que el resumen no lista categorías sin gastos |
| 2 gastos el **20/08**, con `creadoEn` distinto | probar el orden estable que exige FR-002 |
| `g5` con `descripcion: ''` | el caso de descripción vacía que resuelve el detalle (T017) |
| montos mezclados: redondos y con centavos | que el formato de monto se vea trabajado en el listado |

Cuatro decisiones de implementación:

- **Fechas fijas, escritas a mano, no calculadas desde hoy.** Una semilla que se
  mueve con el reloj haría que el guion de `quickstart.md` diera un resultado
  distinto cada día. La contra es que dentro de unos meses los datos se van a ver
  viejos; se aceptó a cambio de que la verificación sea reproducible.
- **`id` fijo** (`'g1'`…`'g6'`), no generado. Es semilla: tiene que ser el mismo
  en cada instalación para poder navegar al detalle con un id conocido.
- **Import de tipo** (`import type { Gasto }`), con el alias `@/` que ya usa el
  resto del proyecto. Al ser `import type` desaparece al compilar: el archivo no
  arrastra ninguna dependencia en tiempo de ejecución.
- **Sin `async` ni `setTimeout`, y sin tocar AsyncStorage.** Acá es solo el
  arreglo de datos. La persistencia es T006 y la latencia simulada es T007;
  adelantarlas habría metido dos tareas dentro de una.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores. Es lo que garantiza que las seis categorías
  escritas a mano sean valores válidos de `Categoria`: un typo como `'Comidas'`
  no compila.
- `npm run lint` — sin hallazgos.
- **Prueba de datos con 13 chequeos**, compilando a JavaScript en un directorio
  temporal y corriendo un script con Node. **13 de 13 pasan.** Cubren las tres
  condiciones que pide la tarea (cantidad entre 5 y 8, al menos cuatro
  categorías, al menos dos gastos con la misma fecha) más la integridad de los
  datos: ids únicos, montos mayores a cero y con hasta dos decimales, `creadoEn`
  únicos, descripción siempre `string`, al menos una vacía, y "Otros" sin usar.
  Las seis fechas se validaron pasándolas por `esFechaValida` de T004, así la
  semilla queda contrastada contra las utilidades reales y no contra una regex
  escrita para la ocasión.
- El script además imprime el **orden esperado del listado** y los **totales por
  categoría**, que quedan como valores de referencia para contrastar a ojo
  cuando se implementen T012 y T019:
  Servicios 12500 · Ocio 8900.75 · Salud 6300 · Comida 5630.75 · Transporte 1200.

**Un error detectado y corregido durante la verificación**: los `creadoEn` del
primer borrador eran marcas de tiempo de **2025**, un año antes que la `fecha`
del propio gasto. No rompía nada —`creadoEn` no se muestra y solo desempata el
orden— pero eran datos incoherentes. Se recalcularon los seis contra su fecha
real, con una hora del día plausible, y se agregó esa hora como comentario al
lado de cada valor. Se verificó con un chequeo aparte que el día de `creadoEn`
coincide con el campo `fecha` en los seis casos.

**No se probó en Expo Go, y en este caso no correspondía**: ningún `import`
alcanza el archivo todavía, así que el bundle es idéntico al de la tarea
anterior. La semilla se ve por primera vez en pantalla en T012, y recién va a
escribirse en el dispositivo cuando exista T006.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T006 — Persistencia en AsyncStorage

**Fecha:** 2026-08-27
**Tarea:** T006 de `specs/001-gestion-gastos/tasks.md` (Fase 2, Foundational)

### Prompt usado

```
haz el commit y pasemos a la siguiente tarea entonces
```

Y, tras plantear la duda de cómo verificar una capa que ninguna pantalla importa
todavía, la decisión sobre la sonda descartable:

```
hagamos lo primero, asi seguimos el criterio que aplicamos con la primer tarea
```

### Qué se generó

`services/almacenamiento.ts`, un único archivo nuevo. No se tocó nada existente.

Expone tres cosas: la clave `CLAVE_GASTOS` (`'gastos-app:gastos'`, la única que
usa la app), `leerGastos()` y `guardarGastos()`. Adentro queda `parsearGastos()`,
que no se exporta porque es un detalle de cómo se decodifica lo guardado.

Las decisiones que definen esta tarea son todas sobre **qué hacer cuando algo
sale mal**:

- **El JSON corrupto lanza; no se repara.** Fue la decisión más importante del
  archivo. La tentación es capturar el fallo de parseo y "arreglarlo" escribiendo
  la semilla encima, y eso destruiría en silencio los gastos reales de la persona
  ante un parseo fallido. El `catch` lanza y deja lo guardado intacto, para que
  la pantalla muestre su estado de error (FR-019) y el dato siga ahí por si se
  puede recuperar.
- **Un JSON válido que no sea un arreglo también se rechaza.** `{"gastos":[]}` y
  `null` parsean sin error pero no son utilizables. Sin ese chequeo, un
  `null` guardado se habría propagado como si fuera una lista y habría reventado
  más arriba, lejos de la causa.
- **La siembra se dispara solo si la clave no existe**, no si el arreglo está
  vacío. Un arreglo vacío es un dato legítimo: si la persona borra todos sus
  gastos, no tienen que volver los de ejemplo.
- **Se devuelve una copia** (`[...GASTOS_SEMILLA]`), no la constante misma, para
  que nadie pueda mutar la semilla del módulo sin querer.
- **Se guarda el arreglo completo, pisando lo anterior.** A esta escala reescribir
  todo es más simple que una escritura parcial y no se puede desincronizar.

### Cómo se verificó

Esta tarea se verificó en dos planos, porque ninguno de los dos alcanzaba solo.

**1. Fuera del teléfono: 15 de 15 chequeos pasan.** Se compiló a JavaScript en un
directorio temporal y se corrió con Node un banco de pruebas que reemplaza
AsyncStorage por un doble en memoria —con contador de escrituras— y resuelve el
alias `@/` con un hook de resolución de módulos. Se ejerce el código real, no una
copia. Cubre: que la clave sea la que fija el data-model; siembra en el primer
arranque **con exactamente una escritura**; que la segunda lectura **no** vuelva
a escribir; que un gasto borrado no reaparezca; que el arreglo vacío se conserve
sin resembrar; ida y vuelta sin pérdida; JSON corrupto (lanza, **no** pisa lo
guardado, cero escrituras); objeto en vez de arreglo; `null` literal; y que un
fallo del propio AsyncStorage se propague en lugar de tragarse.

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**2. En el teléfono, con una sonda descartable. Probado en Expo Go: funciona.**

El doble en memoria no puede probar lo único que esta tarea realmente estrena:
que el **módulo nativo** de AsyncStorage responda en el dispositivo. Ninguna
pantalla importa `almacenamiento.ts` todavía —eso llega en T009 y T012—, así que
abrir la app sin más habría mostrado exactamente lo mismo que en T005.

Se aplicó el criterio que ya se había usado en T001: es más barato descubrir una
rotura con un commit encima que con seis. Se agregó **temporalmente** a
`app/(tabs)/index.tsx` una sonda que llama a `leerGastos()` y muestra en pantalla
tres cosas distintas: si la clave tenía algo **antes** de leer, cuántos gastos
devolvió la lectura, y si **después** quedó contenido escrito en la clave. Esa
última línea es la que prueba que la escritura llegó al disco del teléfono.

Resultado: correcto. La lectura devolvió los 6 gastos de la semilla y la clave
quedó escrita; al cerrar la app por completo y volver a abrirla, los datos
seguían ahí. Eso confirma la persistencia entre cierres que exige el principio IV
de la constitución.

La sonda **no se commitea**: importaba AsyncStorage directamente en una pantalla
—cosa que el contrato de servicios prohíbe— justamente para poder espiar la clave
cruda. Antes de commitear se restauró `app/(tabs)/index.tsx` desde una copia del
original y se verificó con `git diff` que el archivo quedó idéntico al de la
tarea anterior, sin una sola línea de diferencia. Es el mismo procedimiento que
los archivos de prueba temporales de T003 a T005, solo que corriendo en el
teléfono en vez de en Node.

**Incidente de entorno, sin relación con el código**: al reverificar después de
restaurar, `npm run lint` abortó dos veces con `JavaScript heap out of memory`.
No era un problema del proyecto: el árbol de procesos de Metro había sobrevivido
al cierre del servidor de desarrollo y dejaba la máquina con 732 MB libres de
7,9 GB. Se cerraron los procesos huérfanos y el lint volvió a pasar limpio. Queda
anotado porque puede repetirse: conviene verificar que Metro haya cerrado de
verdad antes de correr las herramientas.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T007 — Las cinco funciones del servicio

**Fecha:** 2026-08-27
**Tarea:** T007 de `specs/001-gestion-gastos/tasks.md` (Fase 2, Foundational)

### Prompt usado

```
si, commitea la tarea realizada y dime lo que quieres decidir en la tarea actual
```

Y, sobre las dos decisiones que se plantearon antes de escribir código:

```
con respecto al id, sigamos con el date.now() + sufijo aleatorio corto.
Con respecto a lo segundo, si, redondelo a dos decimales y que no valide nada mas
```

### Qué se generó

`services/gastos-service.ts`, un único archivo nuevo. No se tocó nada existente.

Es la tarea bisagra de la fase: la única superficie por la que las pantallas
acceden a datos, y la costura que un backend real reemplazaría sin que ninguna
pantalla cambie. Las cinco funciones del contrato, todas `async`, todas con
latencia simulada, todas lanzando ante error en vez de devolverlo como valor:

| Función | Qué hace |
|---|---|
| `obtenerGastos` | todos, **ya ordenados**; el vacío es resultado válido, no error |
| `obtenerGastoPorId` | uno puntual; **lanza** si no existe |
| `crearGasto` | asigna `id` y `creadoEn`, redondea el monto y guarda |
| `borrarGasto` | elimina; **lanza** si no existe |
| `obtenerResumenPorCategoria` | total por categoría, solo las que tienen gastos |

Más cuatro auxiliares privadas: `demorar`, `ordenarPorFecha`, `generarId` y
`redondearMonto`.

**Dos decisiones que se consultaron antes de escribir código**, por no estar
resueltas en los documentos de diseño:

1. **Generación del `id`**: `Date.now()` más un sufijo aleatorio corto
   (`1787874093314-gjyj`). Se descartó `crypto.randomUUID()` porque en React
   Native exige el polyfill `react-native-get-random-values`, o sea una
   dependencia nueva: el mismo motivo por el que el plan ya había descartado el
   selector de fecha nativo. Se descartó `Date.now()` a secas porque dos gastos
   creados en el mismo milisegundo colisionarían, y un `id` duplicado rompe el
   detalle y el borrado en silencio. Y se descartó usar el índice del arreglo o
   un contador, que se rompe apenas se borra un gasto del medio.
2. **Redondeo del monto**: `crearGasto` redondea a dos decimales y **no valida
   nada más**. Había una tensión aparente entre dos documentos: `research.md`
   (decisión 4) pide redondear al guardar, y el contrato dice que las funciones
   no validan la entrada. Conviven, porque **redondear no es validar**: validar
   es rechazar y devolverle un mensaje a la persona, y eso vive en el formulario
   (T015); redondear es normalizar un dato que ya se aceptó. Ubicarlo en el
   servicio garantiza que nada mal formado entre al almacenamiento venga de donde
   venga, que es lo que haría un backend. Se verificó que efectivamente no valida
   nada más: un monto negativo se acepta sin chistar.

**Una corrección durante la implementación**: el resumen filtraba las categorías
por `total > 0`. Es sutilmente distinto de lo que pide FR-017, que habla de
categorías **con al menos un gasto**. Con montos siempre mayores a cero las dos
formas coinciden, pero un gasto de monto 0 habría hecho desaparecer su categoría
entera del resumen. Se cambió a filtrar por cantidad de gastos, que es la regla
tal como está escrita.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.
- **Banco de pruebas con 24 chequeos: 24 de 24 pasan.** Mismo método que en T006
  —compilar a un directorio temporal y correr con Node contra un AsyncStorage
  falso— pero ahora ejerciendo las cinco funciones reales del servicio sobre la
  semilla. Cubre:
  - **Latencia**: medida real de dos llamadas, ambas dentro de 500–1000 ms.
  - **`obtenerGastos`**: devuelve las seis, en el orden correcto
    (`g1 g2 g4 g3 g5 g6` — nótese que `g4` precede a `g3` porque comparten el
    20/08 y desempata `creadoEn`); el vacío devuelve `[]` y no lanza; el
    almacenamiento corrupto sí lanza.
  - **`obtenerGastoPorId`**: trae el correcto y lanza con un `id` inexistente.
  - **`crearGasto`**: redondea (999.999 → 1000; 2.345 → 2.35; 0.005 → 0.01),
    asigna `id` y `creadoEn`, respeta el resto de los campos, deja el gasto
    guardado, y **no valida** (acepta un monto negativo). Además, 150 creaciones
    lanzadas a la vez produjeron 150 `id` distintos, y las 150 quedaron
    guardadas.
  - **`borrarGasto`**: elimina solo el pedido, lanza con un `id` inexistente, y
    un borrado fallido deja lo guardado intacto.
  - **`obtenerResumenPorCategoria`**: los cinco totales coinciden con la suma
    manual calculada en T005; "Otros" no aparece por no tener gastos; el orden
    es el de `CATEGORIAS` y no el del total; no hay fila de total general; sin
    gastos devuelve vacío. Se agregó un caso de punto flotante: 0,10 + 0,20 da
    exactamente 0,30 y no `0.30000000000000004`, gracias al redondeo del total.

**Limitación conocida, no corregida**: `crearGasto` y `borrarGasto` hacen
lectura-modificación-escritura sin serializar. Dos escrituras verdaderamente
simultáneas podrían pisarse. En la prueba de 150 creaciones a la vez no se perdió
ninguna, y la app no puede provocarlo: hay un solo formulario y un solo botón de
guardar. Se deja anotado en vez de agregar un cerrojo que ninguna tarea pide.

**No se probó en Expo Go, y en este caso no correspondía**: ninguna pantalla
importa el servicio todavía —eso llega en T009 y T012—, así que el bundle es el
mismo que el de la tarea anterior. A diferencia de T006, acá no hay ningún riesgo
que solo el dispositivo pueda revelar: el módulo nativo de AsyncStorage ya quedó
probado en el teléfono en la tarea anterior, y todo lo que agrega T007
—`setTimeout`, `Math.random`, ordenamiento y sumas— es JavaScript común que el
banco de pruebas ejerce igual que el teléfono. La latencia se va a ver por
primera vez, como estado de carga real, en T012.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T008 — Los tres componentes de estado

**Fecha:** 2026-08-27
**Tarea:** T008 de `specs/001-gestion-gastos/tasks.md` (Fase 2, Foundational)

### Prompt usado

```
si, haz el commit
```

Y, tras revisar el plan de la tarea:

```
si, hazlo asi
```

### Qué se generó

Tres archivos nuevos, ninguno existente modificado:

- `components/estado-carga.tsx` — `ActivityIndicator` más un texto. Prop
  `mensaje` opcional, con "Cargando…" por defecto.
- `components/estado-vacio.tsx` — texto centrado, sin acción. Props `mensaje`
  (requerido) y `detalle` (opcional, para sugerir cómo salir del vacío).
- `components/estado-error.tsx` — mensaje más un botón **Reintentar**. Props
  `mensaje` y `onReintentar`, ambos requeridos.

Son la pieza que hace **cumplible** el principio III de la constitución (tres
estados en toda pantalla). Si cada pantalla los escribiera por su cuenta, los
estados se verían distintos en cada una y la regla quedaría en el papel. Acá se
escriben una vez y las cuatro pantallas los reusan.

Decisiones de diseño:

- **Se reusa lo que ya existe.** Los tres se arman con `ThemedText` y
  `useThemeColor`, que ya resolvían modo claro/oscuro. No se escribió ni un color
  fijo: un `color: '#000'` haría desaparecer el texto en modo oscuro. El spinner
  recibe explícitamente el color `tint` del tema por el mismo motivo.
- **`mensaje` requerido en vacío y error, opcional en carga.** "Cargando…" sirve
  igual en las cuatro pantallas, pero el vacío del listado ("Todavía no cargaste
  ningún gasto") no es el del resumen. Hacerlo obligatorio impide que quede un
  texto genérico e inútil.
- **`Pressable` y no `Button`.** El `Button` de React Native casi no se puede
  estilar y se ve distinto en iOS y Android. `Pressable` es lo que ya usa el
  proyecto en `haptic-tab.tsx`, y permite dar feedback al mantener apretado:
  el botón invierte sus colores mientras está presionado.
- **Los componentes no saben nada de gastos.** No importan servicios ni tipos del
  dominio: reciben texto y una función. Por eso el de error sirve igual para el
  listado, el detalle y el resumen.
- **Sin `flex: 1` propio.** Se centran dentro del espacio que les dé la pantalla.
  Si se lo pusieran ellos, romperían el layout al colocarlos dentro de una lista.
- Se agregó `accessibilityRole="button"` al botón de reintentar.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**Probado en Expo Go: funciona.** Acá el banco de pruebas en Node no servía: el
resultado de esta tarea es visual, y lo único que puede decir si el spinner se ve,
si el texto contrasta y si el botón responde al toque es el dispositivo.

Se usó otra vez el mecanismo de la **sonda descartable**, igual que en T006: una
versión temporal de `app/(tabs)/index.tsx` que renderiza seis bloques numerados
—las variantes que importan de cada componente— con el botón de reintentar
conectado a un contador visible en pantalla. Se verificó:

1. Carga con mensaje por defecto y con mensaje propio; el spinner se ve.
2. Vacío con y sin detalle.
3. Error: el contador sube al tocar **Reintentar**, o sea que `onReintentar`
   llega de verdad, y el botón cambia de color mientras está apretado.
4. Error con un mensaje largo, para confirmar que el texto no se corta ni se
   desborda.
5. Modo oscuro: ningún texto ni borde desaparece.

Después de la prueba se restauró `app/(tabs)/index.tsx` desde la copia del
original y se verificó con `git diff` que quedó idéntico, y con un `grep` que no
quedaran referencias a los tres componentes en `app/`. El commit lleva solo los
tres archivos de la tarea.

**Nota de entorno**: se cerró el árbol de procesos de Metro antes de correr las
herramientas, por el problema de memoria que quedó anotado en T006.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T009 — El hook de carga con refresco al ganar foco

**Fecha:** 2026-08-27
**Tarea:** T009 de `specs/001-gestion-gastos/tasks.md` (Fase 2, Foundational)

### Prompt usado

```
haz el commit y pasemos a la siguiente tarea
```

Y, sobre cómo verificar una tarea cuyo comportamiento central todavía no se
puede demostrar:

```
hagamos la sonda con pestaña de prueba temporal, avanza con ello
```

### Qué se generó

`hooks/use-gastos.ts`, un único archivo nuevo. No se tocó nada existente.

Expone cuatro cosas: `gastos`, `cargando`, `error` y `recargar`. Es la pieza que
une la capa de datos de T007 con los componentes de estado de T008: sin ella, las
cuatro pantallas repetirían el mismo `useEffect` con `try/catch` y sus tres
banderas. `error` ya viene con el mensaje listo para `EstadoError`, y `recargar`
es exactamente lo que va en su acción de reintentar.

Cuatro decisiones, todas sobre problemas que no se ven leyendo el código:

- **Refresco al ganar foco, no al montar** (decisión 2 de `research.md`). Con
  pestañas, la pantalla del listado **queda montada** al cambiar de tab. Si solo
  recargara al montarse, cargar un gasto en "Nuevo" y volver a "Gastos" mostraría
  datos viejos. Se resuelve con `useFocusEffect`, que ya viene con expo-router:
  cero dependencias nuevas, y sin store global ni Context, para no tener dos
  fuentes de verdad que puedan desincronizarse.
- **Bandera de cancelación.** Con 500–1000 ms de latencia hay tiempo de sobra
  para irse de la pantalla antes de que llegue la respuesta. Sin la bandera, un
  `setState` tardío escribiría sobre un componente ya desmontado. Se marca en la
  limpieza del efecto y se consulta antes de cada `setState`.
- **`cargar` envuelto en `useCallback`.** `useFocusEffect` vuelve a correr su
  efecto cuando cambia la función que recibe; una función nueva en cada render
  provocaría **recargas infinitas**. Es el punto más frágil del archivo y quedó
  comentado por eso.
- **El vacío no es un error.** Si el servicio devuelve `[]`, el hook lo entrega
  tal cual con `error: null`. Distinguir "no hay datos" de "falló la lectura" es
  lo que le permite a la pantalla elegir entre `EstadoVacio` y `EstadoError`.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**Probado en Expo Go: funciona.**

Antes de implementar se detectó un problema de verificación: **el refresco al
ganar foco no se podía demostrar**, porque hasta acá había una sola pestaña y las
otras dos llegan en T010. Sin un segundo tab al que ir y del que volver, no hay
"ganar foco" que probar. Se decidió, en vez de dejar la deuda hasta T010, que la
sonda incluyera **una pestaña de prueba descartable**.

La sonda tuvo tres partes, todas fuera del commit: una versión temporal de
`app/(tabs)/index.tsx` que consume el hook y muestra en pantalla `cargando`,
`error`, la cantidad de gastos y dos contadores (cargas terminadas y renders); un
archivo nuevo `app/(tabs)/prueba.tsx` con cinco acciones (crear gasto, borrar el
más reciente, vaciar, romper el JSON, restaurar la semilla); y el alta de esa
pestaña en `app/(tabs)/_layout.tsx`.

Lo verificado:

1. **Refresco al ganar foco**: crear un gasto desde la otra pestaña y volver
   a "Gastos" hace subir el contador de cargas y aparece el gasto nuevo, sin
   tocar nada.
2. **Los tres estados contra datos reales**: vaciar el almacenamiento muestra el
   estado vacío; romper el JSON muestra el de error; restaurar la semilla vuelve
   a los seis gastos.
3. **`recargar` como acción de reintentar**: con el JSON roto, Reintentar vuelve
   a fallar; restaurada la semilla, Reintentar carga bien.
4. **Sin bucle de recargas**: el contador de renders se queda quieto con la
   pantalla en reposo. Es la comprobación de que el `useCallback` está bien
   puesto; si faltara, ese número subiría solo sin parar.

Después de la prueba se restauraron `index.tsx` y `_layout.tsx` desde sus copias
—verificado con `git diff`, idénticos— y se **borró** `app/(tabs)/prueba.tsx`. Un
`grep` sobre `app/` confirma que no quedan referencias a la sonda ni al hook. El
commit lleva un solo archivo.

**Pendiente que deja esta tarea**: T019 (pantalla de resumen) figura como
dependiente de T009, pero el resumen no sale de `obtenerGastos` sino de
`obtenerResumenPorCategoria`. Este hook no le sirve tal cual. Se decidió **no**
generalizarlo ahora —sería código especulativo para una pantalla que todavía no
existe— y resolverlo al llegar a T019, probablemente con un hook hermano que
repita esta misma forma.

**Nota sobre el estado del dispositivo**: la sonda escribió gastos de prueba en
el teléfono y permite dejarlo vacío o con el JSON roto. Lo que haya quedado
guardado es lo que va a mostrar la app en las próximas tareas.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T010 — La navegación de las cuatro pantallas

**Fecha:** 2026-08-27
**Tarea:** T010 de `specs/001-gestion-gastos/tasks.md` (Fase 2, Foundational)

### Prompt usado

```
si, commitea y pasemos a la siguiente
```

Y, sobre el desvío que hizo falta para los íconos de las pestañas:

```
haz el 1
```

### Qué se generó

Cierra la Fase 2, la que bloquea todas las historias de usuario.

**Tres archivos nuevos**, pantallas provisorias, cada una con un comentario que
dice qué tarea la reemplaza:

- `app/(tabs)/nuevo.tsx` — la reemplaza T016.
- `app/(tabs)/resumen.tsx` — la reemplaza T019.
- `app/gasto/[id].tsx` — la reemplazan T017 y T018. Lee el `id` de la ruta con
  `useLocalSearchParams` y lo muestra, para poder comprobar que el parámetro
  llega.

**Tres archivos modificados**:

- `app/(tabs)/_layout.tsx` — de una pestaña a tres: Gastos, Nuevo y Resumen.
- `app/_layout.tsx` — el detalle sumado al stack raíz, con el título
  "Detalle del gasto".
- `components/ui/icon-symbol.tsx` — dos entradas nuevas en el mapa de íconos.

**Decisión de navegación**: el detalle vive en el **stack raíz y no dentro de las
pestañas**. Al abrirlo, la barra de pestañas desaparece y aparece la flecha de
volver, que es el comportamiento correcto para una pantalla a la que se llega
desde un ítem de una lista. Quedó comentado en el archivo.

**Desvío consciente del alcance de la tarea**: los íconos de las pestañas salen
de `components/ui/icon-symbol.tsx`, que traduce nombres de SF Symbols a Material
Icons, y ese mapa traía solo cuatro entradas del starter —casa, avión de papel,
código y una flecha—. No había nada razonable para "Nuevo" ni para "Resumen".
La tarea no nombra ese archivo, así que se consultó antes de tocarlo; se
eligió agregar dos entradas (`plus.circle.fill` → `add-circle` y
`chart.pie.fill` → `pie-chart`) en lugar de dejar las pestañas con íconos sin
sentido hasta la fase de pulido. El cambio es aditivo: no toca ninguna de las
cuatro entradas que ya estaban. Es el mismo criterio que en T002, cuando hubo
que tocar un archivo que el texto de la tarea no nombraba.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**Probado en Expo Go: funciona.** Acá no hizo falta sonda: la tarea misma es
visible. Se verificó:

1. Las tres pestañas aparecen, con íconos distintos y con sentido, y cada una
   muestra su pantalla.
2. El detalle abre con la cabecera "Detalle del gasto" y su flecha de volver, y
   **la barra de pestañas desaparece** — que es la comprobación de que quedó en
   el stack raíz y no en las pestañas.
3. El parámetro de ruta llega: la pantalla muestra el `id` recibido.

Como todavía no hay nada tocable en el listado —eso llega en T012—, al detalle se
entró por enlace directo: `exp://192.168.1.174:8081/--/gasto/g1`.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T011 — La tarjeta del listado

**Fecha:** 2026-08-27
**Tarea:** T011 de `specs/001-gestion-gastos/tasks.md` (Fase 3, US1 — el MVP)

### Prompt usado

```
haz el commit, prosigamos
```

Y, sobre las dos decisiones que se plantearon antes de escribir código:

```
si, hazlo como me dijiste
```

### Qué se generó

Dos archivos nuevos:

- **`components/tarjeta-gasto.tsx`** — la fila del listado: categoría y monto en
  la misma línea, fecha debajo en gris. Es el primer consumidor real de
  `aDdMmAaaaDesdeIso`, escrita en T004.
- **`utils/moneda.ts`** — `formatearMonto`, que convierte `3480.5` en
  `"$3.480,50"`.

**La descripción no va en la tarjeta**: la spec dice que en el listado no entra y
que es del detalle. La tarjeta muestra monto, categoría y fecha, que es lo que
pide FR-003, ni más ni menos.

Decisiones:

- **La tarjeta no navega sola.** Recibe un `onPress` y no sabe a dónde lleva; la
  ruta la decide la pantalla en T012. Misma línea que los componentes de T008:
  reciben datos y funciones, no deciden.
- **El monto se encoge antes de romper la fila.** La spec pide como edge case que
  un monto extremadamente grande se muestre sin cortar el texto ni romper la
  fila. Con `flexShrink` en los dos textos y `numberOfLines={1}`, un monto de
  muchas cifras entra sin empujar la categoría fuera de la pantalla.
- **Si la fecha guardada fuera ilegible, se muestra cruda** en lugar de dejar el
  renglón vacío: `aDdMmAaaaDesdeIso(...) ?? gasto.fecha`.

**Segundo desvío consciente del alcance, consultado antes de hacerlo**: la tarea
nombra un solo archivo, pero el formato del monto no podía vivir adentro del
componente. El detalle (T017) y el resumen (T019) también muestran montos, y
tenerlo en la tarjeta obligaría a duplicarlo o a importar una función desde un
componente. Se creó `utils/moneda.ts` con el mismo criterio con el que ya existía
`utils/fecha.ts`: una conversión de dato a texto, compartida, fuera de
`services/` porque tiene que sobrevivir al reemplazo de la capa de datos.

**Se formatea a mano y no con `Intl.NumberFormat`**, también por decisión
consultada. `Intl` es más elegante, pero depende de los datos de locale del
dispositivo: en Android viejo pueden no estar, y el mismo monto se vería distinto
según el teléfono. Seis líneas propias dan un resultado idéntico en todos lados,
se prueban en Node y se explican línea por línea, que es lo que pide el principio
V. La función trabaja en centavos enteros justamente para no arrastrar el error
de punto flotante al separar la parte entera de la decimal.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.
- **Banco de pruebas del formateo: 30 de 30 pasan.** Cubre los seis montos de la
  semilla, todos los bordes de la separación de miles (999 → 1.000 → 10.000 →
  1.000.000), el monto extremadamente grande que pide la spec
  (`$12.345.678.901,23`), decimales que se completan a dos (`0.5` → `$0,50`), el
  cero, y los negativos, que no deberían llegar pero se muestran con el signo en
  vez de perderse.

**Un caso que primero pareció una falla y no lo era.** La prueba esperaba que
`1.005` se mostrara como `$1,01` y devolvía `$1,00`. Revisado: `1.005` como
número de punto flotante vale en realidad `1.00499999999999989`, así que redondear
a dos decimales da `1,00`. No es un error del formateo, y lo importante es que
**coincide con lo que el servicio guarda**: `crearGasto` usa el mismo redondeo y
almacena exactamente `1`. Se corrigió la expectativa de la prueba y se agregaron
seis chequeos nuevos que comparan, para varios montos, el texto formateado contra
el texto del valor ya redondeado por el servicio. Coinciden en todos.

**No se probó en Expo Go todavía**: la tarjeta sola no tiene dónde vivir hasta que
exista el listado. Se verifica en T012, que es la tarea que la pone en pantalla,
y ahí se mira lo que Node no puede decir: que la fila se vea bien y que un monto
largo no la rompa.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T012 — La pantalla de listado (MVP)

**Fecha:** 2026-08-27
**Tarea:** T012 de `specs/001-gestion-gastos/tasks.md` (Fase 3, US1 — el MVP)

### Prompt usado

```
si, haz el commit y sigamos
```

Y, tras revisar el plan de la tarea:

```
perfecto, avanza
```

### Qué se generó

Un único archivo modificado: `app/(tabs)/index.tsx`, que pasó de la pantalla
provisoria de T002 al listado real. No se creó ni se tocó nada más.

Es la tarea donde por primera vez se junta todo lo construido en la Fase 2: el
hook de T009 le pide los datos al servicio de T007, que lee del almacenamiento de
T006, y lo que vuelve se dibuja con las tarjetas de T011 o con los componentes de
estado de T008. **Con esto la app pasa a ser demostrable**: es el MVP.

La pantalla resuelve los cuatro caminos en orden —cargando, error, vacío y
lista—, cada uno con un retorno temprano, que se lee mejor que un encadenado de
ternarios.

Decisiones:

- **`FlatList` y no un `map` dentro de un `ScrollView`.** `FlatList` solo dibuja
  las filas visibles. Con seis gastos da igual, pero la persona va a acumular
  cientos, y ahí un `map` empieza a trabar el scroll. Es la diferencia entre una
  pantalla que envejece bien y una que no.
- **El orden no se toca acá.** `obtenerGastos` ya devuelve ordenado, como fija el
  contrato, justamente para que la pantalla no pueda desordenarlo por olvido. La
  pantalla solo dibuja.
- **La navegación vive en la pantalla, no en la tarjeta**: el `onPress` que se le
  pasa a `TarjetaGasto` hace `router.push('/gasto/<id>')`. La tarjeta sigue sin
  saber a dónde lleva.
- **El título va como `ListHeaderComponent`**, así scrollea junto con la lista en
  vez de quedar fijo ocupando espacio en pantallas chicas.
- **Separador de una línea fina entre filas**, para que se lean como filas
  distintas y no como un bloque de texto.

**Lo que esta tarea deliberadamente no hace**: no agrega un botón de "nuevo
gasto" (eso es la pestaña de T016) y no implementa el detalle real. Al tocar una
fila se llega a la pantalla provisoria de T010, que muestra el `id`. Es lo
esperado hasta T017.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**Probado en Expo Go: funciona.** Sin sonda: la tarea *es* la pantalla. Se
recorrió el bloque 1 del guion de `quickstart.md` tal como está escrito:

1. El indicador de carga se alcanza a ver — la latencia simulada de 500–1000 ms
   cumple su propósito de hacer visible el estado, en vez de un parpadeo.
2. Cada gasto muestra monto, categoría y fecha, con el monto formateado en pesos
   (`$12.500,00`) y la fecha en `dd/mm/aaaa`.
3. El orden es del más reciente al más viejo, y los dos gastos que comparten el
   20/08 quedan juntos y en el mismo orden al cerrar y volver a abrir la app: el
   desempate por `creadoEn` que se venía preparando desde T005 funciona.
4. Al tocar una fila se navega al detalle, que todavía es la pantalla provisoria.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T013 — El campo de texto del formulario

**Fecha:** 2026-08-27
**Tarea:** T013 de `specs/001-gestion-gastos/tasks.md` (Fase 4, US2)

### Prompt usado

```
si, commitea la ask
```

Y, tras revisar el plan de la tarea:

```
avanza
```

### Qué se generó

`components/campo-texto.tsx`, un único archivo nuevo. No se tocó nada existente.
Es la primera de las cuatro piezas de la US2, y el formulario de alta lo va a
usar para monto, fecha y descripción.

Tres partes apiladas: etiqueta arriba, input, y mensaje de error abajo cuando lo
hay. Props: `etiqueta`, `valor`, `onChangeText`, `error`, `placeholder`,
`keyboardType` y `multiline`.

Decisiones:

- **El componente no valida.** Recibe el `error` ya calculado y solo lo muestra.
  Las reglas viven en `utils/validacion-gasto.ts` (T015) y cuándo aplicarlas lo
  decide la pantalla (T016). Si el componente validara, cada regla quedaría atada
  a un input y no se podrían probar por separado.
- **El borde se pone rojo, además del mensaje.** Con solo texto, en un formulario
  de varios campos hay que leer para encontrar cuál falló; con el borde marcado
  se ve de un vistazo.
- **`TextInput` con el color de texto del tema aplicado explícitamente.** Es el
  detalle fácil de olvidar de esta tarea: a diferencia de `ThemedText`,
  `TextInput` no hereda el color, así que sin esto en modo oscuro se escribiría
  texto negro sobre fondo negro. El placeholder usa el color `icon`, más apagado
  que el texto real.
- **El rojo del error es una constante local.** `constants/theme.ts` no define un
  color de error, y ampliarlo habría sido otro desvío que esta tarea no necesita.
- **Accesibilidad**: `accessibilityLabel` con la etiqueta, y el mensaje de error
  anunciado con `accessibilityRole="alert"`, para que un lector de pantalla no
  lea un campo suelto sin contexto.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**Probado en Expo Go: funciona.** Es un componente puramente visual, así que un
banco de pruebas en Node no aportaba nada. Se usó otra vez la **sonda
descartable**, esta vez sobre `app/(tabs)/nuevo.tsx` —la pantalla provisoria que
T016 va a reemplazar de todos modos— para no tocar el listado recién terminado.
La sonda mostró cuatro campos y un botón que enciende y apaga los errores. Se
verificó:

1. Se escribe en los tres campos y el texto espejado abajo confirma que
   `onChangeText` llega; el de monto abre teclado numérico.
2. Al encender los errores, el borde se pone rojo y aparece el mensaje; al
   apagarlos, todo vuelve a su estado normal.
3. Un mensaje de error deliberadamente largo ocupa varios renglones sin desbordar
   ni empujar los campos de abajo.
4. La descripción multilínea crece y arranca el texto arriba, no centrado.
5. **En modo oscuro se ve lo que se escribe** en los tres campos, y el
   placeholder se distingue del texto real. Es la comprobación del punto del
   color de `TextInput`.

Después se restauró `app/(tabs)/nuevo.tsx` desde su copia —verificado con
`git diff`, idéntico— y un `grep` sobre `app/` confirma que no quedan referencias
al componente. El commit lleva un solo archivo.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T014 — El selector de categoría

**Fecha:** 2026-08-27
**Tarea:** T014 de `specs/001-gestion-gastos/tasks.md` (Fase 4, US2)

### Prompt usado

```
haz el commit, pasemos a lo siguiente
```

Con una verificación intermedia pedida por la autora, antes de seguir:

```
antes de seguir, anotaste los cambios previos a proceso.md?
no vi que me lo hayas nombrado
```

Se comprobó que sí: 19 entradas, 13 de ellas de tareas (T001–T013), coincidiendo
con las 13 tareas marcadas en `tasks.md`, y cada una commiteada junto a su tarea.
Y después:

```
sigamos con t014
```

### Qué se generó

`components/selector-categoria.tsx`, un único archivo nuevo. No se tocó nada
existente. Es la última pieza visual del formulario de alta.

**Las seis categorías se muestran como botones tipo "chip" en una grilla que
envuelve**, no como un desplegable. Sin dependencias nuevas —la constitución
cierra el stack, así que no hay librería de dropdown ni `Picker`— y con seis
opciones fijas, los chips entran en dos o tres renglones según el ancho: se ven
todas de una y no hay que abrir nada.

Se descartaron dos alternativas: una fila horizontal scrolleable esconde opciones
fuera de pantalla, y ni siquiera se sabe que están; y un `Modal` con la lista
agrega un paso y una pantalla más para algo que entra sin problema en el
formulario.

Decisiones:

- **Las opciones salen de `CATEGORIAS`**, recorriendo la constante de T003. Nada
  escrito a mano: agregar una categoría allá la hace aparecer acá sola. Ese fue
  justamente el motivo de derivar el tipo del arreglo en T003.
- **La elegida se pinta entera, no solo con un borde más grueso.** En pantalla
  chica un cambio de borde no se distingue; con relleno del color `tint` y el
  texto invertido a color de fondo, se ve de un vistazo cuál está elegida.
- **`valor` puede ser `null`**, que es el estado inicial: nada elegido. Es lo que
  hace posible la regla "Elegí una categoría." Si arrancara con una
  preseleccionada, esa validación no tendría sentido y se guardarían gastos en
  una categoría que la persona nunca eligió.
- **No valida**, igual que el campo de texto: recibe el `error` y lo muestra
  debajo, con el mismo rojo y el mismo tamaño, para que los dos componentes del
  formulario se vean parejos.
- **`accessibilityState={{ selected }}`** en cada chip, para que un lector de
  pantalla anuncie cuál está elegida y no lea seis botones iguales.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**Probado en Expo Go: funciona.** Otra vez con **sonda descartable** sobre
`app/(tabs)/nuevo.tsx`, mostrando el selector junto al campo de texto de T013
—así se comprobó de paso que los dos se ven coherentes entre sí—. Se verificó:

1. Las seis categorías se ven todas, sin scroll horizontal y sin desplegar nada;
   ninguna queda cortada ni escondida.
2. Al tocar una se pinta entera y el texto de control confirma cuál quedó.
3. Al tocar otra, la anterior se apaga: nunca hay dos elegidas.
4. Con el error encendido y ninguna elegida, los seis bordes se ponen rojos y
   aparece el mensaje; **al elegir una, el error desaparece al instante**, que es
   lo que pide el data-model ("el mensaje de un campo desaparece en cuanto ese
   campo se corrige").
5. En modo oscuro el chip elegido sigue siendo legible y los no elegidos se
   distinguen del fondo.
6. El tamaño de los chips se revisó explícitamente en el dispositivo, por si las
   etiquetas más largas ("Transporte", "Servicios") quedaban apretadas. No hizo
   falta ajustar nada.

Después se restauró `app/(tabs)/nuevo.tsx` desde su copia —verificado con
`git diff`, idéntico— y un `grep` sobre `app/` confirma que no quedan referencias
a la sonda. El commit lleva un solo archivo.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T015 — Las reglas de validación del formulario

**Fecha:** 2026-08-27
**Tarea:** T015 de `specs/001-gestion-gastos/tasks.md` (Fase 4, US2)

### Prompt usado

```
haz el commit y sigamos
```

Y, sobre la decisión del separador decimal y los decimales de más:

```
si, hazlo como me lo planteaste
```

### Qué se generó

`utils/validacion-gasto.ts`, un único archivo nuevo. No se tocó nada existente.
Es la última pieza antes de la pantalla de alta, y la única de la US2 que es
lógica pura.

Expone `validarGasto(entrada)`, que devuelve `{ errores, datos }`. Si `errores`
está vacío, `datos` trae el gasto listo para `crearGasto`, con el monto ya como
número y la fecha ya en ISO.

**Que devuelva también los datos convertidos es deliberado**: validar el monto ya
implica interpretarlo, y validar la fecha ya implica convertirla. Si la función
solo dijera "sí o no", la pantalla tendría que repetir ambas conversiones, con el
riesgo de que las dos no coincidan.

**Decisión consultada: qué significa un punto en el monto.** `research.md` acepta
coma o punto como separador decimal, pero eso vuelve ambiguo un texto como
`"1.234"`: ¿mil doscientos treinta y cuatro, o uno con tres decimales? Se
resolvió que **cualquier coma o punto es el separador decimal y no se acepta
separador de miles**. Va en línea con la spec, que pide expresamente que un monto
con separador de miles no se dé por válido solo porque "parece" un número. En la
práctica casi no molesta: el teclado del campo es numérico y ofrece un solo
separador.

**Tercer desvío consciente, también consultado: un mensaje nuevo.** De la
decisión anterior se desprende que `"1.2345"` son cuatro decimales. La spec dice
que un monto con más decimales *"se rechaza o se redondea a dos de forma visible,
nunca en silencio"*, pero la tabla del data-model no tiene un mensaje para eso, y
responder "El monto tiene que ser un número." a quien escribió `1.2345` es
confuso. Se agregó **"El monto puede tener hasta dos decimales."**, que es preciso
y dice qué corregir. Se descartó redondear y reescribir el campo: un campo que se
corrige solo mientras se escribe es molesto.

**`data-model.md` se actualizó en consecuencia**, por pedido explícito de la
autora: se sumó la fila del mensaje nuevo a la tabla de validación, y tres
párrafos que dejan asentado el criterio del separador decimal, por qué se eligió
rechazar en vez de redondear, y el orden de evaluación del monto. El documento de
diseño no se tocó antes de tener esa aprobación.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.
- **Banco de pruebas en Node: 39 de 39 pasan.** Los casos de los bloques 4, 5, 6
  y 7 del `quickstart.md` están copiados tal cual, para que la verificación
  manual después no encuentre nada nuevo. Suma casos propios: `$1500`, `15 00`,
  `1,2,3`, `1.` y `.5` como entradas que no son número; `0,00` como cero
  disfrazado; coma y punto dando el mismo resultado; `29/02/2024` válido y
  `29/02/2026` no; la descripción guardada sin espacios sobrantes; y los tres
  campos informando su error a la vez.
- Dos chequeos de coherencia con el resto del sistema: que las seis categorías de
  `CATEGORIAS` sean aceptadas, y que una fecha convertida a ISO vuelva a
  `dd/mm/aaaa` sin perder nada usando las funciones de T004.

**Un error propio encontrado al contrastar contra el guion.** El `quickstart.md`
especifica que `-50` debe responder **"El monto tiene que ser mayor a 0."**, y la
primera versión respondía "El monto tiene que ser un número.", porque la
expresión regular rechazaba el signo menos antes de llegar a evaluar el valor.
Los dos mensajes existen en la tabla, así que el error no era visible salvo
comparando caso por caso contra el guion. Se corrigió aceptando el signo en el
formato y dejando que la regla de "mayor a 0" sea la que lo rechace, que además
es el orden correcto: primero se interpreta el número, después se juzga su valor.
Se agregaron cuatro casos más (`-0,01`, `-1500,50`, `--5`, `5-`) para fijar el
comportamiento.

**No se probó en Expo Go, y en este caso no correspondía**: es lógica pura y
ninguna pantalla la usa todavía. Se ve entera en T016, donde el formulario la
conecta con los componentes de T013 y T014.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T016 — La pantalla de alta

**Fecha:** 2026-08-27
**Tarea:** T016 de `specs/001-gestion-gastos/tasks.md` (Fase 4, US2). **Cierra la US2.**

### Prompt usado

```
si, actualizalo y haz el commit
```

Y, tras revisar el plan de la tarea:

```
avanz
```

### Qué se generó

Un único archivo modificado: `app/(tabs)/nuevo.tsx`, que pasó de la pantalla
provisoria de T010 al formulario real. Es la tarea más grande de la US2: junta el
campo de texto (T013), el selector (T014), las reglas (T015) y el servicio
(T007).

Los cuatro comportamientos que pide la tarea:

- **Fecha precargada con hoy** (FR-012), tomando `hoyIso()` de T004 y pasándola a
  `dd/mm/aaaa`.
- **Validación al guardar**, no mientras se escribe. Marcar en rojo un campo que
  la persona todavía está completando es hostil.
- **Los campos válidos se conservan al fallar** (FR-013).
- **Vuelta al listado tras guardar**, con el gasto ya visible ahí.

Decisiones:

- **El error de un campo desaparece en cuanto se corrige**, como pide el
  data-model. Se resuelve revalidando en cada cambio **pero solo si ya se intentó
  guardar**: así no aparecen errores antes de tiempo, y sí desaparecen al
  arreglar. La función de revalidación recibe el campo cambiado porque el estado
  todavía tiene el valor anterior —`setMonto` no actualiza `monto` hasta el
  próximo render—, un detalle fácil de pasar por alto que dejaría el mensaje
  colgado un tecleo de más.
- **El formulario se limpia recién cuando el guardado salió bien.** Si falla, no
  se pierde nada de lo cargado: el almacenamiento puede fallar, pero eso no puede
  costarle a la persona lo que escribió.
- **Botón deshabilitado mientras guarda.** Con 500–1000 ms de latencia hay tiempo
  de sobra para tocar dos veces y crear el gasto duplicado. Esto además esquiva
  de raíz la limitación de concurrencia anotada en T007.
- **`KeyboardAvoidingView`**, para que el teclado no tape el botón de guardar.
- **La vuelta al listado es `router.push('/')`** y el listado se refresca solo al
  ganar foco, gracias al hook de T009. Es donde se cobra lo construido en esa
  tarea.

**Una reescritura durante la implementación.** La primera versión resolvía la
revalidación comparando identidades de funciones (`asignar === setMonto`) para
deducir qué campo se había tocado. Funcionaba —las funciones de `useState` son
estables— pero era opaco: de esos códigos que no se pueden explicar en una línea,
lo que choca de frente con el principio V. Se reescribió para que cada campo diga
explícitamente qué cambió (`revalidar({ monto: valor })`). Más largo de escribir,
mucho más claro de leer.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**Probado en Expo Go: funciona.** Sin sonda: la tarea es la pantalla. Se
recorrieron los bloques 3 a 7 del `quickstart.md`, la tanda más larga hasta ahora:

1. **Alta feliz (bloque 3)**: la fecha viene precargada con hoy; al guardar se ve
   "Guardando…" y se vuelve al listado con el gasto nuevo en la posición que le
   toca por fecha; el formulario queda limpio al volver a entrar.
2. **Validación del monto (bloque 4)**: las cuatro entradas del guion dan sus
   mensajes exactos, incluido **`-50` → "El monto tiene que ser mayor a 0."**,
   que era el caso corregido en T015.
3. **Corrección en vivo**: con el error en pantalla, al corregir el campo el
   mensaje desaparece al instante y **los demás campos conservan lo cargado**
   (FR-013).
4. **Categoría (bloque 5)**: guardar sin elegir muestra "Elegí una categoría."
5. **Fecha (bloque 6)**: `31/02/2026` se rechaza; **una fecha futura se acepta y
   guarda**, como pide el supuesto de la spec.
6. **Descripción (bloque 7)**: guardar con la descripción vacía funciona.
7. **Extra fuera del guion**: tocar Guardar dos veces rápido crea un solo gasto.

**Con esto la US2 queda cerrada y la app sirve para uso real**: se pueden cargar
gastos propios y verlos en el listado, sobreviviendo al cierre.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T017 — La pantalla de detalle

**Fecha:** 2026-08-27
**Tarea:** T017 de `specs/001-gestion-gastos/tasks.md` (Fase 5, US3). **Cierra la US3.**

### Prompt usado

```
haz el commit y pasemos a la siguiente
```

Y, tras revisar el plan de la tarea:

```
avanza
```

### Qué se generó

Un único archivo modificado: `app/gasto/[id].tsx`, que pasó de la pantalla
provisoria de T010 al detalle real. Es la US3 completa en una sola tarea.

Toma el `id` de la ruta, se lo pasa a `obtenerGastoPorId` y muestra los cuatro
datos: el monto grande arriba —formateado con `formatearMonto` de T011— y debajo
categoría, fecha (en `dd/mm/aaaa`, con las utilidades de T004) y descripción.
Con los tres estados de siempre.

Decisiones:

- **El `id` inexistente no necesitó código especial.** `obtenerGastoPorId` lanza
  "No se encontró el gasto.", decisión tomada deliberadamente en T007 justamente
  para cubrir el caso de abrir un gasto ya borrado. La pantalla lo captura por el
  mismo camino que cualquier fallo de lectura. **El caso difícil salió gratis
  porque la decisión estaba tomada en el lugar correcto.**
- **La descripción vacía se muestra como "Sin descripción"**, en gris e itálica.
  La spec acepta las dos formas ("vacío o indicado como sin descripción"), pero
  un hueco en blanco parece un error de carga; el texto explícito dice que no hay
  nada y que está bien que no lo haya.
- **La descripción larga se muestra completa, con scroll.** La spec permite
  recortarla, pero esta es la única pantalla donde se puede leer: cortarla acá la
  volvería inaccesible.
- **Un componente auxiliar `Dato`** para el par etiqueta/valor, en vez de repetir
  la misma estructura tres veces.

**Decisión de no generalizar, tomada a propósito.** Esta pantalla necesita un
gasto puntual, no la lista, así que no puede usar `use-gastos`. Se repitió el
patrón de `useState` + `useFocusEffect` + bandera de cancelación en la pantalla.
Es la primera repetición, y con dos casos todavía no se ve cuál sería la forma
correcta de abstraerlo. **Si en T019 aparece un tercero, ahí conviene extraerlo**
y se va a plantear entonces.

**Lo que esta tarea no hace**: no agrega el botón de borrar. Eso es T018, que
modifica este mismo archivo — la única dependencia real entre historias de todo
el plan.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**Probado en Expo Go: funciona.** Sin sonda: la tarea es la pantalla. Se recorrió
el bloque 8 del `quickstart.md` más dos casos extra:

1. Tocar un gasto del listado muestra el indicador de carga y después los cuatro
   datos; al volver, el listado queda igual.
2. **Descripción vacía**: el gasto de Salud, que la semilla dejó sin descripción
   a propósito, muestra "Sin descripción" en gris.
3. **Gasto inexistente**: entrando por `exp://…/--/gasto/no-existe` aparece el
   estado de error con "No se encontró el gasto." y su botón de reintentar, en
   lugar de una pantalla rota. Es el caso que la spec pide expresamente.
4. Una descripción larga se lee completa, sin desbordar.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T018 — El borrado con confirmación

**Fecha:** 2026-08-27
**Tarea:** T018 de `specs/001-gestion-gastos/tasks.md` (Fase 6, US4). **Cierra la US4.**

### Prompt usado

```
haz el commit y sigamos
```

Y, tras revisar el plan de la tarea:

```
avanza
```

### Qué se generó

Un único archivo modificado: `app/gasto/[id].tsx`, el detalle terminado en T017.
Es **la única dependencia real entre historias de todo el plan**, y por eso el
detalle tenía que existir antes.

Se agregó un botón "Borrar gasto" al pie, con borde rojo, que abre un `Alert`
nativo con dos botones: Cancelar (estilo por defecto) y Borrar (estilo
`destructive`). Al confirmar, `borrarGasto(id)` y vuelta al listado, que se
refresca solo al ganar foco.

Se usó `Alert.alert` tal como fija la decisión 5 de `research.md`: es parte del
núcleo de React Native, es modal de verdad —bloquea hasta que se elige— y usa el
diálogo nativo de cada plataforma, así que la persona lo reconoce. Cero
dependencias y cero estado propio que mantener.

Las dos reglas duras que se respetaron:

- **Nada se borra con una sola acción.** La spec lo dice con esas palabras
  (FR-014). Por eso el `Alert` va **antes** de tocar el servicio, no después con
  opción de deshacer: ese patrón, aunque es habitual, borra primero, y por eso
  `research.md` ya lo había descartado.
- **Cancelar no hace absolutamente nada**: ni una escritura, ni un cambio de
  pantalla.

**El detalle que se cuidó**: si el borrado falla, se **queda en el detalle** con
el mensaje a la vista. Es fácil escribir `await borrarGasto(id); router.back();`
y que un fallo devuelva igual al listado, dando a entender que se borró algo que
sigue estando. El `router.back()` corre únicamente si la escritura salió bien.
El botón además se deshabilita mientras borra, por el mismo motivo que en T016.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**Probado en Expo Go: funciona.** Se recorrió el bloque 9 del `quickstart.md`,
que pide expresamente los dos caminos, más los dos escenarios extra de la spec:

1. **Cancelar**: no se borra nada y se sigue en el detalle; el gasto sigue en el
   listado.
2. **Confirmar**: se vuelve al listado y el gasto ya no está.
3. En ningún momento un gasto desaparece con una sola acción.
4. **Borrando todos los gastos uno por uno**, el listado termina en su **estado
   vacío**, no en una pantalla en blanco.
5. **Cerrando la app por completo y volviendo a abrirla, los gastos borrados no
   reaparecen.**

El punto 5 es el más importante de toda la verificación hasta acá: comprueba de
punta a punta la decisión tomada en T006 —la semilla se escribe una sola vez y
desde ahí manda lo guardado— y con ella el principio IV de la constitución. Si la
siembra se hubiera disparado por "lista vacía" en vez de por "clave inexistente",
acá habrían reaparecido los seis gastos de ejemplo.

**Con esto queda cerrado el ciclo completo de un gasto**: alta, consulta y
borrado.

**Estado del dispositivo**: la verificación terminó con el almacenamiento vacío,
porque el punto 4 pedía borrar todo. Es el punto de partida para probar T019.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T019 — El resumen por categoría

**Fecha:** 2026-08-27
**Tarea:** T019 de `specs/001-gestion-gastos/tasks.md` (Fase 7, US5).
**Cierra la US5 y, con ella, las cinco historias.**

### Prompt usado

```
si, haz el commit y sigamos
```

Y, sobre la decisión de generalizar el patrón de carga:

```
si, haz la opc 1 como dijiste
```

### Qué se generó

Un archivo nuevo y tres modificados:

- **`hooks/use-carga.ts`** (nuevo) — el hook genérico de carga.
- **`app/(tabs)/resumen.tsx`** — la pantalla de resumen real.
- **`hooks/use-gastos.ts`** — reescrito sobre el hook genérico: de 59 líneas a 18.
- **`app/gasto/[id].tsx`** — migrado al hook genérico: 48 líneas menos.

**La decisión de fondo: se generalizó el patrón de carga.** En T017 quedó
anotado que si aparecía un tercer caso del patrón carga/vacío/error con refresco
al foco, convenía extraerlo. El resumen fue ese tercer caso: no puede usar
`use-gastos` porque no trae la lista de gastos sino los totales.

`useCarga(traerDatos)` recibe la función que trae los datos y devuelve
`{ datos, cargando, error, recargar }`, con el refresco al ganar foco y la
bandera de cancelación adentro. Ahora hay **una sola definición de "cómo se carga
algo en esta app"**, en vez de tres copias de la misma lógica —incluida la
bandera de cancelación, que es la parte fácil de olvidar al copiar—.

El costo asumido: tocar dos archivos ya cerrados y probados, ninguno en el
alcance de T019. Fue el desvío más grande de todo el proyecto, y por eso **se
hizo en dos pasos con una prueba en el dispositivo en cada uno**: primero el hook
nuevo más el resumen, y recién después la migración de `use-gastos` y del
detalle. Así, si algo se rompía en la migración, se sabía exactamente qué lo
había roto, y las historias ya cerradas no quedaban a medio camino.

Sobre el requisito de estabilidad de `traerDatos`: si la función se recreara en
cada render, el hook pediría datos sin parar. En el resumen se pasa
`obtenerResumenPorCategoria` directo, porque viene del módulo de servicios y su
identidad ya es estable; en el detalle, que depende del `id`, va envuelta en
`useCallback`. Está documentado en el hook y comentado en el detalle.

De la pantalla de resumen en sí: **no calcula nada**. El servicio ya entrega solo
las categorías con gastos, en el orden de `CATEGORIAS` y sin fila de total
general. La pantalla dibuja lo que recibe.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.

**Probado en Expo Go en dos rondas: funciona.**

**Ronda 1, el resumen** (bloques 10 y 11 del `quickstart.md`). El dispositivo
venía sin gastos desde T018, así que se aprovechó para ver primero el estado
vacío. Después se cargaron cinco gastos con sumas fáciles de verificar a mano
(1000 y 500 en Comida, 2500 en Transporte, 300,50 y 199,50 en Ocio):

1. Los totales coinciden con la suma manual: Comida $1.500,00, Transporte
   $2.500,00, Ocio $500,00.
2. El orden es el de `CATEGORIAS`, no el del total.
3. No aparecen Servicios, Salud ni Otros, por no tener gastos.
4. Cargando un gasto de Salud desde otra pestaña, la fila aparece sola al volver
   al resumen: el refresco al ganar foco del hook nuevo funciona.
5. Borrando ese gasto, la fila de Salud **desaparece** en vez de quedar en $0,00.

**Ronda 2, la no-regresión de todo lo anterior.** Es el motivo de haber partido
la tarea en dos: se verificó que el listado, el detalle, el gasto inexistente, el
borrado con sus dos caminos y el resumen siguen funcionando después de la
migración. Y se controló específicamente el riesgo propio de esta
refactorización: **que ninguna pantalla entre en bucle de recargas**, quedándose
quieto unos segundos en cada una.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---

## T020 — Revisión de idioma y comentarios

**Fecha:** 2026-08-27
**Tarea:** T020 de `specs/001-gestion-gastos/tasks.md` (Fase 8, Pulido)

### Prompt usado

```
haz el commit y sigamos
```

Y, tras revisar los hallazgos y la propuesta:

```
hazlo
```

### Qué se revisó, y qué salió bien

La tarea pide recorrer `app/`, `components/`, `services/`, `types/`, `hooks/` y
`utils/` verificando el idioma y la utilidad de los comentarios. Tres de los
cuatro frentes no necesitaron ningún cambio:

- **Textos visibles: todos en español, sin excepciones.** Se revisaron los 15
  literales de la app (`'Guardar'`, `'Borrando…'`, `'No se encontró el gasto.'`,
  el mensaje del `Alert`, los títulos de las pestañas), los textos en JSX y los
  mensajes que las pantallas les pasan a los componentes de estado.
- **No hay comentarios vencidos.** Ni un `TODO` ni un `FIXME`. Ninguna pantalla
  quedó con su comentario de "pantalla provisoria": se fueron reemplazando junto
  con cada pantalla. Buscarlos importaba, porque un comentario que dice "esto lo
  hace T016" en código donde T016 ya está hecha, miente.
- **Los comentarios propios explican por qué, no qué.** Se revisaron uno por uno.
  La densidad es alta en `services/` y `utils/` (30–43%), pero es casi toda
  documentación de funciones exportadas, que en la capa destinada a ser
  reemplazada por un backend gana su lugar.

### Qué se cambió

Seis archivos, **solo comentarios**: ni una línea de lógica.

Cinco de ellos con comentarios en inglés heredados del starter de Expo, que
habían sobrevivido a la limpieza de T002 porque están en archivos que se siguen
usando:

- `components/haptic-tab.tsx`
- `components/ui/icon-symbol.tsx`
- `hooks/use-theme-color.ts`
- `hooks/use-color-scheme.web.ts`
- `constants/theme.ts`

Los cuatro primeros están en directorios que la tarea nombra. **`constants/` no
está en esa lista**, y se consultó antes de tocarlo: se decidió traducirlo
igual, porque dejar un único comentario en inglés por un tecnicismo de qué
carpeta se enumeró era peor que el desvío mínimo de incluirlo. En el comentario
de `theme.ts` se aprovechó para dejar asentado por qué no se van a usar las
alternativas de estilos que menciona (Nativewind, Tamagui): el stack está cerrado
por la constitución.

El sexto cambio es propio: `services/mocks-gastos.ts` decía "se escribe una sola
vez, en el primer arranque **(T006)**". Esa referencia no le dice nada a quien
lea el código sin la lista de tareas al lado. La explicación quedó; la referencia
se fue.

### Cómo se verificó

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos.
- **Barrido final por `grep`** de términos frecuentes del inglés sobre las siete
  carpetas: **cero resultados**. No queda un solo comentario en inglés en el
  código del proyecto.
- Listado exhaustivo de los literales de texto visibles, para confirmar que
  ninguno quedó en inglés.

**No se probó en Expo Go, y en este caso no correspondía**: el cambio es
exclusivamente de comentarios. No modifica una sola instrucción, así que el
bundle resultante es idéntico y no hay nada nuevo que mirar en pantalla. La
verificación real de esta tarea es la lectura, y `tsc` confirma que ningún
archivo quedó mal formado.

### Qué corregí a mano

<!-- COMPLETAR: describir acá los ajustes hechos a mano sobre lo generado. -->

_(pendiente)_

---
