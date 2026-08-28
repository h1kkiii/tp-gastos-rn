// Reglas de validación del formulario de alta (FR-009 a FR-013).
// Se evalúan antes de llamar al servicio: ninguna entrada inválida llega a
// services/. Los mensajes salen de la tabla de data-model.md.

import type { DatosNuevoGasto } from '@/services/gastos-service';
import type { Categoria } from '@/types/gasto';
import { aIsoDesdeDdMmAaaa } from '@/utils/fecha';

/** Lo que la persona cargó en el formulario, todo como texto salvo la categoría. */
export type EntradaFormulario = {
  monto: string;
  categoria: Categoria | null;
  fecha: string;
  descripcion: string;
};

/** Un mensaje por campo. Vacío significa que no hay nada que corregir. */
export type ErroresFormulario = {
  monto?: string;
  categoria?: string;
  fecha?: string;
};

/**
 * Un solo separador decimal —coma o punto— y hasta dos decimales.
 * No se acepta separador de miles: "1.234" es ambiguo (¿mil doscientos o uno
 * con tres decimales?) y la spec pide que la entrada no se dé por válida solo
 * porque "parece" un número.
 *
 * El signo menos se acepta acá y se rechaza después, por el monto en sí: así
 * "-50" recibe "tiene que ser mayor a 0" y no "tiene que ser un número", que es
 * lo que pide el guion de verificación.
 */
const FORMATO_MONTO = /^-?\d+([.,]\d{1,2})?$/;

/** El mismo texto pero con más de dos decimales: sirve para explicar por qué falla. */
const MONTO_CON_DEMASIADOS_DECIMALES = /^-?\d+[.,]\d{3,}$/;

/**
 * Valida los cuatro campos y, si están bien, devuelve los datos ya convertidos:
 * el monto como número y la fecha en ISO.
 *
 * Devolver también los datos es deliberado: validar el monto ya implica
 * interpretarlo, y validar la fecha ya implica convertirla. Si esta función solo
 * dijera "sí o no", la pantalla tendría que repetir ambas conversiones, con el
 * riesgo de que no coincidan.
 */
export function validarGasto(entrada: EntradaFormulario): {
  errores: ErroresFormulario;
  datos: DatosNuevoGasto | null;
} {
  const errores: ErroresFormulario = {};

  const montoTexto = entrada.monto.trim();
  const fechaTexto = entrada.fecha.trim();

  // --- Monto ---
  let monto = 0;
  if (montoTexto === '') {
    errores.monto = 'Ingresá un monto.';
  } else if (MONTO_CON_DEMASIADOS_DECIMALES.test(montoTexto)) {
    errores.monto = 'El monto puede tener hasta dos decimales.';
  } else if (!FORMATO_MONTO.test(montoTexto)) {
    errores.monto = 'El monto tiene que ser un número.';
  } else {
    // La coma se pasa a punto porque es lo que Number entiende.
    monto = Number(montoTexto.replace(',', '.'));
    if (monto <= 0) {
      errores.monto = 'El monto tiene que ser mayor a 0.';
    }
  }

  // --- Categoría ---
  if (!entrada.categoria) {
    errores.categoria = 'Elegí una categoría.';
  }

  // --- Fecha ---
  // Se permiten fechas futuras: así lo fija el supuesto de la spec.
  const fechaIso = aIsoDesdeDdMmAaaa(fechaTexto);
  if (fechaTexto === '') {
    errores.fecha = 'Ingresá una fecha.';
  } else if (!fechaIso) {
    errores.fecha = 'Ingresá una fecha válida con formato dd/mm/aaaa.';
  }

  // La descripción no se valida: es opcional (FR-011).

  const hayErrores = Object.keys(errores).length > 0;
  if (hayErrores || !entrada.categoria || !fechaIso) {
    return { errores, datos: null };
  }

  return {
    errores,
    datos: {
      monto,
      categoria: entrada.categoria,
      fecha: fechaIso,
      descripcion: entrada.descripcion.trim(),
    },
  };
}
