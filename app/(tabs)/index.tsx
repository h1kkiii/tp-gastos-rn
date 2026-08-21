import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Pantalla provisoria: el listado real se implementa en T012.
export default function PantallaListado() {
  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title">Gastos</ThemedText>
    </ThemedView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
