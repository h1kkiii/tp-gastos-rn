import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { CATEGORIAS, type Categoria } from '@/types/gasto';

/** Mismo rojo que usa el campo de texto, para que el formulario se vea parejo. */
const COLOR_ERROR = '#d13438';

type Props = {
  /** `null` es "todavía no eligió": es lo que hace posible pedir que elija. */
  valor: Categoria | null;
  onChange: (categoria: Categoria) => void;
  /** Mensaje ya calculado por la validación. Acá no se valida nada. */
  error?: string;
};

/** Las seis categorías fijas como botones. Se ven todas juntas, sin desplegar. */
export function SelectorCategoria({ valor, onChange, error }: Props) {
  const colorSeleccion = useThemeColor({}, 'tint');
  const colorFondo = useThemeColor({}, 'background');
  const colorBorde = useThemeColor({}, 'icon');

  return (
    <View style={estilos.contenedor}>
      <ThemedText type="defaultSemiBold">Categoría</ThemedText>

      {/* Las opciones salen de CATEGORIAS: agregar una categoría allá la hace
          aparecer acá sola, sin tocar este archivo. */}
      <View style={estilos.grilla}>
        {CATEGORIAS.map((categoria) => {
          const elegida = categoria === valor;
          return (
            <Pressable
              key={categoria}
              onPress={() => onChange(categoria)}
              accessibilityRole="button"
              accessibilityState={{ selected: elegida }}
              style={({ pressed }) => [
                estilos.opcion,
                {
                  // La elegida se pinta entera, no solo con el borde: en pantalla
                  // chica un borde más grueso no se distingue.
                  backgroundColor: elegida ? colorSeleccion : 'transparent',
                  borderColor: error && !valor ? COLOR_ERROR : elegida ? colorSeleccion : colorBorde,
                  opacity: pressed ? 0.6 : 1,
                },
              ]}>
              <ThemedText style={elegida ? { color: colorFondo } : undefined}>
                {categoria}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      {error ? (
        <ThemedText accessibilityRole="alert" style={estilos.error}>
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    gap: 6,
  },
  grilla: {
    flexDirection: 'row',
    // Envuelve a la línea siguiente: las seis entran sin scroll horizontal, así
    // ninguna opción queda escondida fuera de la pantalla.
    flexWrap: 'wrap',
    gap: 8,
  },
  opcion: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  error: {
    color: COLOR_ERROR,
    fontSize: 13,
    lineHeight: 18,
  },
});
