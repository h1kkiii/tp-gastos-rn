import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* El detalle vive en el stack raíz, no en las pestañas: al abrirlo la
            barra de pestañas se va y aparece la flecha de volver. */}
        <Stack.Screen name="gasto/[id]" options={{ title: 'Detalle del gasto' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
