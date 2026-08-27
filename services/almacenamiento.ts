// Lectura y escritura de los gastos en AsyncStorage. Es un detalle interno de la
// capa de datos: ninguna pantalla importa este archivo, todas pasan por
// gastos-service.ts. El día que haya un backend real, esto se borra.

import AsyncStorage from '@react-native-async-storage/async-storage';

import { GASTOS_SEMILLA } from '@/services/mocks-gastos';
import type { Gasto } from '@/types/gasto';

/** Única clave usada. Guarda el arreglo completo de gastos como JSON. */
export const CLAVE_GASTOS = 'gastos-app:gastos';

/** Mensaje único para cualquier fallo de lectura, lo vea quien lo vea. */
const ERROR_LECTURA = 'No se pudieron leer los gastos guardados.';

/**
 * Convierte el texto guardado en un arreglo de gastos.
 * Lanza si el JSON no parsea o si no es un arreglo: en ambos casos lo guardado
 * no es utilizable y la pantalla tiene que mostrar su estado de error.
 */
function parsearGastos(crudo: string): Gasto[] {
  let datos: unknown;
  try {
    datos = JSON.parse(crudo);
  } catch {
    throw new Error(ERROR_LECTURA);
  }
  if (!Array.isArray(datos)) {
    throw new Error(ERROR_LECTURA);
  }
  return datos as Gasto[];
}

/**
 * Devuelve los gastos guardados, sin ordenar: de eso se encarga el servicio.
 *
 * En el primer arranque la clave no existe todavía: ahí se escribe la semilla y
 * se devuelve. Es la única vez que se consultan los mocks; después manda siempre
 * lo guardado, así un gasto borrado no reaparece.
 *
 * Lanza si el almacenamiento falla o si el contenido está corrupto. El JSON
 * corrupto NO se repara sembrando encima: eso destruiría los gastos reales de la
 * persona sin avisar. Se informa el error y se deja lo guardado como está.
 */
export async function leerGastos(): Promise<Gasto[]> {
  const crudo = await AsyncStorage.getItem(CLAVE_GASTOS);

  if (crudo === null) {
    await guardarGastos(GASTOS_SEMILLA);
    return [...GASTOS_SEMILLA];
  }

  return parsearGastos(crudo);
}

/**
 * Guarda el arreglo completo, pisando lo anterior. No hay escritura parcial: a
 * esta escala reescribir todo es más simple y no se puede desincronizar.
 */
export async function guardarGastos(gastos: Gasto[]): Promise<void> {
  await AsyncStorage.setItem(CLAVE_GASTOS, JSON.stringify(gastos));
}
