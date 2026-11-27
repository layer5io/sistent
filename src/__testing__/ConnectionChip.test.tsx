import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConnectionChip } from '../custom/ConnectionChip';
import { createCustomTheme, SistentThemeProvider } from '../theme';

// ConnectionChip wraps CustomTooltip -> Markdown -> react-markdown (ESM-only),
// which jest's transformIgnorePatterns allowlist excludes, so those leaf
// modules are stubbed. Mirrors DangerConfirmationModal.test.tsx.
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: () => {}
}));

jest.mock('rehype-raw', () => ({
  __esModule: true,
  default: () => {}
}));

const rgb = (hex: string | undefined) => {
  const int = parseInt(String(hex).replace('#', ''), 16);
  return `rgb(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255})`;
};

/** The MUI Chip root, which carries the resolved `sx` colors. */
const getChipRoot = (label: string) =>
  screen.getByText(label).closest('.MuiChip-root') as HTMLElement;

describe('ConnectionChip theming', () => {
  // The chip used to hardcode a white background and black text, which left a
  // white slab on dark pages and hid the delete icon. Every color now comes
  // from the active palette, so each mode gets its own surface, ink and border.
  it.each(['light', 'dark'] as const)('takes its colors from the %s palette', (mode) => {
    const { palette } = createCustomTheme(mode);
    render(
      <SistentThemeProvider initialMode={mode}>
        <ConnectionChip tooltip="Cluster connection" label="kind-meshery" />
      </SistentThemeProvider>
    );

    const style = getComputedStyle(getChipRoot('kind-meshery'));
    expect(style.backgroundColor).toBe(rgb(palette.background.card));
    expect(style.color).toBe(rgb(palette.text.default));
    expect(style.borderColor).toBe(rgb(palette.border.strong));
  });
});
