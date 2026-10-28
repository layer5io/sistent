import { render } from '@testing-library/react';
import React from 'react';
import { OutlinedPinIcon, PinIcon } from '../icons';
import { SistentThemeProviderWithoutBaseLine } from '../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<SistentThemeProviderWithoutBaseLine>{ui}</SistentThemeProviderWithoutBaseLine>);
}

const icons = [
  { name: 'PinIcon', Component: PinIcon },
  { name: 'OutlinedPinIcon', Component: OutlinedPinIcon }
];

describe.each(icons)('$name', ({ Component }) => {
  it('renders an <svg> with viewBox "0 0 24 24"', () => {
    const { container } = renderWithTheme(<Component />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('viewBox')).toBe('0 0 24 24');
  });

  it('renders with default width and height "24", and default fill "currentColor"', () => {
    const { container } = renderWithTheme(<Component />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('width')).toBe('24');
    expect(svg!.getAttribute('height')).toBe('24');
    expect(svg!.getAttribute('fill')).toBe('currentColor');
  });

  it('applies custom width, height, and fill props', () => {
    const { container } = renderWithTheme(<Component width={32} height={32} fill="#ff0000" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('width')).toBe('32');
    expect(svg!.getAttribute('height')).toBe('32');
    expect(svg!.getAttribute('fill')).toBe('#ff0000');
  });

  it('forwards extra props like aria-hidden', () => {
    const { container } = renderWithTheme(<Component aria-hidden="true" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('aria-hidden')).toBe('true');
  });
});

describe('PinIcon and OutlinedPinIcon path comparison', () => {
  it('renders different path "d" attributes for the two icons', () => {
    const { container: pinContainer } = renderWithTheme(<PinIcon />);
    const { container: outlinedContainer } = renderWithTheme(<OutlinedPinIcon />);

    const pinPath = pinContainer.querySelector('path');
    const outlinedPath = outlinedContainer.querySelector('path');

    expect(pinPath).not.toBeNull();
    expect(outlinedPath).not.toBeNull();

    const pinD = pinPath!.getAttribute('d');
    const outlinedD = outlinedPath!.getAttribute('d');

    expect(pinD).toBeTruthy();
    expect(outlinedD).toBeTruthy();
    expect(pinD).not.toBe(outlinedD);
  });
});
