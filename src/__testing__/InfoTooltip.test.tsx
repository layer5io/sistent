import { act, render, screen } from '@testing-library/react';
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

    const trigger = screen.getByRole('button', { name: 'Helpful details' });

    expect(trigger.getAttribute('type')).toBe('button');
    expect(trigger.tabIndex).toBeGreaterThanOrEqual(0);
    await act(async () => {
      trigger.focus();
    });
    expect(await screen.findByRole('tooltip')).not.toBeNull();
  });

  it('exposes an accessible name so screen readers announce the trigger', () => {
    renderWithTheme(<InfoTooltip helpText="Helpful details" />);

    expect(screen.getByRole('button', { name: 'Helpful details' })).not.toBeNull();
  });

  it('uses custom aria-label when provided', () => {
    renderWithTheme(
      <InfoTooltip helpText={<div>Complex React Node</div>} aria-label="Custom help label" />
    );

    expect(screen.getByRole('button', { name: 'Custom help label' })).not.toBeNull();
  });

  it('falls back to default label when helpText is not a string and no aria-label is provided', () => {
    renderWithTheme(<InfoTooltip helpText={<div>Complex React Node</div>} />);

    expect(screen.getByRole('button', { name: 'More information' })).not.toBeNull();
  });
});
