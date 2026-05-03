import { render, screen } from '@testing-library/react';
import React from 'react';
import FilterSection from '../custom/CatalogFilterSection/FilterSection';
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

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<SistentThemeProvider>{ui}</SistentThemeProvider>);
};

describe('CatalogFilterSection', () => {
  it('applies option row layout via sx instead of leaking raw DOM attributes', () => {
    renderWithTheme(
      <FilterSection
        filterKey="contentType"
        sectionDisplayName="Content Type"
        options={[
          {
            value: 'learning-path',
            label: 'Learning Path',
            totalCount: 7
          }
        ]}
        filters={{ contentType: [] }}
        openSections={{ contentType: true }}
        onCheckboxChange={jest.fn()}
        onSectionToggle={jest.fn()}
        styleProps={{
          backgroundColor: '#fff',
          sectionTitleBackgroundColor: '#eee',
          fontFamily: 'Arial'
        }}
      />
    );

    const label = screen.getByText('Learning Path');
    const labelGroup = label.parentElement;
    const optionRow = labelGroup?.parentElement;
    const metadataGroup = optionRow?.lastElementChild as HTMLElement | null;

    expect(labelGroup?.getAttribute('alignitems')).toBeNull();
    expect(labelGroup?.getAttribute('gap')).toBeNull();
    expect(optionRow?.getAttribute('alignitems')).toBeNull();
    expect(optionRow?.getAttribute('justifycontent')).toBeNull();
    expect(optionRow?.getAttribute('px')).toBeNull();
    expect(metadataGroup?.getAttribute('alignitems')).toBeNull();
    expect(metadataGroup?.getAttribute('gap')).toBeNull();

    expect(window.getComputedStyle(labelGroup as Element).alignItems).toBe('center');
    expect(window.getComputedStyle(optionRow as Element).alignItems).toBe('center');
    expect(window.getComputedStyle(optionRow as Element).justifyContent).toBe('space-between');
    expect(window.getComputedStyle(metadataGroup as Element).alignItems).toBe('center');
  });
});
