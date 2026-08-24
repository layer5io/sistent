import { render, screen } from '@testing-library/react';
import React from 'react';
import CustomCatalogCard, { Pattern } from '../custom/CustomCatalog/CustomCard';
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

jest.mock('../custom/CustomCatalog/Helper', () => ({
  ...jest.requireActual('../custom/CustomCatalog/Helper'),
  handleImage: jest.fn()
}));

const renderWithTheme = (ui: React.ReactElement, mode: 'light' | 'dark' = 'light') => {
  return render(<SistentThemeProvider initialMode={mode}>{ui}</SistentThemeProvider>);
};

const mockPattern: Pattern = {
  id: 'test-pattern-1',
  name: 'Istio Service Mesh',
  type: 'design',
  downloadCount: 1200,
  cloneCount: 450,
  viewCount: 300,
  deploymentCount: 100,
  shareCount: 50,
  updated_at: '2026-01-01',
  created_at: '2026-01-01',
  visibility: 'public'
};

describe('CustomCatalogCard', () => {
  it('renders all metrics counts correctly', () => {
    renderWithTheme(
      <CustomCatalogCard
        pattern={mockPattern}
        patternType="design"
        isDetailed={true}
        cardTechnologies={false}
      />
    );

    expect(screen.getByText('1200')).not.toBeNull();
    expect(screen.getByText('450')).not.toBeNull();
    expect(screen.getByText('300')).not.toBeNull();
    expect(screen.getByText('100')).not.toBeNull();
    expect(screen.getByText('50')).not.toBeNull();
  });

  it('renders metrics with theme-aware text color in dark mode', () => {
    renderWithTheme(
      <CustomCatalogCard
        pattern={mockPattern}
        patternType="design"
        isDetailed={true}
        cardTechnologies={false}
      />,
      'dark'
    );

    const countElement = screen.getByText('1200');
    const metricsDiv = countElement.parentElement;
    expect(metricsDiv).not.toBeNull();

    // Verify MetricsDiv does not use the hardcoded dark rgba color
    const computedStyle = window.getComputedStyle(metricsDiv as Element);
    expect(computedStyle.color).not.toBe('rgba(26, 26, 26, 0.8)');
    expect(computedStyle.color).not.toBe('rgba(26, 26, 26, .8)');
  });
});
