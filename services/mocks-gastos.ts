// Semilla de gastos de ejemplo. Se escribe una sola vez, cuando la app arranca
// y todavía no hay nada guardado; después se trabaja siempre contra
// AsyncStorage. Es un detalle interno de la capa de datos: se borra el día que
// haya un backend real.

import type { Gasto } from '@/types/gasto';

/**
 * Seis gastos de ejemplo, con datos elegidos para que se pueda verificar la app
 * apenas se abre:
 * - Cinco categorías de las seis; "Otros" queda vacía a propósito, para
 *   comprobar que el resumen no lista categorías sin gastos.
 * - Dos gastos comparten el 20/08, con distinto `creadoEn`: sirven para probar
 *   que el orden del listado es estable entre aperturas.
 * - Uno sin descripción, para el caso de descripción vacía en el detalle.
 *
 * Las fechas son fijas y no se calculan desde hoy: así el guion de verificación
 * manual da el mismo resultado cada vez que se corre.
 */
export const GASTOS_SEMILLA: Gasto[] = [
  {
    id: 'g1',
    monto: 12500,
    categoria: 'Servicios',
    fecha: '2026-08-22',
    descripcion: 'Factura de luz',
    creadoEn: 1787405400000, // 22/08 10:30
  },
  {
    id: 'g2',
    monto: 3480.5,
    categoria: 'Comida',
    fecha: '2026-08-21',
    descripcion: 'Compra en el supermercado',
    creadoEn: 1787350500000, // 21/08 19:15
  },
  {
    id: 'g3',
    monto: 1200,
    categoria: 'Transporte',
    fecha: '2026-08-20',
    descripcion: 'Carga de SUBE',
    creadoEn: 1787262000000, // 20/08 18:40
  },
  {
    id: 'g4',
    monto: 8900.75,
    categoria: 'Ocio',
    fecha: '2026-08-20',
    descripcion: 'Entradas de cine',
    creadoEn: 1787270700000, // 20/08 21:05
  },
  {
    id: 'g5',
    monto: 6300,
    categoria: 'Salud',
    fecha: '2026-08-18',
    descripcion: '',
    creadoEn: 1787055600000, // 18/08 09:20
  },
  {
    id: 'g6',
    monto: 2150.25,
    categoria: 'Comida',
    fecha: '2026-08-17',
    descripcion: 'Almuerzo fuera de casa',
    creadoEn: 1786985100000, // 17/08 13:45
  },
];
