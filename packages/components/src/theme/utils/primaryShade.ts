import { ShadeType, SistentTheme, SistentThemeBase } from '../types/SistentTheme';

/*
export function primaryShade(theme: SistentThemeBase): (colorScheme?: 'light' | 'dark') => typeof ShadeType {
  return (colorScheme?: 'light' | 'dark') => {
    if (typeof theme.primaryShade === 'number') {
      // You can return a default ShadeType value here if needed
      return '0' as unknown as typeof ShadeType; // or any other default value from ShadeType
    }
    // Use a type assertion here to tell TypeScript that you know it's safe
    return (theme.primaryShade as unknown as { [key in 'light' | 'dark']: typeof ShadeType })[colorScheme ?? theme.colorScheme];
  };
}
*/

export function primaryShade(theme: SistentTheme, colorScheme: SistentThemeColors)