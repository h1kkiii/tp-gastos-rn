// En Android y web se usan Material Icons como alternativa.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Acá se agregan las equivalencias de SF Symbols a Material Icons.
 * - Material Icons, en el [directorio de íconos](https://icons.expo.fyi).
 * - SF Symbols, en la app [SF Symbols](https://developer.apple.com/sf-symbols/).
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'plus.circle.fill': 'add-circle',
  'chart.pie.fill': 'pie-chart',
} as IconMapping;

/**
 * Ícono que usa SF Symbols nativos en iOS y Material Icons en Android y web,
 * para que se vea igual en todas las plataformas sin gastar recursos de más.
 * Los `name` son de SF Symbols y hay que mapearlos a mano a Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
