// Formato de montos para mostrar en pantalla. Todos los montos están en pesos:
// no hay multi-moneda, así que el símbolo es fijo.
//
// Se formatea a mano y no con Intl.NumberFormat a propósito: Intl depende de los
// datos de locale del dispositivo, que en Android viejo pueden no estar, y el
// mismo monto se vería distinto según el teléfono.

/** Antepone ceros hasta llegar a dos dígitos. */
function dosDecimales(centavos: number): string {
  return String(centavos).padStart(2, '0');
}

/** Inserta el punto de miles cada tres dígitos, de derecha a izquierda. */
function conSeparadorDeMiles(entero: string): string {
  let resultado = '';
  for (let i = 0; i < entero.length; i++) {
    // Se corta cada tres dígitos contando desde el final, no desde el principio.
    if (i > 0 && (entero.length - i) % 3 === 0) resultado += '.';
    resultado += entero[i];
  }
  return resultado;
}

/**
 * Devuelve el monto como se lee en Argentina: punto para los miles y coma para
 * los decimales, siempre con dos decimales. 3480.5 se muestra "$3.480,50".
 *
 * Los negativos no deberían llegar acá —el formulario los rechaza— pero si
 * llegan se muestran con el signo antes del símbolo, en vez de perderse.
 */
export function formatearMonto(monto: number): string {
  const negativo = monto < 0;

  // Se trabaja en centavos para no arrastrar el error de punto flotante al
  // separar la parte entera de la decimal.
  const centavosTotales = Math.round(Math.abs(monto) * 100);
  const entero = Math.floor(centavosTotales / 100);
  const centavos = centavosTotales % 100;

  return `${negativo ? '-' : ''}$${conSeparadorDeMiles(String(entero))},${dosDecimales(centavos)}`;
}
