# Feature Specification: Gestión de gastos personales

**Feature Branch**: `001-gestion-gastos`

**Created**: 2026-08-21

**Status**: Draft

**Input**: User description: "App móvil de gestión de gastos personales para registrar y consultar gastos del día a día. Sin backend: los datos vienen de mocks. Cinco historias de usuario (listado, detalle, alta, borrado, resumen por categoría), cuatro pantallas con navegación entre ellas, y un conjunto fijo de categorías."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver el listado de gastos (Priority: P1)

Como persona usuaria abro la app y veo, de una, todos mis gastos ordenados del
más reciente al más viejo. Cada fila me muestra monto, categoría y fecha, que es
lo mínimo para reconocer un gasto sin abrirlo.

**Why this priority**: Es la pantalla de entrada y la única que entrega valor por
sí sola. Sin listado, cargar o borrar gastos no tiene dónde verse reflejado.

**Independent Test**: Se puede probar sola, con datos de ejemplo: abrir la app y
verificar que aparecen los gastos ordenados por fecha descendente, que mientras
se cargan se ve un indicador, y que si no hay ninguno se ve un mensaje de vacío.

**Acceptance Scenarios**:

1. **Given** que existen gastos registrados, **When** abro la pantalla de listado, **Then** veo todos los gastos ordenados del más reciente al más viejo, cada uno con monto, categoría y fecha.
2. **Given** que los gastos todavía se están cargando, **When** miro la pantalla, **Then** veo un indicador de carga y ningún listado a medias.
3. **Given** que no hay ningún gasto registrado, **When** abro la pantalla de listado, **Then** veo un mensaje de estado vacío que me invita a cargar el primero.
4. **Given** que la carga de gastos falla, **When** abro la pantalla, **Then** veo un mensaje de error comprensible y la posibilidad de reintentar.

---

### User Story 2 - Cargar un gasto nuevo (Priority: P2)

Como persona usuaria quiero registrar un gasto completando un formulario, con la
tranquilidad de que si me equivoco en un campo la app me lo avisa antes de
guardar y no me pierde lo que ya escribí.

**Why this priority**: Sin alta, el listado solo muestra datos de ejemplo y la
app no sirve para el uso real. Es lo que convierte la demo en algo usable.

**Independent Test**: Se puede probar sola completando el formulario y
verificando que un gasto válido se guarda y aparece en el listado, y que cada
regla de validación bloquea el guardado con un mensaje junto al campo.

**Acceptance Scenarios**:

1. **Given** que estoy en el formulario de alta, **When** completo monto válido, categoría y fecha y confirmo, **Then** el gasto queda registrado y vuelvo al listado, donde lo veo en la posición que le corresponde por fecha.
2. **Given** que estoy en el formulario, **When** lo abro por primera vez, **Then** la fecha viene precargada con la de hoy.
3. **Given** que dejo el monto vacío, o escribo algo que no es un número, o un número menor o igual a 0, **When** intento guardar, **Then** el gasto no se guarda y veo un mensaje de error junto al campo monto.
4. **Given** que no elijo categoría, **When** intento guardar, **Then** el gasto no se guarda y veo un mensaje de error junto al campo categoría.
5. **Given** que dejo la descripción vacía, **When** guardo con el resto de los campos válidos, **Then** el gasto se guarda igual, porque la descripción es opcional.
6. **Given** que un campo quedó inválido, **When** lo corrijo, **Then** el mensaje de error de ese campo desaparece y conservo lo que ya había cargado en los demás.

---

### User Story 3 - Ver el detalle de un gasto (Priority: P3)

Como persona usuaria quiero tocar un gasto del listado y ver todos sus datos en
una pantalla propia, incluida la descripción, que en el listado no entra.

**Why this priority**: Completa la consulta: el listado resume, el detalle
muestra todo. Además es la puerta de entrada al borrado.

**Independent Test**: Se puede probar sola tocando un gasto del listado y
verificando que la pantalla muestra monto, categoría, fecha y descripción, y que
se puede volver al listado.

**Acceptance Scenarios**:

1. **Given** que estoy en el listado, **When** toco un gasto, **Then** navego a su detalle y veo monto, categoría, fecha y descripción.
2. **Given** que el gasto no tiene descripción, **When** abro su detalle, **Then** el campo se muestra vacío o indicado como sin descripción, sin romper la pantalla.
3. **Given** que estoy en el detalle, **When** vuelvo atrás, **Then** regreso al listado sin haber alterado ningún dato.

---

### User Story 4 - Borrar un gasto (Priority: P4)

Como persona usuaria quiero eliminar un gasto que cargué por error o que ya no
quiero tener registrado, y quiero que la app me pregunte antes, para no borrar
algo sin querer.

**Why this priority**: Depende del detalle, que es desde donde se borra. Es
corrección de errores, no carga de datos: importa, pero después de poder cargar
y consultar.

