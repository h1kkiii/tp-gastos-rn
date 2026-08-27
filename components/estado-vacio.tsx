import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

type Props = {
  /** Requerido: cada pantalla explica su propio vacío, sin texto genérico. */
  mensaje: string;
  /** Sugerencia opcional de qué hacer para salir del vacío. */
  detalle?: string;
};

/** Estado vacío. No lleva acción: no hay nada que reintentar, solo no hay datos. */
export function EstadoVacio({ mensaje, detalle }: Props) {
  return (
    <View style={estilos.contenedor}>
      <ThemedText type="defaultSemiBold" style={estilos.texto}>
        {mensaje}
      </ThemedText>
      {detalle ? <ThemedText style={estilos.texto}>{detalle}</ThemedText> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 8,
  },
  texto: {
    textAlign: 'center',
  },
});
