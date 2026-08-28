import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { EstadoCarga } from '@/components/estado-carga';
import { EstadoError } from '@/components/estado-error';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { obtenerGastoPorId } from '@/services/gastos-service';
import type { Gasto } from '@/types/gasto';
import { aDdMmAaaaDesdeIso } from '@/utils/fecha';
import { formatearMonto } from '@/utils/moneda';

export default function PantallaDetalleGasto() {
  // El id llega en la ruta: /gasto/g1
  const { id } = useLocalSearchParams<{ id: string }>();

  const [gasto, setGasto] = useState<Gasto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Misma bandera que en use-gastos: con la latencia simulada hay tiempo de
  // salir de la pantalla antes de que llegue la respuesta.
  const cancelado = useRef(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const encontrado = await obtenerGastoPorId(id);
      if (!cancelado.current) setGasto(encontrado);
    } catch (e) {
      // Un id inexistente llega por acá: el servicio lanza "No se encontró el
      // gasto.", que es justo el caso de abrir un gasto ya borrado.
      if (!cancelado.current) {
        setError(e instanceof Error ? e.message : 'No se pudo cargar el gasto.');
      }
    } finally {
      if (!cancelado.current) setCargando(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      cancelado.current = false;
      cargar();
      return () => {
        cancelado.current = true;
      };
    }, [cargar])
  );

  if (cargando) {
    return (
      <ThemedView style={estilos.centrado}>
        <EstadoCarga mensaje="Cargando el gasto…" />
      </ThemedView>
    );
  }

  if (error || !gasto) {
    return (
      <ThemedView style={estilos.centrado}>
        <EstadoError mensaje={error ?? 'No se encontró el gasto.'} onReintentar={cargar} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={estilos.contenedor}>
      <ScrollView contentContainerStyle={estilos.scroll}>
        <ThemedText type="title">{formatearMonto(gasto.monto)}</ThemedText>

        <Dato etiqueta="Categoría" valor={gasto.categoria} />
        <Dato etiqueta="Fecha" valor={aDdMmAaaaDesdeIso(gasto.fecha) ?? gasto.fecha} />

        <View style={estilos.bloque}>
          <ThemedText style={estilos.etiqueta}>Descripción</ThemedText>
          {/* Un hueco en blanco parecería un error de carga: se dice que no hay. */}
          {gasto.descripcion ? (
            <ThemedText>{gasto.descripcion}</ThemedText>
          ) : (
            <ThemedText style={estilos.sinDato}>Sin descripción</ThemedText>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

/** Un par etiqueta/valor, para no repetir la misma estructura tres veces. */
function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <View style={estilos.bloque}>
      <ThemedText style={estilos.etiqueta}>{etiqueta}</ThemedText>
      <ThemedText>{valor}</ThemedText>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  centrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    padding: 16,
    paddingBottom: 48,
    gap: 20,
  },
  bloque: {
    gap: 4,
  },
  etiqueta: {
    fontSize: 13,
    opacity: 0.7,
  },
  sinDato: {
    opacity: 0.5,
    fontStyle: 'italic',
  },
});
