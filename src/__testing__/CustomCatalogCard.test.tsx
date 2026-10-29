import { render } from '@testing-library/react';
import React from 'react';
import { CustomCatalogCard } from '../custom/CustomCatalog';
import type { Pattern } from '../custom/CustomCatalog/CustomCard';
import { SistentThemeProvider } from '../theme';

// CustomCatalogCard -> CustomTooltip -> Markdown -> react-markdown (ESM-only) is
// excluded by jest's transformIgnorePatterns allowlist, so those leaf modules are stubbed.
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));
jest.mock('remark-gfm', () => ({ __esModule: true, default: () => {} }));
jest.mock('rehype-raw', () => ({ __esModule: true, default: () => {} }));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

const pattern = {
  id: 'design-1',
  userId: 'user-1',
  patternFile: 'name: API Architecture',
  name: 'API Architecture',
  visibility: 'public',
  avatarUrl: '',
  user: { firstName: 'Ada', lastName: 'Lovelace' },
  catalogData: { contentClass: 'community', compatibility: [] }
} as unknown as Pattern;

// The flipping element is `.innerCard`; its first child is the front face.
const getFrontFace = (container: HTMLElement) =>
  container.querySelector('.innerCard')?.firstElementChild as HTMLElement;

describe('CustomCatalogCard', () => {
  it('gives the front face its own 3D transform when the card flips', () => {
    // Regression for meshery/meshery#22640: Firefox ignores
    // `backface-visibility: hidden` on a z-indexed face that has no transform
    // of its own, painting the front face mirrored over the back on hover.
    const { container } = renderWithTheme(
      <CustomCatalogCard pattern={pattern} patternType="Deployment" shouldFlip />
    );

    const front = getComputedStyle(getFrontFace(container));
    expect(front.backfaceVisibility).toBe('hidden');
    expect(front.transform).toBe('rotateY(0deg)');
  });

  it('leaves the front face untransformed when the card does not flip', () => {
    const { container } = renderWithTheme(
      <CustomCatalogCard pattern={pattern} patternType="Deployment" shouldFlip={false} />
    );

    expect(getComputedStyle(getFrontFace(container)).transform).toBe('');
  });
});
