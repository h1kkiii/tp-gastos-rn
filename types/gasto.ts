// Tipos del dominio. Los comparten pantallas, componentes y la capa de servicios.

/** Las seis categorías fijas, en el orden en que se muestran. */
export const CATEGORIAS = [
  'Comida',
  'Transporte',
  'Servicios',
  'Ocio',
  'Salud',
  'Otros',
] as const;

/** Una categoría válida. El tipo sale del arreglo, así no pueden divergir. */
export type Categoria = (typeof CATEGORIAS)[number];

/** Un gasto registrado. Todos los montos están en pesos: no hay multi-moneda. */
export interface Gasto {
  id: string;
  /** Mayor a 0, con hasta dos decimales. */
  monto: number;
  categoria: Categoria;
  /** Formato ISO AAAA-MM-DD, para que ordene bien como texto. */
  fecha: string;
  /** Opcional para la persona usuaria: cuando no hay, se guarda cadena vacía. */
  descripcion: string;
  /** Momento de creación. No se muestra; desempata el orden entre gastos de igual fecha. */
  creadoEn: number;
}

/** Total gastado en una categoría. Es un valor derivado: se calcula, no se guarda. */
export interface ResumenCategoria {
  categoria: Categoria;
  total: number;
}
