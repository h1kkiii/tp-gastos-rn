# Proyecto: Gestor de gastos personales

App móvil hecha con React Native + Expo para la Actividad Áulica N.º 1 de
React Native II. Permite cargar gastos, verlos en un listado con su detalle,
darlos de alta con un formulario validado y ver un resumen por categoría.
No tiene backend real: los datos vienen de mocks.

## Stack y restricciones (fijo)

- Expo + expo-router para la navegación.
- TypeScript.
- Sin backend: los datos vienen de mocks en `/services` (funciones `async`
  que devuelven los datos tras un `setTimeout` de 500–1000 ms para simular
  latencia). El día que exista un backend, solo se reemplaza esa capa.
- Persistencia local con AsyncStorage para que los gastos sobrevivan al cierre.
- Idioma: comentarios y textos visibles en la app, en español.

## Estructura del proyecto

- `app/` — rutas y pantallas (expo-router).
- `components/` — componentes reutilizables (ej. tarjeta de gasto, input).
- `services/` — mocks (la capa de datos simulada).
- `types/` — tipos e interfaces compartidos.

## Convenciones de código

- Componentes funcionales con hooks.
- Toda pantalla que consume un mock maneja tres estados: cargando, vacío y error.
- Nada de datos hardcodeados en las pantallas: siempre a través de `/services`.
- Comentarios breves y solo donde aporten.

## Flujo de trabajo (SDD)

- La spec (`spec.md`), el plan (`plan.md`) y las tareas (`tasks.md`) mandan.
  No se implementa nada que no esté en una tarea.
- Trabajamos UNA tarea de `tasks.md` por vez, en orden.
- Antes de escribir código para una tarea, mostrame un plan breve para revisarlo.
- No des una tarea por terminada ni hagas commit hasta que yo confirme que la
  probé en el teléfono con Expo Go.
- El código tiene que poder explicarse línea por línea: si te lo pido,
  explicame qué hace cada parte.

## Git y commits

- Un commit por tarea.
- Formato del mensaje: `feat: T## - descripción corta`
  (o `fix:`, `refactor:`, `docs:`, `chore:` según corresponda).
- Mensajes en español, en modo imperativo, asunto de menos de 72 caracteres.
- No hagas commit sin mi confirmación.

## Documentación del proceso

- Después de cada tarea, agregá una entrada a `PROCESO.md` con: el prompt usado,
  qué generaste y cómo se verificó. La parte de "qué corregí a mano" la completo
  yo, así que dejala señalada para que la llene.
