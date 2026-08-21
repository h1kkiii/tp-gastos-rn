# Quickstart: verificación en Expo Go

**Fase 1** del plan. Guion de prueba manual. En este proyecto no hay suite
automatizada: según la constitución, la compuerta de calidad es probar en el
teléfono con Expo Go, así que este archivo *es* el procedimiento de verificación.

## Requisitos previos

- Node instalado y `npm install` ya corrido en la raíz del proyecto.
- La app Expo Go instalada en el teléfono.
- Teléfono y computadora en la misma red.

## Puesta en marcha

```bash
npm install
npm start
```

Escaneá el QR con Expo Go. Para chequeo estático, aparte:

```bash
npm run lint
```

## Cómo empezar de cero

Varias pruebas dependen del primer arranque o del estado vacío. Para volver al
estado inicial, desinstalá la app desde Expo Go (o borrá sus datos) y volvé a
abrir el proyecto: se vuelve a sembrar la semilla de ejemplo.

---

## Recorrido de verificación

Cada bloque indica qué criterio de éxito de la spec cubre.

### 1. Listado y estados — SC-006

1. Abrí la app recién instalada.
2. Mientras carga, **esperá ver el indicador**: la latencia simulada es de
   500–1000 ms, así que tiene que ser visible.
3. Verificá que aparecen los gastos de ejemplo, cada uno con monto, categoría y
   fecha.
4. Confirmá que están ordenados del más reciente al más viejo.

### 2. Orden estable — spec, edge cases

1. Ubicá los dos gastos de ejemplo que comparten fecha.
2. Cerrá la app por completo y volvé a abrirla, tres veces.
3. El orden entre esos dos **no debe cambiar** entre aperturas.

### 3. Alta válida — SC-001, SC-005

1. Andá a la pestaña de alta.
2. Confirmá que la fecha viene precargada con la de hoy.
3. Cargá monto, categoría y, si querés, descripción. Guardá.
4. Verificá que volvés al listado y que el gasto aparece en la posición que le
   toca por fecha.
5. Cronometrá: desde abrir la app hasta guardar debería llevar menos de 60 s.

### 4. Validación del monto — SC-002

Probá guardar, una por una, con estas entradas en monto. **Ninguna** debe
guardar, y cada una debe mostrar un mensaje junto al campo:

| Entrada | Qué se espera |
|---|---|
| (vacío) | "Ingresá un monto." |
| `abc` | "El monto tiene que ser un número." |
| `0` | "El monto tiene que ser mayor a 0." |
| `-50` | "El monto tiene que ser mayor a 0." |

Después corregí el monto y verificá que el mensaje desaparece y que **los demás
campos conservan lo que habías cargado**.

### 5. Validación de categoría — SC-003

1. Completá monto y fecha válidos, sin elegir categoría.
2. Intentá guardar: no debe guardar, y debe aparecer "Elegí una categoría."

### 6. Validación de fecha

1. Escribí `31/02/2026` y guardá: debe rechazarla, porque no existe.
2. Escribí una fecha futura y guardá: **debe aceptarla**, según el supuesto de la
   spec.

### 7. Descripción opcional

1. Cargá un gasto dejando la descripción vacía: debe guardar sin problema.
2. Abrí su detalle: la pantalla no debe romperse por la descripción ausente.

### 8. Detalle — FR-005

1. Tocá un gasto del listado.
2. Verificá que ves monto, categoría, fecha y descripción.
3. Volvé atrás y confirmá que el listado quedó igual.

### 9. Borrado con confirmación — SC-004

1. En el detalle de un gasto, pedí borrarlo.
2. **Cancelá**: no debe borrarse nada y tenés que seguir en el detalle.
3. Pedí borrarlo de nuevo y **confirmá**: vuelve al listado y el gasto ya no está.
4. En ningún momento un gasto debe desaparecer con una sola acción.

### 10. Resumen — SC-007

1. Andá a la pestaña de resumen. Verificá que se ve el indicador de carga.
2. Sumá a mano los gastos de una categoría en el listado y compará con el total
   del resumen: tienen que coincidir exactamente.
3. Confirmá que **no aparecen** categorías sin gastos.
4. Agregá un gasto nuevo y volvé al resumen: el total de su categoría debe
   incluirlo.
5. Borrá ese gasto y volvé: el total debe volver al valor anterior.

### 11. Estado vacío — SC-006

1. Borrá todos los gastos, uno por uno.
2. Listado: debe mostrar el mensaje de vacío, no una pantalla en blanco.
3. Resumen: debe mostrar el mensaje de vacío, no una lista de ceros.

### 12. Persistencia — SC-008

1. Con al menos un gasto propio cargado y otro borrado, cerrá la app por completo.
2. Volvé a abrirla.
3. El gasto que agregaste **sigue estando**.
4. El que borraste **no reaparece**.

### 13. Navegación — SC-009

1. Recorré las cuatro pantallas: listado, alta, resumen y detalle.
2. Desde cada una, volvé atrás.
3. La app no debe quedar en ningún estado del que no se pueda salir.

---

## Referencias

- Entidades y reglas de validación: [data-model.md](./data-model.md)
- Contrato de la capa de datos: [contracts/services.md](./contracts/services.md)
- Decisiones técnicas: [research.md](./research.md)
