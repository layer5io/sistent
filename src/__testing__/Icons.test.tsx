import { render } from '@testing-library/react';
import React from 'react';
import * as AllIcons from '../icons';
import { SistentThemeProviderWithoutBaseLine } from '../theme';

// grab all icon components from the barrel file
// types get stripped at runtime so we only get actual components here
// also checks for uppercase first letter to follow React component naming convention
const iconEntries = Object.entries(AllIcons).filter(
  ([name, value]) => typeof value === 'function' && /^[A-Z]/.test(name)
) as [string, React.ComponentType<Record<string, unknown>>][];

if (iconEntries.length === 0) {
  throw new Error('No icon components found — is src/icons/index.ts exporting correctly?');
}

function renderWithTheme(ui: React.ReactElement) {
  return render(
    <SistentThemeProviderWithoutBaseLine>{ui}</SistentThemeProviderWithoutBaseLine>
  );
}

describe.each(iconEntries)('%s', (_name, IconComponent) => {
  it('renders an <svg> element and forwards width/height props', () => {
    const { container } = renderWithTheme(<IconComponent width={32} height={32} />);
    const svg = container.querySelector('svg');

    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('width')).toBe('32');
    expect(svg!.getAttribute('height')).toBe('32');
  });
});
