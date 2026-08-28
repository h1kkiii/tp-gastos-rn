import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { EstadoCarga } from '@/components/estado-carga';
import { EstadoError } from '@/components/estado-error';
import { EstadoVacio } from '@/components/estado-vacio';
import { TarjetaGasto } from '@/components/tarjeta-gasto';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useGastos } from '@/hooks/use-gastos';

export default function PantallaListado() {
  const { gastos, cargando, error, recargar } = useGastos();

  if (cargando) {
    return (
      <ThemedView style={estilos.centrado}>
        <EstadoCarga mensaje="Cargando gastos…" />
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

  if (gastos.length === 0) {
    return (
      <ThemedView style={estilos.centrado}>
        <EstadoVacio
          mensaje="Todavía no cargaste ningún gasto."
          detalle="Tocá la pestaña Nuevo para registrar el primero."
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={estilos.contenedor}>
      {/* FlatList y no un map dentro de un ScrollView: solo dibuja las filas
          visibles, así el listado sigue andando con muchos gastos acumulados.
          El orden ya viene resuelto por el servicio; acá no se reordena nada. */}
      <FlatList
        data={gastos}
        keyExtractor={(gasto) => gasto.id}
        renderItem={({ item }) => (
          <TarjetaGasto gasto={item} onPress={() => router.push(`/gasto/${item.id}`)} />
        )}
        ListHeaderComponent={
          <ThemedText type="title" style={estilos.titulo}>
            Gastos
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
  separador: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8884',
    marginHorizontal: 16,
  },
});
