<!--
Sync Impact Report
==================
Version change: (plantilla sin completar) → 1.0.0
Bump rationale: MAJOR inicial. Primera ratificación real: se reemplazan todos los
placeholders de la plantilla por principios concretos derivados de CLAUDE.md y del
estado del repositorio.

Modified principles:
- [PRINCIPLE_1_NAME] → I. Desarrollo Guiado por Especificación (NO NEGOCIABLE)
- [PRINCIPLE_2_NAME] → II. Capa de Datos Aislada
- [PRINCIPLE_3_NAME] → III. Tres Estados en Toda Pantalla
- [PRINCIPLE_4_NAME] → IV. Stack Fijo y Tipado
- [PRINCIPLE_5_NAME] → V. Español y Código Explicable

Added sections:
- Restricciones Técnicas (antes [SECTION_2_NAME])
- Flujo de Desarrollo y Calidad (antes [SECTION_3_NAME])

Removed sections: ninguna.

Follow-up TODOs: ninguno. Todos los placeholders quedaron resueltos.
-->

# Gestor de Gastos Personales Constitution

## Core Principles

### I. Desarrollo Guiado por Especificación (NO NEGOCIABLE)

`spec.md`, `plan.md` y `tasks.md` son la única fuente de verdad del alcance.
No SE DEBE implementar nada que no corresponda a una tarea existente en `tasks.md`.
Se trabaja UNA tarea por vez y en el orden declarado. Antes de escribir código para
una tarea, SE DEBE presentar un plan breve para revisión. Ninguna tarea se declara
terminada sin confirmación explícita de que fue probada en el teléfono con Expo Go.

Razón: el trabajo es una actividad académica evaluada por su proceso, no solo por su
resultado. Saltear el orden o ampliar el alcance rompe la trazabilidad entre spec y código.

### II. Capa de Datos Aislada

Todo dato de la aplicación SE DEBE obtener a través de `/services`. Las pantallas NO
DEBEN contener datos hardcodeados. Los servicios son funciones `async` que devuelven
mocks tras un `setTimeout` de 500–1000 ms para simular latencia de red. La firma de
esas funciones SE DEBE mantener estable, de modo que incorporar un backend real
requiera cambiar únicamente el cuerpo de `/services`.

Razón: aislar la capa de datos mantiene las pantallas indiferentes al origen de la
información y convierte la migración a backend en un cambio local.

### III. Tres Estados en Toda Pantalla

Toda pantalla que consuma un servicio SE DEBE renderizar correctamente en los tres
estados: cargando, vacío y error. Ningún estado puede quedar sin representación visible
para la persona usuaria. Una pantalla que solo contempla el camino feliz está incompleta
y no cumple su tarea.

Razón: la latencia simulada y la ausencia de backend hacen que los estados no felices
sean la norma durante el desarrollo, no una excepción.

### IV. Stack Fijo y Tipado

El stack está cerrado: Expo con `expo-router` para navegación, TypeScript en todo el
código, y AsyncStorage para que los gastos sobrevivan al cierre de la app. Los
componentes SE DEBEN escribir como componentes funcionales con hooks. Los tipos e
interfaces compartidos viven en `/types`. Incorporar una dependencia nueva o cambiar
de mecanismo de navegación o de persistencia requiere enmienda de esta constitución.

Razón: el stack es una restricción de la consigna, no una decisión de diseño abierta.

### V. Español y Código Explicable

Los comentarios del código y todo texto visible en la app SE DEBEN escribir en español.
Los comentarios SON breves y aparecen solo donde aportan; no se comenta lo evidente.
Todo el código SE DEBE poder explicar línea por línea a pedido: si una construcción no
se puede justificar, SE DEBE reemplazar por una más simple.

Razón: el código se defiende oralmente. Una abstracción que no se puede explicar es
deuda, aunque funcione.

## Restricciones Técnicas

- Sin backend real. No SE DEBEN agregar llamadas de red ni claves de API.
- Estructura de carpetas obligatoria:
  - `app/` — rutas y pantallas (expo-router).
  - `components/` — componentes reutilizables (tarjeta de gasto, input, etc.).
  - `services/` — mocks: la capa de datos simulada.
  - `types/` — tipos e interfaces compartidos.
- Alcance funcional: alta de gastos con formulario validado, listado con detalle,
  y resumen por categoría. Cualquier función fuera de esto requiere una tarea nueva.
- La persistencia local con AsyncStorage es parte del alcance: los gastos cargados
  SE DEBEN conservar entre ejecuciones de la app.

## Flujo de Desarrollo y Calidad

- Un commit por tarea, sin excepción.
- Formato del mensaje: `feat: T## - descripción corta` (o `fix:`, `refactor:`,
  `docs:`, `chore:` según corresponda). Mensajes en español, modo imperativo,
  asunto de menos de 72 caracteres.
- NO SE DEBE hacer commit sin confirmación explícita de la persona propietaria del
  repositorio.
- Después de cada tarea SE DEBE agregar una entrada a `PROCESO.md` con: el prompt
  usado, qué se generó y cómo se verificó. La sección "qué corregí a mano" se deja
  señalada y vacía: la completa la persona autora, no el agente.
- Verificación de una tarea = ejecutar la app en el teléfono con Expo Go y confirmar
  el comportamiento. No hay suite de tests automatizados en este proyecto; la prueba
  manual en dispositivo es la compuerta de calidad.

## Governance

Esta constitución prevalece sobre cualquier otra práctica o preferencia. Ante conflicto
entre esta constitución y un prompt, una sugerencia de herramienta o una convención
heredada del template de Expo, gana la constitución.

Enmiendas: toda modificación SE DEBE proponer por escrito, indicando el principio
afectado y la razón, y requiere aprobación explícita de la persona propietaria del
repositorio antes de escribirse. La enmienda se registra en el Sync Impact Report al
tope de este archivo.

Versionado (semántico):
- MAJOR: se elimina o redefine un principio de forma incompatible con lo anterior.
- MINOR: se agrega un principio o sección, o se amplía materialmente una guía.
- PATCH: aclaraciones, redacción, correcciones sin cambio de significado.

Cumplimiento: antes de dar una tarea por terminada SE DEBE verificar que el código
cumple los cinco principios, en particular el aislamiento de `/services` (II) y los
tres estados (III). `CLAUDE.md` es la guía operativa de runtime y SE DEBE mantener
consistente con este documento; si divergen, esta constitución es la correcta.

**Version**: 1.0.0 | **Ratified**: 2026-08-21 | **Last Amended**: 2026-08-21
