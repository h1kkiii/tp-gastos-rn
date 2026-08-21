# Research: Gestión de gastos personales

**Fase 0** del plan. Cinco decisiones que había que cerrar antes de diseñar, cada
una con su alternativa descartada y el motivo.

---

## Decisión 1: Convivencia de mocks y AsyncStorage

**Decisión**: los mocks son una **semilla de primer arranque**, no la fuente de
verdad permanente. En el primer inicio, `services/almacenamiento.ts` detecta que
la clave de AsyncStorage está vacía y escribe el arreglo de `mocks-gastos.ts`.
Desde ahí, lo guardado localmente manda: un gasto borrado no reaparece nunca.

**Rationale**: concilia las dos exigencias que estaban en tensión. La spec dice
"los datos vienen de mocks" y la constitución (principio IV) exige que los gastos
sobrevivan al cierre. Sembrar una vez cumple ambas: la app arranca con contenido
para demostrar el listado, y las acciones de la persona son duraderas.

**Alternativas consideradas**:

- *Mocks siempre, sin persistencia*: la app arrancaría siempre igual, pero
  borrar un gasto no tendría efecto real entre sesiones. Viola FR-022.
- *Sin mocks, arranque vacío*: cumpliría la persistencia, pero el listado
  arrancaría en estado vacío y no habría cómo demostrar orden ni resumen sin
  cargar todo a mano. Además contradice la spec.

**Riesgo asumido**: si se cambia la semilla más adelante, los dispositivos que ya
sembraron no la ven. Para la corrección durante el desarrollo alcanza con
desinstalar la app o limpiar la clave.

---

## Decisión 2: Sincronización entre pantallas sin store global

**Decisión**: cada pantalla que muestra datos los vuelve a pedir a `services/`
cuando gana el foco, mediante `useFocusEffect` de expo-router. No hay Context,
Redux ni store global.

**Rationale**: FR-018 pide que listado y resumen reflejen altas y borrados, y
SC-005 lo acota a "en la siguiente visita a esas pantallas". Volver a consultar
al enfocar cumple exactamente eso con el mecanismo más simple posible. Un store
global sería una abstracción que hay que justificar y explicar (principio V) para
resolver un problema que la app no tiene todavía.

**Alternativas consideradas**:

- *Context con el arreglo de gastos en memoria*: evitaría releer, pero duplica la
  fuente de verdad (memoria + AsyncStorage) y abre la puerta a que se
  desincronicen. Más código para explicar, sin beneficio perceptible a esta
  escala.
- *Recargar solo al montar*: insuficiente. Con pestañas, la pantalla queda
  montada al cambiar de tab y mostraría datos viejos.

**Costo aceptado**: se paga la latencia simulada de 500–1000 ms cada vez que se
vuelve a una pantalla. Es deliberado: hace visibles los estados de carga que pide
el principio III.

---

## Decisión 3: Entrada de fecha sin dependencia nueva

**Decisión**: la fecha se ingresa en un campo de texto con formato `dd/mm/aaaa`,
precargado con el día de hoy y validado antes de guardar. No se agrega selector
de fecha nativo.

**Rationale**: el principio IV cierra el stack. `@react-native-community/datetimepicker`
no está nombrado en la constitución, así que usarlo exigiría una enmienda formal
antes de escribir la primera línea. La spec solo pide que la fecha esté precargada
con la de hoy (FR-008) y sea requerida; un campo validado cumple el requisito sin
tocar la constitución ni sumar un módulo nativo que hay que verificar en Expo Go.

**Alternativas consideradas**:

- *`@react-native-community/datetimepicker`*: mejor experiencia, sin duda. Se
  descarta por el principio IV. Si se prefiere, es una enmienda de una línea a la
  constitución y cambia solo el componente de fecha del formulario.
- *Fecha fija en hoy, no editable*: sería la opción más simple, pero contradice
  el supuesto documentado en la spec de que se pueden registrar gastos pasados.

**Validación asociada**: formato `dd/mm/aaaa`, fecha real existente (rechaza
`31/02/2026`), y se permiten fechas futuras según el supuesto de la spec.

---

## Decisión 4: Representación del monto

**Decisión**: el monto se guarda como **número decimal con dos decimales**
(`number`), redondeado al guardar. No se usa entero de centavos.

**Rationale**: la app suma montos en un solo lugar (el resumen) y sobre volúmenes
chicos. El error de punto flotante de JavaScript no llega a ser visible a esta
escala, y guardar centavos como entero obliga a convertir en cada lectura y
escritura: más código para explicar (principio V) del que el problema justifica.

**Alternativas consideradas**:

- *Entero de centavos*: es lo correcto en un sistema contable real, y sería la
  elección si hubiera conversión de moneda, impuestos o cierres. Nada de eso está
  en alcance, y ambos están fuera de alcance explícito en la spec.

**Reglas asociadas**: se acepta coma o punto como separador decimal, se redondea
a dos decimales al guardar, y se rechaza todo lo que no se pueda interpretar
como número mayor a 0 (FR-009).

---

## Decisión 5: Confirmación de borrado

**Decisión**: se usa `Alert.alert` de React Native, con dos botones — cancelar
(estilo por defecto) y borrar (estilo destructivo).

**Rationale**: FR-014 exige confirmación explícita siempre. `Alert` es parte del
núcleo de React Native, es modal de verdad (bloquea hasta que se elige) y usa el
diálogo nativo de cada plataforma, así que la persona lo reconoce. Cero
dependencias, cero estado propio que mantener.

**Alternativas consideradas**:

- *Modal propio*: control total del diseño, pero implica estado de apertura,
  manejo del botón atrás de Android y estilos para dos plataformas. Nada de eso
  aporta a un requisito que solo pide confirmar.
- *Deslizar para borrar con deshacer*: patrón habitual, pero **no** cumple
  FR-014: el borrado ocurre antes de confirmar.

---

## Resumen

| # | Tema | Decisión |
|---|---|---|
| 1 | Mocks + persistencia | Semilla en el primer arranque; después manda AsyncStorage |
| 2 | Sincronía entre pantallas | Recarga al enfocar, sin store global |
| 3 | Fecha | Campo de texto `dd/mm/aaaa` validado, sin dependencia nueva |
| 4 | Monto | Decimal con dos decimales, redondeado al guardar |
| 5 | Confirmación de borrado | `Alert` nativo con acción destructiva |

Sin NEEDS CLARIFICATION pendientes.