**Independent Test**: Se puede probar sola abriendo el detalle de un gasto,
pidiendo borrarlo, y verificando los dos caminos: cancelar deja todo como estaba,
confirmar lo elimina del listado y del resumen.

**Acceptance Scenarios**:

1. **Given** que estoy en el detalle de un gasto, **When** pido borrarlo, **Then** aparece un pedido de confirmación antes de que se elimine nada.
2. **Given** que apareció la confirmación, **When** confirmo, **Then** el gasto se elimina, vuelvo al listado y ya no aparece ahí.
3. **Given** que apareció la confirmación, **When** cancelo, **Then** no se borra nada y sigo en el detalle del gasto.
4. **Given** que borré un gasto, **When** abro el resumen por categoría, **Then** el total de su categoría ya no lo incluye.
5. **Given** que borré el único gasto que quedaba, **When** vuelvo al listado, **Then** veo el estado vacío.

---

### User Story 5 - Ver el resumen por categoría (Priority: P5)

Como persona usuaria quiero una pantalla que me diga cuánto gasté en cada
categoría, para entender en qué se me va la plata sin tener que sumar a mano.

**Why this priority**: Es una vista derivada: no agrega ni modifica datos, los
interpreta. Entrega valor solo cuando ya hay gastos cargados, así que va última.

**Independent Test**: Se puede probar sola con datos de ejemplo conocidos: abrir
el resumen y verificar que el total de cada categoría coincide con la suma
manual de los gastos de esa categoría.

**Acceptance Scenarios**:

1. **Given** que hay gastos en varias categorías, **When** abro el resumen, **Then** veo una lista con cada categoría y el total gastado en ella.
2. **Given** que el resumen se está calculando, **When** miro la pantalla, **Then** veo un indicador de carga.
3. **Given** que no hay ningún gasto registrado, **When** abro el resumen, **Then** veo un mensaje de estado vacío en lugar de una lista de ceros.
4. **Given** que agrego un gasto nuevo, **When** abro el resumen, **Then** el total de su categoría ya lo incluye.

---

### Edge Cases

- **Monto con decimales**: se aceptan hasta dos decimales. Un monto con más decimales se rechaza o se redondea a dos de forma visible, nunca en silencio.
- **Monto con separador de miles o símbolo de moneda**: la entrada no se da por válida solo porque "parece" un número; debe poder interpretarse como valor numérico.
- **Monto extremadamente grande**: el listado y el resumen deben mostrarlo sin cortar el texto ni romper la fila.
- **Descripción muy larga**: el listado no la muestra; el detalle la muestra completa o recortada de forma legible, sin desbordar la pantalla.
- **Varios gastos con la misma fecha**: el orden entre ellos es estable y no cambia de una apertura a otra.
- **Fecha futura**: se permite registrarla, ya que la persona puede anticipar un gasto; queda documentado como decisión, no como omisión.
- **Categoría sin gastos**: no aparece en el resumen, para que la lista muestre solo categorías con movimiento.
- **Borrar el último gasto**: el listado y el resumen pasan a su estado vacío, no a una pantalla en blanco.
- **Abrir el detalle de un gasto que ya no existe**: se muestra un mensaje claro en lugar de una pantalla rota.
- **Falla al cargar datos**: cada pantalla que consulta datos muestra un mensaje de error y permite reintentar, sin dejar el indicador de carga girando para siempre.

## Requirements *(mandatory)*

### Functional Requirements

**Listado**

- **FR-001**: El sistema DEBE mostrar todos los gastos registrados en una única lista.
- **FR-002**: El sistema DEBE ordenar los gastos por fecha, del más reciente al más viejo.
- **FR-003**: Cada elemento del listado DEBE mostrar al menos monto, categoría y fecha.
- **FR-004**: El sistema DEBE permitir navegar desde un elemento del listado hasta el detalle de ese gasto.

**Detalle**

- **FR-005**: El sistema DEBE mostrar, en la pantalla de detalle, todos los datos del gasto: monto, categoría, fecha y descripción.
- **FR-006**: El sistema DEBE ofrecer, desde el detalle, la acción de borrar el gasto.

**Alta**

- **FR-007**: La persona usuaria DEBE poder registrar un gasto nuevo mediante un formulario.
- **FR-008**: El formulario DEBE precargar la fecha del día como valor por defecto.
- **FR-009**: El sistema DEBE rechazar el guardado cuando el monto está vacío, no es numérico, o es menor o igual a 0, y DEBE informar el motivo junto al campo.
- **FR-010**: El sistema DEBE rechazar el guardado cuando no se eligió categoría, y DEBE informar el motivo junto al campo.
- **FR-011**: El sistema DEBE aceptar el guardado con la descripción vacía, por ser un campo opcional.
- **FR-012**: El sistema DEBE limitar la elección de categoría a la lista fija: Comida, Transporte, Servicios, Ocio, Salud y Otros.
- **FR-013**: El sistema DEBE conservar los datos ya cargados en el formulario cuando una validación falla, sin vaciar los campos válidos.

