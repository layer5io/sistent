import { SistentThemeBase } from '../types/SistentTheme';

export function primaryShade(theme: SistentThemeBase) {
  return (colorScheme?: 'light' | 'dark') => {
    if (typeof theme.primaryShade === 'number') {
      return theme.primaryShade;
    }
    return theme.primaryShade[colorScheme || theme.colorScheme];
  };
}
