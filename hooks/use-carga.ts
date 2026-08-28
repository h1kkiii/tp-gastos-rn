import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';

/**
 * Carga datos de la capa de servicios y expone los tres estados que toda
 * pantalla necesita: cargando, error y los datos en sí.
 *
 * Es una sola definición de "cómo se carga algo en esta app", para que las
 * pantallas no repitan cada una su `try/catch` con sus banderas.
 *
 * **`traerDatos` tiene que ser estable**: una función definida suelta dentro del
 * componente se recrea en cada render y provocaría recargas infinitas. Si
 * depende de algo (por ejemplo un `id`), envolvela en `useCallback`. Las
 * funciones importadas del servicio ya son estables y se pasan tal cual.
 */
export function useCarga<T>(traerDatos: () => Promise<T>) {
  const [datos, setDatos] = useState<T | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Se marca al perder el foco: con la latencia simulada hay tiempo de sobra
  // para salir de la pantalla antes de que llegue la respuesta, y escribir
  // estado sobre un componente desmontado sería un error.
  const cancelado = useRef(false);

  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const resultado = await traerDatos();
      if (!cancelado.current) setDatos(resultado);
    } catch (e) {
      if (!cancelado.current) {
        setError(e instanceof Error ? e.message : 'No se pudieron cargar los datos.');
      }
    } finally {
      if (!cancelado.current) setCargando(false);
    }
  }, [traerDatos]);

  // Recarga al ganar foco, no solo al montar: con pestañas la pantalla queda
  // montada al cambiar de tab, y sin esto se verían datos viejos.
  useFocusEffect(
    useCallback(() => {
      cancelado.current = false;
      recargar();
      return () => {
        cancelado.current = true;
      };
    }, [recargar])
  );

  return { datos, cargando, error, recargar };
}
