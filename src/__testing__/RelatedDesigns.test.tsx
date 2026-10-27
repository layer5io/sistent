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

const originalResizeObserver = global.ResizeObserver;

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterAll(() => {
  global.ResizeObserver = originalResizeObserver;
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

const renderRelated = (overrides?: Partial<React.ComponentProps<typeof RelatedDesigns>>) => {
  return renderWithTheme(
    <RelatedDesigns
      details={sampleDetail}
      type="pattern"
      onSuggestedPatternClick={() => {}}
      technologySVGPath=""
      technologySVGSubpath=""
      orgName="Layer5"
      fetchingOrgError={false}
      {...overrides}
    />
  );
};

describe('RelatedDesigns runtime fallback and card handling', () => {
  it('renders null when patternsPerUser is undefined', () => {
    const { container } = renderRelated({ patternsPerUser: undefined });
    expect(container.firstChild).toBeNull();
  });

  it('renders null when patternsPerUser has no patterns property', () => {
    const { container } = renderRelated({ patternsPerUser: {} });
    expect(container.firstChild).toBeNull();
  });

  it('renders null when patterns array is empty', () => {
    const { container } = renderRelated({ patternsPerUser: { patterns: [] } });
    expect(container.firstChild).toBeNull();
  });

  it('renders null when patterns array contains only current design', () => {
    const { container } = renderRelated({
      patternsPerUser: { patterns: [{ id: 'current-id', name: 'Current Design' }] }
    });
    expect(container.firstChild).toBeNull();
  });

  it('renders null when suggested patterns have no usable id or name', () => {
    const { container } = renderRelated({
      patternsPerUser: {
        patterns: [
          { id: undefined, name: 'Missing ID' },
          { id: 'missing-name', name: undefined },
          { id: '', name: 'Empty ID' }
        ]
      }
    });
    expect(container.firstChild).toBeNull();
  });

  it('falls back to snapshotURL when imageURL is an empty array', () => {
    const suggested: SuggestedPattern = {
      id: 'related-snapshot',
      name: 'Related Design Snapshot',
      catalogData: {
        imageURL: [],
        snapshotURL: ['https://example.com/snapshot.png']
      }
    };

    renderRelated({ patternsPerUser: { patterns: [suggested] } });

    const img = screen.getByAltText('Design SnapShot') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toBe('https://example.com/snapshot.png');
  });

  it('uses non-empty imageURL in preference to snapshotURL', () => {
    const suggested: SuggestedPattern = {
      id: 'related-both',
      name: 'Related Design Both',
      catalogData: {
        imageURL: ['https://example.com/primary.png'],
        snapshotURL: ['https://example.com/snapshot.png']
      }
    };

    renderRelated({ patternsPerUser: { patterns: [suggested] } });

    const img = screen.getByAltText('Design SnapShot') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toBe('https://example.com/primary.png');
  });

  it('renders the other design and excludes the current one when filterByType is true', () => {
    const otherPattern: Pattern = {
      ...sampleDetail,
      id: 'other-id',
      name: 'Other Type Design'
    };

    renderRelated({
      filterByType: true,
      detailsByType: {
        patterns: [sampleDetail, otherPattern]
      }
    });

    expect(screen.queryByText('Current Design')).toBeNull();
    expect(screen.getByText('Other Type Design')).toBeTruthy();
  });

  it('renders suggested patterns and invokes onSuggestedPatternClick on card click', () => {
    const onSuggestedPatternClick = jest.fn();
    const suggested: SuggestedPattern = {
      id: 'related-1',
      name: 'Related Design 1',
      downloadCount: 10,
      viewCount: 20
    };

    renderRelated({
      patternsPerUser: { patterns: [suggested] },
      onSuggestedPatternClick
    });

    expect(screen.getByText('Related Design 1')).toBeTruthy();
    fireEvent.click(screen.getByText('Related Design 1'));
    expect(onSuggestedPatternClick).toHaveBeenCalledTimes(1);
    expect(onSuggestedPatternClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'related-1' })
    );
  });
});
