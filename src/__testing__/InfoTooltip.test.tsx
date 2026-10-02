import { render, screen } from '@testing-library/react';
import React from 'react';
import { InfoTooltip } from '../custom/CustomTooltip';
import { SistentThemeProvider } from '../theme';

// CustomTooltip renders its string titles through the Markdown module, which
// is ESM-only and not transformed by this jest setup. The tooltip's content
// rendering is not what this file exercises.
jest.mock('../custom/Markdown', () => ({
  RenderMarkdownTooltip: ({ content }: { content: string }) => <>{content}</>
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

describe('InfoTooltip', () => {
  it('renders a focusable trigger so the tooltip opens on keyboard focus', async () => {
    renderWithTheme(<InfoTooltip helpText="Helpful details" />);

    const trigger = screen.getByRole('button', { name: 'More information' });

    expect(trigger.getAttribute('type')).toBe('button');
    expect(trigger.tabIndex).toBeGreaterThanOrEqual(0);
    trigger.focus();
    expect(await screen.findByRole('tooltip')).not.toBeNull();
  });

  it('exposes an accessible name so screen readers announce the trigger', () => {
    renderWithTheme(<InfoTooltip helpText="Helpful details" />);

    expect(
      screen.getByRole('button', { name: 'More information' })
    ).not.toBeNull();
  });
});