**Borrado**

- **FR-014**: El sistema DEBE pedir confirmación explícita antes de borrar un gasto, en todos los casos y sin excepción.
- **FR-015**: El sistema DEBE eliminar el gasto únicamente si la persona confirma, y DEBE dejar todo sin cambios si cancela.

**Resumen**

- **FR-016**: El sistema DEBE mostrar, en una lista, el total gastado agrupado por categoría.
- **FR-017**: El resumen DEBE incluir solo las categorías que tienen al menos un gasto.

**Transversales**

- **FR-018**: El listado y el resumen DEBEN reflejar el alta y el borrado de gastos, sin requerir que la persona cierre y reabra la app.
- **FR-019**: Toda pantalla que consulte datos DEBE representar de forma visible los estados de carga, vacío y error.
- **FR-020**: El sistema DEBE permitir navegar entre las cuatro pantallas: listado, detalle, alta y resumen.
- **FR-021**: El sistema DEBE tratar todos los montos en una única moneda (pesos), sin ofrecer elección de moneda.
- **FR-022**: Los gastos registrados DEBEN seguir disponibles después de cerrar y volver a abrir la app.

### Key Entities

- **Gasto**: un movimiento de dinero registrado por la persona usuaria. Atributos: identificador propio, monto (numérico, mayor a 0, en pesos), categoría (una de la lista fija), fecha (requerida) y descripción o nota (texto libre, opcional).
- **Categoría**: etiqueta que clasifica un gasto. Conjunto fijo y cerrado de seis valores: Comida, Transporte, Servicios, Ocio, Salud, Otros. No se crean ni se editan desde la app.
- **Total por categoría**: valor derivado, no almacenado. Es la suma de los montos de todos los gastos de una misma categoría, y se recalcula cada vez que se consulta el resumen.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Una persona que nunca usó la app logra registrar su primer gasto en menos de 60 segundos desde que la abre, sin ayuda externa.
- **SC-002**: El 100% de los intentos de guardar un gasto con monto vacío, no numérico o menor o igual a 0 son rechazados con un mensaje visible junto al campo.
- **SC-003**: El 100% de los intentos de guardar un gasto sin categoría son rechazados con un mensaje visible junto al campo.
- **SC-004**: El 100% de los borrados pasa por un paso de confirmación; ningún gasto desaparece con una sola acción.
- **SC-005**: Después de agregar o borrar un gasto, el listado y el resumen muestran el cambio en la siguiente visita a esas pantallas, sin reiniciar la app.
- **SC-006**: En las cuatro pantallas, la persona nunca se queda frente a una pantalla en blanco sin explicación: siempre ve carga, contenido, mensaje de vacío o mensaje de error.
- **SC-007**: Los totales del resumen coinciden exactamente con la suma manual de los gastos de cada categoría, verificado sobre un conjunto de datos conocido.
- **SC-008**: Los gastos registrados siguen estando disponibles después de cerrar la app por completo y volver a abrirla.
- **SC-009**: Se puede llegar a cualquiera de las cuatro pantallas y volver atrás sin que la app quede en un estado del que no se pueda salir.

## Assumptions

Decisiones tomadas por defecto donde la descripción no fue explícita. Cada una
es reversible: si alguna no coincide con la intención, se ajusta la spec antes
de planificar.

- **Datos iniciales y persistencia**: los mocks aportan un conjunto de gastos de ejemplo la primera vez que se abre la app. A partir de ahí, lo que la persona agrega o borra se conserva localmente y manda por sobre los datos de ejemplo: un gasto borrado no reaparece al reabrir la app. Esta suposición concilia "los datos vienen de mocks" con el requisito de que los gastos sobrevivan al cierre.
- **La fecha es editable**: viene precargada con la de hoy, pero la persona puede cambiarla al registrar un gasto pasado.
- **Se permiten fechas futuras**: no se bloquean, porque alguien puede querer anticipar un gasto ya comprometido.
- **Montos con hasta dos decimales**: se corresponde con centavos y es lo esperable para dinero.
- **Un solo usuario, sin cuentas**: no hay login ni separación de datos por persona; la app asume un único dueño del dispositivo.
- **Sin conectividad**: la app funciona entera sin red, ya que no hay backend.
- **El orden del listado es por fecha del gasto**, no por momento de carga. Entre gastos de la misma fecha, el orden es estable.
- **El resumen no muestra un total general**: la descripción pide total por categoría; un total global se puede agregar más adelante si se pide.

## Out of Scope

Queda explícitamente fuera de esta feature:

- Editar un gasto ya registrado.
- Login, cuentas de usuario o perfiles.
- Sincronización o respaldo en la nube.
- Presupuestos o límites por categoría.
- Múltiples monedas o conversión.
- Exportar datos en cualquier formato.
- Adjuntar imágenes o tickets a un gasto.
- Gráficos de cualquier tipo; el resumen es una lista.
