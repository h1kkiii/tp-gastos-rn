import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * En web el valor se recalcula del lado del cliente, para que funcione el
 * renderizado estático.
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
