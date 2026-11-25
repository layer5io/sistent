import { render } from '@testing-library/react';
import React from 'react';
import { TextField } from '../base';
import Autocomplete from '../base/Autocomplete/Autocomplete';
import { SistentThemeProvider } from '../theme';
import { MuiAutocomplete } from '../theme/components/autocomplete.modifier';
import { createCustomTheme } from '../theme/theme';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

type StyleOverrideFn = (props: { ownerState?: { size?: string } }) => Record<
  string,
  { fontSize?: string; lineHeight?: string }
>;

/**
 * Inspects the applied CSS typography rule for an element from its parent Autocomplete
 * component's active stylesheet entry in Emotion.
 */
const getAppliedTypography = (element: Element) => {
  const autocompleteRoot = element.closest('.MuiAutocomplete-root');
  if (!autocompleteRoot) return null;

  const emotionClass = Array.from(autocompleteRoot.classList).find((cls) => cls.startsWith('css-'));
  if (!emotionClass) return null;

  for (let i = document.styleSheets.length - 1; i >= 0; i--) {
    const sheet = document.styleSheets[i];
    try {
      for (let j = sheet.cssRules.length - 1; j >= 0; j--) {
        const rule = sheet.cssRules[j];
        if (
          rule instanceof CSSStyleRule &&
          rule.selectorText.includes(`.${emotionClass}`) &&
          element.matches(rule.selectorText)
        ) {
          const fontSize = rule.style.getPropertyValue('font-size');
          const lineHeight = rule.style.getPropertyValue('line-height');
          if (fontSize) {
            return { fontSize, lineHeight };
          }
        }
      }
    } catch {
      // Ignore cross-origin stylesheets if any
    }
  }
  return null;
};

describe('Autocomplete dynamic label size', () => {
  const options = ['Option 1', 'Option 2'];
  const originalGetComputedStyle = window.getComputedStyle;

  beforeAll(() => {
    window.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
      const style = originalGetComputedStyle(elt, pseudoElt);
      if (elt.tagName === 'LABEL' && elt.classList.contains('MuiInputLabel-root')) {
        const applied = getAppliedTypography(elt);
        if (applied) {
          return new Proxy(style, {
            get(target, prop: string) {
              if (prop === 'fontSize') return applied.fontSize;
              if (prop === 'lineHeight') return applied.lineHeight;
              return Reflect.get(target, prop);
            }
          });
        }
      }
      return style;
    };
  });

  afterAll(() => {
    window.getComputedStyle = originalGetComputedStyle;
  });

  it('defines dynamic font size and line height overrides for small and default sizes', () => {
    const rootOverride = MuiAutocomplete?.styleOverrides?.root as unknown as StyleOverrideFn;
    expect(typeof rootOverride).toBe('function');

    if (typeof rootOverride === 'function') {
      const smallStyles = rootOverride({ ownerState: { size: 'small' } });
      expect(smallStyles['& .MuiInputLabel-root']).toEqual({
        fontSize: '0.875rem',
        lineHeight: '1.25rem'
      });
      expect(smallStyles['& .MuiInputLabel-sizeSmall']).toEqual({
        fontSize: '0.875rem',
        lineHeight: '1.25rem'
      });

      const defaultStyles = rootOverride({ ownerState: { size: 'medium' } });
      expect(defaultStyles['& .MuiInputLabel-root']).toEqual({
        fontSize: '1rem',
        lineHeight: '1.75rem'
      });

      const undefinedSizeStyles = rootOverride({ ownerState: {} });
      expect(undefinedSizeStyles['& .MuiInputLabel-root']).toEqual({
        fontSize: '1rem',
        lineHeight: '1.75rem'
      });
    }
  });

  it('integrates dynamic label size override into the custom theme for both themes', () => {
    ['light', 'dark'].forEach((mode) => {
      const theme = createCustomTheme(mode as 'light' | 'dark');
      const rootOverride = theme.components?.MuiAutocomplete?.styleOverrides?.root as unknown as StyleOverrideFn;
      expect(typeof rootOverride).toBe('function');

      if (typeof rootOverride === 'function') {
        const small = rootOverride({ ownerState: { size: 'small' } });
        expect(small['& .MuiInputLabel-root']?.fontSize).toBe('0.875rem');
        expect(small['& .MuiInputLabel-root']?.lineHeight).toBe('1.25rem');

        const regular = rootOverride({ ownerState: { size: 'medium' } });
        expect(regular['& .MuiInputLabel-root']?.fontSize).toBe('1rem');
        expect(regular['& .MuiInputLabel-root']?.lineHeight).toBe('1.75rem');
      }
    });
  });

  it('renders autocomplete with regular label size by default', () => {
    const { container } = renderWithTheme(
      <Autocomplete
        options={options}
        renderInput={(params) => <TextField {...params} label="Standard Size" />}
      />
    );

    const label = container.querySelector('label') as HTMLLabelElement;
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('Standard Size');

    const computedStyle = window.getComputedStyle(label);
    expect(computedStyle.fontSize).toBe('1rem');
    expect(computedStyle.lineHeight).toBe('1.75rem');
  });

  it('renders autocomplete with small dynamic label size when size is small', () => {
    const { container } = renderWithTheme(
      <Autocomplete
        size="small"
        options={options}
        renderInput={(params) => <TextField {...params} label="Small Size" />}
      />
    );

    const label = container.querySelector('label') as HTMLLabelElement;
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('Small Size');
    expect(label.classList.contains('MuiInputLabel-sizeSmall')).toBe(true);

    const computedStyle = window.getComputedStyle(label);
    expect(computedStyle.fontSize).toBe('0.875rem');
    expect(computedStyle.lineHeight).toBe('1.25rem');
  });
});
