import { render } from '@testing-library/react';
import React from 'react';
import * as AllIcons from '../icons';
import { SistentThemeProvider } from '../theme';

// grab all icon components from the barrel file
// types get stripped at runtime so we only get actual components here
const iconEntries = Object.entries(AllIcons).filter(
  ([, value]) => typeof value === 'function'
) as [string, React.ComponentType<Record<string, unknown>>][];

if (iconEntries.length === 0) {
  throw new Error('No icon components found — is src/icons/index.ts exporting correctly?');
}

// suppress React DOM warnings for HTML SVG attributes (clip-path, stroke-linecap, etc.)
// these come from icon source files, not from the test itself
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : '';
    if (msg.includes('Invalid DOM property')) return;
    originalConsoleError(...args);
  };
});
afterAll(() => {
  console.error = originalConsoleError;
});

function renderWithTheme(ui: React.ReactElement) {
  return render(<SistentThemeProvider>{ui}</SistentThemeProvider>);
}

describe.each(iconEntries)('%s', (_name, IconComponent) => {
  it('renders without crashing', () => {
    expect(() => {
      renderWithTheme(<IconComponent width={24} height={24} />);
    }).not.toThrow();
  });

  it('renders an <svg> element', () => {
    const { container } = renderWithTheme(<IconComponent width={24} height={24} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('forwards width and height to the <svg>', () => {
    const { container } = renderWithTheme(<IconComponent width={32} height={32} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('width')).toBe('32');
    expect(svg!.getAttribute('height')).toBe('32');
  });
});
