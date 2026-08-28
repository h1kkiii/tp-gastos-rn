import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Pantalla provisoria: el resumen por categoría se implementa en T019.
export default function PantallaResumen() {
  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title">Resumen</ThemedText>
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
