import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Pantalla provisoria: el detalle real se implementa en T017 y el borrado en T018.
export default function PantallaDetalleGasto() {
  // El id llega en la ruta: /gasto/g1
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title">Detalle</ThemedText>
      <ThemedText>Gasto {id}</ThemedText>
    </ThemedView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
