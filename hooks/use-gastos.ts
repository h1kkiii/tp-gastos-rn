import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';

import { obtenerGastos } from '@/services/gastos-service';
import type { Gasto } from '@/types/gasto';

/**
 * Carga los gastos y expone los tres estados que pide toda pantalla.
 * `error` ya viene con el mensaje listo para `EstadoError`, y `recargar` es lo
 * que va en su acción de reintentar.
 *
 * El vacío no es un error: si no hay gastos, `gastos` queda en `[]` y `error`
 * en `null`. Es lo que le permite a la pantalla elegir entre el estado vacío y
 * el de error.
 */
export function useGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Se marca al perder el foco. Con 500–1000 ms de latencia hay tiempo de sobra
  // para irse de la pantalla antes de que llegue la respuesta, y escribir estado
  // sobre un componente desmontado sería un error.
  const cancelado = useRef(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await obtenerGastos();
      if (!cancelado.current) setGastos(datos);
    } catch (e) {
      if (!cancelado.current) {
        setError(e instanceof Error ? e.message : 'No se pudieron cargar los gastos.');
      }
    } finally {
      if (!cancelado.current) setCargando(false);
    }
  }, []);

  // Recarga cada vez que la pantalla gana foco, no solo al montarse: con
  // pestañas la pantalla queda montada al cambiar de tab, y sin esto se verían
  // datos viejos después de cargar un gasto en otra pantalla.
  //
  // `cargar` va envuelto en useCallback a propósito: useFocusEffect vuelve a
  // correr su efecto cuando cambia la función que recibe, así que una función
  // nueva en cada render provocaría recargas infinitas.
  useFocusEffect(
    useCallback(() => {
      cancelado.current = false;
      cargar();
      return () => {
        cancelado.current = true;
      };
    }, [cargar])
  );

  return { gastos, cargando, error, recargar: cargar };
}
