import { SistentThemeBase } from '../types/SistentTheme';
import { primaryShade } from './primaryShade';

export function primaryColor(theme: SistentThemeBase) {
  return (colorScheme?: 'light' | 'dark') => {
    const shade = primaryShade(theme)(colorScheme);
    return theme.colors[theme.primaryColor][shade];
  };
}
