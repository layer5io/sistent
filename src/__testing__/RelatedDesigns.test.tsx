import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import RelatedDesigns from '../custom/CatalogDetail/RelatedDesigns';
import type { Pattern, SuggestedPattern } from '../custom/CustomCatalog/CustomCard';
import { SistentThemeProvider } from '../theme';

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

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const sampleDetail: Pattern = {
  id: 'current-id',
  userId: 'user-1',
  name: 'Current Design',
  patternFile: '',
  visibility: 'public',
  avatarUrl: 'https://example.com/avatar.png',
  user: {
    firstName: 'Alice',
    lastName: 'Smith'
  },
  viewCount: 0,
  downloadCount: 0,
  cloneCount: 0,
  deploymentCount: 0,
  shareCount: 0
};

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<SistentThemeProvider>{ui}</SistentThemeProvider>);
};

describe('RelatedDesigns runtime fallback and card handling', () => {
  it('renders null when patternsPerUser is undefined', () => {
    const { container } = renderWithTheme(
      <RelatedDesigns
        details={sampleDetail}
        type="pattern"
        patternsPerUser={undefined}
        onSuggestedPatternClick={() => {}}
        technologySVGPath=""
        technologySVGSubpath=""
        orgName="Layer5"
        fetchingOrgError={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders null when patternsPerUser has no patterns property', () => {
    const { container } = renderWithTheme(
      <RelatedDesigns
        details={sampleDetail}
        type="pattern"
        patternsPerUser={{}}
        onSuggestedPatternClick={() => {}}
        technologySVGPath=""
        technologySVGSubpath=""
        orgName="Layer5"
        fetchingOrgError={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders null when patterns array is empty or contains only current design', () => {
    const { container } = renderWithTheme(
      <RelatedDesigns
        details={sampleDetail}
        type="pattern"
        patternsPerUser={{ patterns: [{ id: 'current-id', name: 'Current Design' }] }}
        onSuggestedPatternClick={() => {}}
        technologySVGPath=""
        technologySVGSubpath=""
        orgName="Layer5"
        fetchingOrgError={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders suggested patterns and invokes onSuggestedPatternClick on card click', () => {
    const onSuggestedPatternClick = jest.fn();
    const suggested: SuggestedPattern = {
      id: 'related-1',
      name: 'Related Design 1',
      downloadCount: 10,
      viewCount: 20
    };

    renderWithTheme(
      <RelatedDesigns
        details={sampleDetail}
        type="pattern"
        patternsPerUser={{ patterns: [suggested] }}
        onSuggestedPatternClick={onSuggestedPatternClick}
        technologySVGPath=""
        technologySVGSubpath=""
        orgName="Layer5"
        fetchingOrgError={false}
      />
    );

    expect(screen.getByText('Related Design 1')).toBeTruthy();
    fireEvent.click(screen.getByText('Related Design 1'));
    expect(onSuggestedPatternClick).toHaveBeenCalledTimes(1);
    expect(onSuggestedPatternClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'related-1' })
    );
  });
});
