import { SistentTheme, SistentThemeBase } from '../types/SistentTheme';

export function attachFns(themeBase: SistentThemeBase): SistentTheme {
  return {
    ...themeBase
  };
}
