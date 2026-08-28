# Gestor de gastos personales

App móvil hecha con **React Native + Expo** para la Actividad Áulica N.º 1 de
React Native II.

Permite registrar gastos del día a día, verlos en un listado ordenado, consultar
el detalle de cada uno, borrarlos con confirmación y ver un resumen del total
gastado por categoría.

No tiene backend: los datos salen de mocks y se guardan en el teléfono con
AsyncStorage, así que sobreviven al cierre de la app.

---

## Requisitos

- **Node.js 18 o superior** y npm.
- La app **Expo Go** instalada en el teléfono ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) · [iOS](https://apps.apple.com/app/expo-go/id982107779)).
- La computadora y el teléfono **en la misma red Wi-Fi**. Es el requisito que más
  suele fallar: si el teléfono no encuentra el servidor, empezá por acá.

No hace falta Android Studio ni Xcode: todo se prueba con Expo Go.

## Cómo correr el proyecto

**1. Instalar las dependencias** (solo la primera vez):

```bash
npm install
```

**2. Levantar el servidor de desarrollo:**

```bash
npm start
```

**3. Abrir la app en el teléfono.** La terminal muestra un código QR y una
dirección del tipo `exp://192.168.1.100:8081`. Se puede:

- escanear el QR con la cámara (iOS) o desde la propia app Expo Go (Android), o
- escribir esa dirección a mano en Expo Go, en "Enter URL manually".

La primera vez tarda un poco mientras se arma el bundle. Después, cada cambio en
el código se refleja solo.

### Si algo no funciona

| Síntoma | Qué probar |
|---|---|
| El teléfono no encuentra el servidor | Confirmar que ambos están en la misma Wi-Fi. Algunas redes públicas o de trabajo bloquean la conexión entre dispositivos. |
| Se ve una versión vieja de la app | Cerrar Expo Go por completo y volver a abrir: suele ser un bundle cacheado. |
| El bundle no compila | Cortar el servidor y correr `npm start -- --clear`. |

## Scripts

| Comando | Qué hace |
|---|---|
| `npm start` | Levanta el servidor de desarrollo (Expo). |
| `npm run android` | Lo levanta y abre en un emulador de Android. |
| `npm run ios` | Lo levanta y abre en un simulador de iOS (solo en macOS). |
| `npm run web` | Lo abre en el navegador. |
| `npm run lint` | Revisa el código con ESLint. |
| `npx tsc --noEmit` | Verifica los tipos sin generar archivos. |

> ⚠️ **No correr `npm run reset-project`.** Es un script que viene con la
> plantilla de Expo y **borra o mueve `app/`, `components/`, `hooks/`,
> `scripts/` y `constants/`** para dejar un proyecto en blanco. Sobre este
> repositorio, destruye la app.

## Estructura

```
app/          Pantallas y rutas (expo-router)
  (tabs)/       Las tres pestañas: listado, alta y resumen
  gasto/[id]    Detalle de un gasto
components/   Componentes reutilizables
hooks/        Hooks propios (carga de datos con sus tres estados)
services/     Capa de datos simulada: mocks, almacenamiento y la API interna
types/        Tipos e interfaces compartidos
utils/        Fechas, formato de montos y reglas de validación
specs/        Especificación, plan, decisiones técnicas y tareas
```

### Cómo están armados los datos

- **Todo pasa por `services/gastos-service.ts`.** Ninguna pantalla toca
  AsyncStorage ni los mocks directamente. Es la única costura que habría que
  reemplazar el día que exista un backend real.
- **Las cinco funciones simulan latencia** de 500 a 1000 ms, para que los
  estados de carga sean visibles y verificables.
- **La primera vez que se abre la app** se escriben seis gastos de ejemplo. A
  partir de ahí manda lo guardado: un gasto borrado no reaparece, ni siquiera si
  se borran todos.

Como consecuencia de lo anterior, **borrar todos los gastos desde la app no
devuelve los de ejemplo**. Para volver al estado inicial hay que borrar los datos
de Expo Go desde los ajustes del sistema.

## Documentación del proyecto

| Archivo | Qué contiene |
|---|---|
| [`PROCESO.md`](./PROCESO.md) | El registro de cómo se construyó: una entrada por tarea, con el prompt usado, qué se generó y cómo se verificó. |
| [`CLAUDE.md`](./CLAUDE.md) | Las instrucciones del proyecto: stack, convenciones y flujo de trabajo. |
| [`specs/001-gestion-gastos/spec.md`](./specs/001-gestion-gastos/spec.md) | Qué tiene que hacer la app: historias de usuario, requisitos y criterios de éxito. |
| [`specs/001-gestion-gastos/plan.md`](./specs/001-gestion-gastos/plan.md) | Cómo se decidió construirla. |
| [`specs/001-gestion-gastos/research.md`](./specs/001-gestion-gastos/research.md) | Las decisiones técnicas, con las alternativas que se descartaron y por qué. |
| [`specs/001-gestion-gastos/tasks.md`](./specs/001-gestion-gastos/tasks.md) | Las 22 tareas en las que se dividió el trabajo. |
| [`specs/001-gestion-gastos/quickstart.md`](./specs/001-gestion-gastos/quickstart.md) | El guion de verificación manual: 13 bloques para recorrer en el teléfono. |
