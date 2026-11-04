import { render, screen } from '@testing-library/react';
import React from 'react';
import { ListItemText } from '../base/ListItemText';

describe('ListItemText', () => {
  describe('default truncation behavior', () => {
    it('applies noWrap by default to primary text', () => {
      render(<ListItemText primary="Truncated Primary" />);
      const primaryElement = screen.getByText('Truncated Primary');
      expect(primaryElement.classList.contains('MuiTypography-noWrap')).toBe(true);
    });

    it('applies noWrap by default to secondary text', () => {
      render(<ListItemText primary="Title" secondary="Truncated Secondary" />);
      const secondaryElement = screen.getByText('Truncated Secondary');
      expect(secondaryElement.classList.contains('MuiTypography-noWrap')).toBe(true);
    });
  });

  describe('object-valued slotProps', () => {
    it('preserves custom slotProps on primary while keeping noWrap by default', () => {
      render(
        <ListItemText
          primary="Custom Primary"
          slotProps={{
            primary: {
              'data-testid': 'custom-primary',
              className: 'custom-class'
            } as React.HTMLAttributes<HTMLSpanElement>
          }}
        />
      );
      const primaryElement = screen.getByTestId('custom-primary');
      expect(primaryElement.classList.contains('MuiTypography-noWrap')).toBe(true);
      expect(primaryElement.classList.contains('custom-class')).toBe(true);
    });

    it('preserves custom slotProps on secondary while keeping noWrap by default', () => {
      render(
        <ListItemText
          primary="Title"
          secondary="Custom Secondary"
          slotProps={{
            secondary: {
              'data-testid': 'custom-secondary',
              className: 'custom-class-secondary'
            } as React.HTMLAttributes<HTMLParagraphElement>
          }}
        />
      );
      const secondaryElement = screen.getByTestId('custom-secondary');
      expect(secondaryElement.classList.contains('MuiTypography-noWrap')).toBe(true);
      expect(secondaryElement.classList.contains('custom-class-secondary')).toBe(true);
    });

    it('allows consumer to explicitly override noWrap to false on primary', () => {
      render(
        <ListItemText
          primary="Multi-line Primary"
          slotProps={{
            primary: {
              noWrap: false,
              'data-testid': 'multiline-primary'
            }
          }}
        />
      );
      const primaryElement = screen.getByTestId('multiline-primary');
      expect(primaryElement.classList.contains('MuiTypography-noWrap')).toBe(false);
    });

    it('allows consumer to explicitly override noWrap to false on secondary', () => {
      render(
        <ListItemText
          primary="Title"
          secondary="Multi-line Secondary"
          slotProps={{
            secondary: {
              noWrap: false,
              'data-testid': 'multiline-secondary'
            }
          }}
        />
      );
      const secondaryElement = screen.getByTestId('multiline-secondary');
      expect(secondaryElement.classList.contains('MuiTypography-noWrap')).toBe(false);
    });
  });

  describe('function-valued slotProps', () => {
    it('executes primary slot callback with ownerState and retains noWrap by default', () => {
      const primaryFn = jest.fn((ownerState) => ({
        'data-testid': 'callback-primary',
        className: ownerState.inset ? 'is-inset' : 'not-inset'
      }));

      render(
        <ListItemText
          primary="Callback Primary"
          inset
          slotProps={{
            primary: primaryFn as never
          }}
        />
      );

      expect(primaryFn).toHaveBeenCalled();
      const ownerStateArg = primaryFn.mock.calls[0][0];
      expect(ownerStateArg.inset).toBe(true);

      const primaryElement = screen.getByTestId('callback-primary');
      expect(primaryElement.classList.contains('MuiTypography-noWrap')).toBe(true);
      expect(primaryElement.classList.contains('is-inset')).toBe(true);
    });

    it('executes secondary slot callback with ownerState and retains noWrap by default', () => {
      const secondaryFn = jest.fn(() => ({
        'data-testid': 'callback-secondary',
        className: 'dynamic-secondary'
      }));

      render(
        <ListItemText
          primary="Title"
          secondary="Callback Secondary"
          slotProps={{
            secondary: secondaryFn as never
          }}
        />
      );

      expect(secondaryFn).toHaveBeenCalled();
      const secondaryElement = screen.getByTestId('callback-secondary');
      expect(secondaryElement.classList.contains('MuiTypography-noWrap')).toBe(true);
      expect(secondaryElement.classList.contains('dynamic-secondary')).toBe(true);
    });

    it('allows function callback to explicitly override noWrap to false on primary', () => {
      render(
        <ListItemText
          primary="Multi-line Function Primary"
          slotProps={{
            primary: () => ({
              noWrap: false,
              'data-testid': 'multiline-fn-primary'
            })
          }}
        />
      );
      const primaryElement = screen.getByTestId('multiline-fn-primary');
      expect(primaryElement.classList.contains('MuiTypography-noWrap')).toBe(false);
    });

    it('allows function callback to explicitly override noWrap to false on secondary', () => {
      render(
        <ListItemText
          primary="Title"
          secondary="Multi-line Function Secondary"
          slotProps={{
            secondary: () => ({
              noWrap: false,
              'data-testid': 'multiline-fn-secondary'
            })
          }}
        />
      );
      const secondaryElement = screen.getByTestId('multiline-fn-secondary');
      expect(secondaryElement.classList.contains('MuiTypography-noWrap')).toBe(false);
    });
  });

  describe('preservation of root slot and other props', () => {
    it('preserves root slotProps', () => {
      render(
        <ListItemText
          primary="Title"
          slotProps={{
            root: {
              'data-testid': 'custom-root-slot',
              className: 'custom-root-class'
            } as React.HTMLAttributes<HTMLDivElement>
          }}
        />
      );
      const rootElement = screen.getByTestId('custom-root-slot');
      expect(rootElement.classList.contains('custom-root-class')).toBe(true);
    });

    it('forwards top-level props to root element', () => {
      render(
        <ListItemText primary="Title" data-testid="top-level-root" className="top-level-class" />
      );
      const rootElement = screen.getByTestId('top-level-root');
      expect(rootElement.classList.contains('top-level-class')).toBe(true);
    });
  });
});
