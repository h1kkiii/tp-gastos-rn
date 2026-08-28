import { FlatList, StyleSheet, View } from 'react-native';

import { EstadoCarga } from '@/components/estado-carga';
import { EstadoError } from '@/components/estado-error';
import { EstadoVacio } from '@/components/estado-vacio';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCarga } from '@/hooks/use-carga';
import { obtenerResumenPorCategoria } from '@/services/gastos-service';
import { formatearMonto } from '@/utils/moneda';

export default function PantallaResumen() {
  // La función viene del módulo de servicios, así que su identidad es estable y
  // se puede pasar directo, sin envolverla en useCallback.
  const { datos, cargando, error, recargar } = useCarga(obtenerResumenPorCategoria);

  if (cargando) {
    return (
      <ThemedView style={estilos.centrado}>
        <EstadoCarga mensaje="Calculando el resumen…" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={estilos.centrado}>
        <EstadoError mensaje={error} onReintentar={recargar} />
      </ThemedView>
    );
  }

  const filas = datos ?? [];

  if (filas.length === 0) {
    return (
      <ThemedView style={estilos.centrado}>
        <EstadoVacio
          mensaje="Todavía no hay gastos para resumir."
          detalle="Cargá tu primer gasto y acá vas a ver cuánto llevás gastado en cada categoría."
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={estilos.contenedor}>
      {/* El servicio ya entrega solo las categorías con gastos, en el orden de
          CATEGORIAS y sin fila de total general: acá no se calcula nada. */}
      <FlatList
        data={filas}
        keyExtractor={(fila) => fila.categoria}
        renderItem={({ item }) => (
          <View style={estilos.fila}>
            <ThemedText type="defaultSemiBold" style={estilos.categoria} numberOfLines={1}>
              {item.categoria}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={estilos.total} numberOfLines={1}>
              {formatearMonto(item.total)}
            </ThemedText>
          </View>
        )}
        ListHeaderComponent={
          <ThemedText type="title" style={estilos.titulo}>
            Resumen
          </ThemedText>
        }
        ItemSeparatorComponent={() => <View style={estilos.separador} />}
        contentContainerStyle={estilos.lista}
      />
    </ThemedView>
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
  lista: {
    paddingTop: 72,
    paddingBottom: 24,
  },
  titulo: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  categoria: {
    flexShrink: 1,
  },
  total: {
    flexShrink: 1,
    textAlign: 'right',
  },
  separador: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8884',
    marginHorizontal: 16,
  },
});
