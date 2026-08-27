// Conversión y validación de fechas. Hay dos representaciones: ISO AAAA-MM-DD
// para guardar y ordenar, y dd/mm/aaaa para mostrar y escribir.

/** Acepta la forma dd/mm/aaaa: dos dígitos, dos dígitos, cuatro dígitos. */
const FORMATO_DD_MM_AAAA = /^(\d{2})\/(\d{2})\/(\d{4})$/;

/** Acepta la forma ISO AAAA-MM-DD. */
const FORMATO_ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Antepone un cero a los números de un solo dígito. */
function conDosDigitos(numero: number): string {
  return String(numero).padStart(2, '0');
}

/**
 * ¿Existe ese día en el calendario? Se construye la fecha en horario local y se
 * comparan sus partes con las de entrada: si no coinciden, el día no existía y
 * Date lo corrió solo (31/02 se vuelve 03/03, por ejemplo).
 */
function existeEnCalendario(anio: number, mes: number, dia: number): boolean {
  const fecha = new Date(anio, mes - 1, dia);
  return (
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia
  );
}

/**
 * Pasa dd/mm/aaaa a ISO AAAA-MM-DD.
 * Devuelve null si el texto no tiene ese formato o si el día no existe.
 */
export function aIsoDesdeDdMmAaaa(texto: string): string | null {
  const partes = FORMATO_DD_MM_AAAA.exec(texto.trim());
  if (!partes) return null;

  const dia = Number(partes[1]);
  const mes = Number(partes[2]);
  const anio = Number(partes[3]);
  if (!existeEnCalendario(anio, mes, dia)) return null;

  return `${partes[3]}-${partes[2]}-${partes[1]}`;
}

/**
 * Pasa ISO AAAA-MM-DD a dd/mm/aaaa, que es como se lee en pantalla.
 * Devuelve null si el texto no tiene ese formato o si el día no existe.
 */
export function aDdMmAaaaDesdeIso(iso: string): string | null {
  const partes = FORMATO_ISO.exec(iso.trim());
  if (!partes) return null;

  const anio = Number(partes[1]);
  const mes = Number(partes[2]);
  const dia = Number(partes[3]);
  if (!existeEnCalendario(anio, mes, dia)) return null;

  return `${partes[3]}/${partes[2]}/${partes[1]}`;
}

/**
 * ¿El texto es una fecha dd/mm/aaaa válida? Chequea formato y existencia real.
 * Se permiten fechas futuras: la spec no las restringe.
 */
export function esFechaValida(texto: string): boolean {
  return aIsoDesdeDdMmAaaa(texto) !== null;
}

/** La fecha de hoy en ISO, para precargar el formulario de alta. */
export function hoyIso(): string {
  const hoy = new Date();
  return `${hoy.getFullYear()}-${conDosDigitos(hoy.getMonth() + 1)}-${conDosDigitos(hoy.getDate())}`;
}
