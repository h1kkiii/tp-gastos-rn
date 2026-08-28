import { useCarga } from '@/hooks/use-carga';
import { obtenerGastos } from '@/services/gastos-service';

/**
 * Los gastos del listado, con los tres estados y el refresco al ganar foco.
 * Todo eso vive en `use-carga`: acá solo se elige de dónde salen los datos.
 *
 * El vacío no es un error: sin gastos, `gastos` queda en `[]` y `error` en
 * `null`. Es lo que le permite a la pantalla elegir entre el estado vacío y el
 * de error.
 */
export function useGastos() {
  const { datos, cargando, error, recargar } = useCarga(obtenerGastos);

  // La pantalla siempre recibe un arreglo, así no tiene que chequear null antes
  // de recorrerlo ni de preguntar si está vacío.
  return { gastos: datos ?? [], cargando, error, recargar };
}
