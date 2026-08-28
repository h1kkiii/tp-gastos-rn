import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Pantalla provisoria: el formulario de alta se implementa en T016.
export default function PantallaNuevoGasto() {
  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title">Nuevo gasto</ThemedText>
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
