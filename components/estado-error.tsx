import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type Props = {
  /** Requerido: qué falló, en palabras que la persona pueda entender. */
  mensaje: string;
  /** Vuelve a intentar la operación que falló. */
  onReintentar: () => void;
};

/** Estado de error, con acción de reintentar. */
export function EstadoError({ mensaje, onReintentar }: Props) {
  const colorBoton = useThemeColor({}, 'tint');
  const colorFondo = useThemeColor({}, 'background');

  return (
    <View style={estilos.contenedor}>
      <ThemedText type="defaultSemiBold" style={estilos.mensaje}>
        {mensaje}
      </ThemedText>

      <Pressable
        onPress={onReintentar}
        accessibilityRole="button"
        // Se oscurece al mantenerlo apretado, así se nota que respondió al toque.
        style={({ pressed }) => [
          estilos.boton,
          { borderColor: colorBoton, backgroundColor: pressed ? colorBoton : colorFondo },
        ]}>
        {({ pressed }) => (
          <ThemedText type="defaultSemiBold" style={{ color: pressed ? colorFondo : colorBoton }}>
            Reintentar
          </ThemedText>
        )}
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  mensaje: {
    textAlign: 'center',
  },
  boton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
  },
});
