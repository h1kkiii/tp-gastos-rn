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
