import { StyleSheet, TextInput, View, type KeyboardTypeOptions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

/** Rojo del error. No sale del tema porque `constants/theme.ts` no define uno. */
const COLOR_ERROR = '#d13438';

type Props = {
  etiqueta: string;
  valor: string;
  onChangeText: (texto: string) => void;
  /** Mensaje ya calculado por la validación. El componente no valida nada. */
  error?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  /** Para la descripción, que necesita más de un renglón. */
  multiline?: boolean;
};

/** Input con etiqueta arriba y mensaje de error abajo. */
export function CampoTexto({
  etiqueta,
  valor,
  onChangeText,
  error,
  placeholder,
  keyboardType,
  multiline = false,
}: Props) {
  // TextInput no hereda el color del tema como sí lo hace ThemedText: sin esto,
  // en modo oscuro se escribe texto negro sobre fondo negro.
  const colorTexto = useThemeColor({}, 'text');
  const colorIcono = useThemeColor({}, 'icon');

  return (
    <View style={estilos.contenedor}>
      <ThemedText type="defaultSemiBold">{etiqueta}</ThemedText>

      <TextInput
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colorIcono}
        keyboardType={keyboardType}
        multiline={multiline}
        accessibilityLabel={etiqueta}
        style={[
          estilos.input,
          multiline && estilos.inputMultilinea,
          // El borde rojo, además del texto: en un formulario de varios campos
          // se ve de un vistazo cuál falló, sin tener que leer los mensajes.
          { color: colorTexto, borderColor: error ? COLOR_ERROR : colorIcono },
        ]}
      />

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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputMultilinea: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  error: {
    color: COLOR_ERROR,
    fontSize: 13,
    lineHeight: 18,
  },
});
