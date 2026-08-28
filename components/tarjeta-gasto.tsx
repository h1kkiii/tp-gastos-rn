import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import type { Gasto } from '@/types/gasto';
import { aDdMmAaaaDesdeIso } from '@/utils/fecha';
import { formatearMonto } from '@/utils/moneda';

type Props = {
  gasto: Gasto;
  /** Qué hacer al tocar la fila. La tarjeta no decide a dónde se navega. */
  onPress: () => void;
};

/**
 * Una fila del listado: monto, categoría y fecha (FR-003).
 * La descripción no va acá; es del detalle.
 */
export function TarjetaGasto({ gasto, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [estilos.fila, pressed && estilos.filaPresionada]}>
      <View style={estilos.encabezado}>
        <ThemedText type="defaultSemiBold" style={estilos.categoria} numberOfLines={1}>
          {gasto.categoria}
        </ThemedText>
        {/* El monto se encoge antes de empujar la categoría fuera de la fila:
            un monto de muchas cifras tiene que entrar sin romper el renglón. */}
        <ThemedText type="defaultSemiBold" style={estilos.monto} numberOfLines={1}>
          {formatearMonto(gasto.monto)}
        </ThemedText>
      </View>
      <ThemedText style={estilos.fecha}>{aDdMmAaaaDesdeIso(gasto.fecha) ?? gasto.fecha}</ThemedText>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  fila: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 4,
  },
  filaPresionada: {
    opacity: 0.6,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoria: {
    flexShrink: 1,
  },
  monto: {
    flexShrink: 1,
    textAlign: 'right',
  },
  fecha: {
    fontSize: 13,
    opacity: 0.7,
  },
});
