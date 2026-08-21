# Contrato: capa de datos (`services/gastos-service.ts`)

**Fase 1** del plan. Esta es la única superficie por la que las pantallas acceden
a datos. Es la costura que un backend real reemplazaría: si estas cinco firmas y
su comportamiento se mantienen, ninguna pantalla necesita cambiar.

## Reglas que aplican a todas las funciones

1. **Todas son `async`.** Ninguna devuelve datos de forma sincrónica, ni siquiera
   cuando podría. Cambiar eso más adelante rompería a todos los llamadores.
2. **Latencia simulada de 500 a 1000 ms** en cada llamada, antes de resolver
   (constitución, principio II). No es decorativa: hace que los estados de carga
   sean reales y verificables.
3. **Los errores se lanzan**, no se devuelven como valor. El llamador los captura
   y muestra su estado de error (FR-019).
4. **Ninguna pantalla importa AsyncStorage ni los mocks.** Si una pantalla
   necesita un dato, pasa por acá.
5. **Las funciones no validan la entrada del formulario.** Esa validación ocurre
   antes, en la pantalla de alta (FR-009 a FR-013). El servicio asume datos ya
   válidos.

---

## `obtenerGastos(): Promise<Gasto[]>`

Devuelve todos los gastos, **ya ordenados** del más reciente al más viejo, con
desempate estable por `creadoEn`.

- **Devuelve**: arreglo de `Gasto`. Vacío si no hay ninguno — el vacío es un
  resultado válido, no un error.
- **Lanza**: si el almacenamiento no se puede leer o el contenido está corrupto.
- **Requisitos**: FR-001, FR-002, FR-003.
- **Nota**: el orden es responsabilidad del servicio, no de la pantalla. Así el
  listado no puede mostrarlos desordenados por olvido.

---

## `obtenerGastoPorId(id: string): Promise<Gasto>`

Devuelve un gasto puntual.

- **Devuelve**: el `Gasto` con ese `id`.
- **Lanza**: si no existe un gasto con ese `id`, o si falla la lectura.
- **Requisitos**: FR-005.
- **Nota**: lanzar ante un `id` inexistente es deliberado. Cubre el caso de la
  spec en que se abre el detalle de un gasto ya borrado: la pantalla lo captura y
  muestra un mensaje claro en vez de romperse.

---

## `crearGasto(datos): Promise<Gasto>`

Registra un gasto nuevo.

**Entrada**: los campos que carga la persona, sin `id` ni `creadoEn`.

```
{
  monto: number         // ya validado: > 0, con hasta dos decimales
  categoria: Categoria
  fecha: string         // ISO AAAA-MM-DD
  descripcion: string   // puede ser cadena vacía
}
```

- **Devuelve**: el `Gasto` completo, con el `id` y el `creadoEn` que asignó el
  servicio.
- **Lanza**: si no se puede escribir en el almacenamiento.
- **Requisitos**: FR-007, FR-022.
- **Nota**: el `id` y el `creadoEn` los genera el servicio, nunca la pantalla. Es
  lo que hoy haría el backend, y mantenerlo acá evita que la pantalla se ocupe de
  algo que después dejaría de ser suyo.

---

## `borrarGasto(id: string): Promise<void>`

Elimina un gasto.

- **Devuelve**: nada.
- **Lanza**: si el gasto no existe o si falla la escritura.
- **Requisitos**: FR-015, FR-022.
- **Nota**: el servicio **no** pide confirmación. La confirmación es una decisión
  de interfaz y vive en la pantalla de detalle (FR-014). Cuando esta función se
  llama, ya se confirmó.

---

## `obtenerResumenPorCategoria(): Promise<ResumenCategoria[]>`

Devuelve el total gastado por categoría.

- **Devuelve**: arreglo de `ResumenCategoria`, solo con categorías que tienen al
  menos un gasto (FR-017), en el orden de `CATEGORIAS`. Vacío si no hay gastos.
- **Lanza**: si falla la lectura.
- **Requisitos**: FR-016, FR-017.
- **Nota**: el cálculo vive acá, no en la pantalla. La pantalla de resumen
  muestra lo que recibe; no suma nada. Cuando exista backend, este total podría
  venir calculado del servidor sin que la pantalla se entere.

---

## Qué cambia cuando llegue un backend real

Solo el cuerpo de estas cinco funciones: donde hoy hay `setTimeout` más
AsyncStorage, iría una llamada de red. No cambian sus firmas, ni el orden
garantizado, ni el hecho de que lancen ante error. Tampoco cambia ninguna
pantalla, ningún componente y ningún tipo de `types/gasto.ts`.

Los archivos `services/almacenamiento.ts` y `services/mocks-gastos.ts` son
detalles internos de esta capa: se borran junto con la implementación mock.
