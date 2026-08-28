# Data Model: Gestión de gastos personales

**Fase 1** del plan. Entidades, reglas de validación y forma de persistencia.
Todo vive en `types/gasto.ts` salvo lo que se indique.

---

## Categoria

Conjunto cerrado de seis valores. No se crean ni se editan desde la app (FR-012).

```
Categoria = "Comida" | "Transporte" | "Servicios" | "Ocio" | "Salud" | "Otros"
```

Se acompaña de una constante `CATEGORIAS` con los seis valores en ese orden, que
es la única fuente para poblar el selector del formulario y para recorrer el
resumen. El orden es el de la spec, no alfabético.

---

## Gasto

Un movimiento de dinero registrado por la persona usuaria.

| Campo | Tipo | Requerido | Reglas |
|---|---|---|---|
| `id` | `string` | sí | Único. Generado al crear, nunca lo ingresa la persona. |
| `monto` | `number` | sí | Mayor a 0. Máximo dos decimales; se redondea al guardar. |
| `categoria` | `Categoria` | sí | Uno de los seis valores fijos. |
| `fecha` | `string` | sí | Formato ISO `AAAA-MM-DD`. Se permite fecha futura. |
| `descripcion` | `string` | no | Texto libre. Vacío se guarda como cadena vacía, no como ausente. |
| `creadoEn` | `number` | sí | Marca de tiempo de creación. No se muestra; existe solo para desempatar el orden. |

**Sin campo de moneda.** FR-021 fija pesos como única moneda; agregarlo sería
modelar algo que la spec deja explícitamente fuera de alcance.

### Reglas de validación (formulario de alta)

Derivadas de FR-009 a FR-013. Se evalúan antes de llamar al servicio; ninguna
entrada inválida llega a `services/`.

| Campo | Regla | Mensaje (español, junto al campo) |
|---|---|---|
| monto | No vacío | "Ingresá un monto." |
| monto | Interpretable como número (acepta coma o punto decimal) | "El monto tiene que ser un número." |
| monto | Hasta dos decimales | "El monto puede tener hasta dos decimales." |
| monto | Mayor a 0 | "El monto tiene que ser mayor a 0." |
| categoría | Elegida | "Elegí una categoría." |
| fecha | No vacía | "Ingresá una fecha." |
| fecha | Formato `dd/mm/aaaa` y fecha existente en el calendario | "Ingresá una fecha válida con formato dd/mm/aaaa." |
| descripción | — | Sin validación: es opcional (FR-011). |

Al fallar una validación, los demás campos conservan lo cargado (FR-013). El
mensaje de un campo desaparece en cuanto ese campo se corrige.

**Sobre el separador decimal**: cualquier coma o punto se interpreta como
separador decimal, y **no se acepta separador de miles**. Un texto como `1.234`
es ambiguo —¿mil doscientos treinta y cuatro, o uno con tres decimales?— y la
spec pide que la entrada no se dé por válida solo porque "parece" un número. Por
eso `1.234` se lee como tres decimales y cae en la regla de los dos decimales.

La regla de los dos decimales se agregó en T015: la spec contempla que un monto
con más decimales "se rechaza o se redondea a dos de forma visible, nunca en
silencio", y esta tabla no tenía un mensaje para ese caso. Se eligió rechazar con
un mensaje propio en lugar de reescribir el campo mientras la persona escribe.

El orden de evaluación del monto importa: primero se interpreta el texto como
número —el signo menos se acepta en esta etapa— y recién después se juzga su
valor. Así `-50` recibe "El monto tiene que ser mayor a 0." y no "El monto tiene
que ser un número.", que es lo que pide el guion de `quickstart.md`.

### Formato de fecha: dos representaciones

- **Almacenamiento y orden**: ISO `AAAA-MM-DD`. Ordena correctamente como texto,
  sin parsear.
- **Pantalla y entrada**: `dd/mm/aaaa`, que es lo que se lee y se escribe en
  Argentina.

La conversión entre ambas vive en una función auxiliar, no repartida por las
pantallas.

### Orden del listado

FR-002 pide del más reciente al más viejo. La spec además exige que el orden sea
**estable** entre aperturas cuando dos gastos comparten fecha.

```
ordenar por fecha descendente
  y, a igual fecha, por creadoEn descendente
```

`creadoEn` existe únicamente para esto: sin él, dos gastos del mismo día
quedarían en orden indefinido y podrían intercambiarse entre aperturas.

---

## ResumenCategoria

Valor **derivado**, nunca almacenado. Se recalcula en cada consulta al resumen.

| Campo | Tipo | Descripción |
|---|---|---|
| `categoria` | `Categoria` | La categoría agrupada. |
| `total` | `number` | Suma de los montos de todos los gastos de esa categoría. |

**Reglas**:

- Solo se incluyen categorías con al menos un gasto (FR-017). Una categoría sin
  movimiento no aparece como fila en cero.
- El orden de las filas sigue el de `CATEGORIAS`, no el del total.
- No hay fila de total general: la spec pide total por categoría y nada más.
- Si no hay ningún gasto, el resultado es una lista vacía, y la pantalla muestra
  su estado vacío en lugar de una lista de ceros.

---

## Persistencia

**Clave de AsyncStorage**: `gastos-app:gastos` (una sola clave).

**Contenido**: el arreglo completo de `Gasto` serializado como JSON.

**Primer arranque**: si la clave no existe, se escribe la semilla de
`services/mocks-gastos.ts` antes de la primera lectura. Ver
[research.md, decisión 1](./research.md#decisión-1-convivencia-de-mocks-y-asyncstorage).

**Lecturas y escrituras posteriores**: siempre contra AsyncStorage. Los mocks no
se vuelven a consultar.

**Datos corruptos**: si el JSON guardado no se puede parsear, la capa de
almacenamiento lo trata como un fallo de lectura y la pantalla muestra su estado
de error (FR-019), en vez de romperse o borrar lo guardado en silencio.

---

## Semilla de ejemplo

`services/mocks-gastos.ts` incluye entre 5 y 8 gastos que cubren al menos cuatro
categorías distintas y varias fechas, con al menos dos compartiendo fecha. Así el
listado, el orden estable y el resumen se pueden verificar apenas se abre la app,
sin cargar nada a mano.
