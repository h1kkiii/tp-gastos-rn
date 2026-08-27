import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type Props = {
  /** Qué se está cargando. Por defecto alcanza con "Cargando…". */
  mensaje?: string;
};

/** Estado de carga. Lo usan las cuatro pantallas mientras esperan al servicio. */
export function EstadoCarga({ mensaje = 'Cargando…' }: Props) {
  // El color del tema, para que el spinner no quede invisible en modo oscuro.
  const color = useThemeColor({}, 'tint');

  return (
    <View style={estilos.contenedor}>
      <ActivityIndicator size="large" color={color} />
      <ThemedText style={estilos.mensaje}>{mensaje}</ThemedText>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  mensaje: {
    textAlign: 'center',
  },
});
