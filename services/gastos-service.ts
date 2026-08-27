// Capa de datos: la única superficie por la que las pantallas acceden a gastos.
// Ninguna pantalla importa AsyncStorage ni los mocks; todo pasa por acá.
// Cuando exista un backend real, solo cambia el cuerpo de estas cinco funciones.

import { guardarGastos, leerGastos } from '@/services/almacenamiento';
import { CATEGORIAS, type Categoria, type Gasto, type ResumenCategoria } from '@/types/gasto';

/** Los campos que carga la persona. El id y el creadoEn los pone el servicio. */
export interface DatosNuevoGasto {
  monto: number;
  categoria: Categoria;
  /** Formato ISO AAAA-MM-DD. */
  fecha: string;
  /** Puede ser cadena vacía. */
  descripcion: string;
}

/**
 * Espera entre 500 y 1000 ms antes de resolver.
 * No es decorativa: hace que los estados de carga de las pantallas sean reales
 * y verificables, en vez de un parpadeo que nadie llega a ver.
 */
function demorar(): Promise<void> {
  const espera = 500 + Math.random() * 500;
  return new Promise((resolver) => setTimeout(resolver, espera));
}

/**
 * Del más reciente al más viejo. A igual fecha desempata `creadoEn`, así el
 * orden es el mismo en cada apertura y no queda librado al azar.
 */
function ordenarPorFecha(gastos: Gasto[]): Gasto[] {
  return [...gastos].sort((a, b) =>
    a.fecha === b.fecha ? b.creadoEn - a.creadoEn : b.fecha.localeCompare(a.fecha)
  );
}

/**
 * Identificador único, sin dependencias nuevas: el momento de creación más un
 * sufijo aleatorio. Para que se repita harían falta el mismo milisegundo y el
 * mismo sufijo a la vez.
 */
function generarId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

/** Deja el monto en dos decimales. Normaliza, no valida: eso es del formulario. */
function redondearMonto(monto: number): number {
  return Math.round(monto * 100) / 100;
}

/**
 * Todos los gastos, ya ordenados. Que el orden sea responsabilidad del servicio
 * y no de la pantalla evita que el listado los muestre desordenados por olvido.
 * Un arreglo vacío es un resultado válido, no un error.
 */
export async function obtenerGastos(): Promise<Gasto[]> {
  await demorar();
  return ordenarPorFecha(await leerGastos());
}

/**
 * Un gasto puntual. Lanza si no existe: cubre el caso de abrir el detalle de un
 * gasto ya borrado, para que la pantalla muestre un mensaje claro.
 */
export async function obtenerGastoPorId(id: string): Promise<Gasto> {
  await demorar();
  const gasto = (await leerGastos()).find((g) => g.id === id);
  if (!gasto) {
    throw new Error('No se encontró el gasto.');
  }
  return gasto;
}

/** Registra un gasto nuevo y lo devuelve ya completo, con su id y su creadoEn. */
export async function crearGasto(datos: DatosNuevoGasto): Promise<Gasto> {
  await demorar();
  const gastos = await leerGastos();
  const nuevo: Gasto = {
    id: generarId(),
    monto: redondearMonto(datos.monto),
    categoria: datos.categoria,
    fecha: datos.fecha,
    descripcion: datos.descripcion,
    creadoEn: Date.now(),
  };
  await guardarGastos([...gastos, nuevo]);
  return nuevo;
}

/**
 * Elimina un gasto. Lanza si no existe.
 * No pide confirmación: eso es una decisión de interfaz y vive en la pantalla
 * de detalle. Cuando esta función se llama, ya se confirmó.
 */
export async function borrarGasto(id: string): Promise<void> {
  await demorar();
  const gastos = await leerGastos();
  const restantes = gastos.filter((g) => g.id !== id);
  if (restantes.length === gastos.length) {
    throw new Error('No se encontró el gasto.');
  }
  await guardarGastos(restantes);
}

/**
 * Total gastado por categoría, en el orden de CATEGORIAS.
 * Solo aparecen las categorías con al menos un gasto: una categoría sin
 * movimiento no se muestra como fila en cero. El cálculo vive acá y no en la
 * pantalla, que se limita a mostrar lo que recibe.
 */
export async function obtenerResumenPorCategoria(): Promise<ResumenCategoria[]> {
  await demorar();
  const gastos = await leerGastos();

  return CATEGORIAS.map((categoria) => gastos.filter((g) => g.categoria === categoria))
    .filter((delRubro) => delRubro.length > 0)
    .map((delRubro) => ({
      categoria: delRubro[0].categoria,
      total: redondearMonto(delRubro.reduce((suma, g) => suma + g.monto, 0)),
    }));
}
