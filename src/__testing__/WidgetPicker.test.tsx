import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { WidgetPicker, type WidgetPickerProps } from '../custom/WidgetPicker/WidgetPicker';
import { DashboardLayoutContext, type DashboardLayoutContextValue } from '../custom/DashboardLayout/DashboardLayoutContext';
import { SistentThemeProvider } from '../theme';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const noop = () => {};

const WIDGETS: WidgetPickerProps['widgetsToAdd'] = [
  { key: 'chart', title: 'Chart Widget' },
  { key: 'table', title: 'Table Widget' }
];

function makeContext(
  overrides: Partial<DashboardLayoutContextValue> = {}
): DashboardLayoutContextValue {
  return {
    isMobile: false,
    isSheet: false,
    isSidebarVisible: true,
    closeSidebar: noop,
    openSidebar: noop,
    ...overrides
  };
}

function renderPicker(
  props: Partial<WidgetPickerProps> = {},
  context?: DashboardLayoutContextValue | null
) {
  const element = (
    <SistentThemeProvider initialMode="light">
      <WidgetPicker widgetsToAdd={WIDGETS} onAddWidget={noop} {...props} />
    </SistentThemeProvider>
  );

  if (context === undefined) {
    // No context wrapper — standalone usage
    return render(element);
  }

  return render(
    <DashboardLayoutContext.Provider value={context!}>
      {element}
    </DashboardLayoutContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Close button auto-detection
// ---------------------------------------------------------------------------

describe('WidgetPicker – close button auto-detection', () => {
  it('renders close button when standalone with onClose provided', () => {
    const handleClose = jest.fn();
    renderPicker({ onClose: handleClose });
    expect(screen.queryByLabelText('Close widget picker')).not.toBeNull();
  });

  it('does not render close button when standalone with no onClose and no context', () => {
    renderPicker();
    expect(screen.queryByLabelText('Close widget picker')).toBeNull();
  });

  it('suppresses close button when embedded in BottomSheet (isSheet=true)', () => {
    renderPicker(
      { onClose: noop },
      makeContext({ isSheet: true })
    );
    expect(screen.queryByLabelText('Close widget picker')).toBeNull();
  });

  it('renders close button when embedded in desktop sidebar (isSheet=false) with onClose', () => {
    renderPicker(
      { onClose: noop },
      makeContext({ isSheet: false })
    );
    expect(screen.queryByLabelText('Close widget picker')).not.toBeNull();
  });

  it('renders close button when embedded in desktop sidebar with only closeSidebar in context', () => {
    const closeSidebar = jest.fn();
    renderPicker(
      {},
      makeContext({ isSheet: false, closeSidebar })
    );
    expect(screen.queryByLabelText('Close widget picker')).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// showCloseButton explicit override
// ---------------------------------------------------------------------------

describe('WidgetPicker – showCloseButton explicit override', () => {
  it('showCloseButton=true forces close button even inside BottomSheet', () => {
    renderPicker(
      { showCloseButton: true },
      makeContext({ isSheet: true })
    );
    expect(screen.queryByLabelText('Close widget picker')).not.toBeNull();
  });

  it('showCloseButton=false hides close button even when onClose is provided', () => {
    renderPicker({ onClose: noop, showCloseButton: false });
    expect(screen.queryByLabelText('Close widget picker')).toBeNull();
  });

  it('showCloseButton=false hides close button even in desktop context with closeSidebar', () => {
    const closeSidebar = jest.fn();
    renderPicker(
      { showCloseButton: false },
      makeContext({ isSheet: false, closeSidebar })
    );
    expect(screen.queryByLabelText('Close widget picker')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Close handler wiring
// ---------------------------------------------------------------------------

describe('WidgetPicker – close handler wiring', () => {
  it('calls onClose when close button is clicked (standalone)', () => {
    const handleClose = jest.fn();
    renderPicker({ onClose: handleClose });
    fireEvent.click(screen.getByLabelText('Close widget picker'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose (not closeSidebar) when both are available', () => {
    const handleClose = jest.fn();
    const closeSidebar = jest.fn();
    renderPicker(
      { onClose: handleClose },
      makeContext({ isSheet: false, closeSidebar })
    );
    fireEvent.click(screen.getByLabelText('Close widget picker'));
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(closeSidebar).not.toHaveBeenCalled();
  });

  it('calls closeSidebar when onClose is not provided but context has closeSidebar', () => {
    const closeSidebar = jest.fn();
    renderPicker(
      {},
      makeContext({ isSheet: false, closeSidebar })
    );
    fireEvent.click(screen.getByLabelText('Close widget picker'));
    expect(closeSidebar).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Widget list rendering
// ---------------------------------------------------------------------------

describe('WidgetPicker – widget list', () => {
  it('renders all widget titles', () => {
    renderPicker();
    expect(screen.queryByText('Chart Widget')).not.toBeNull();
    expect(screen.queryByText('Table Widget')).not.toBeNull();
  });

  it('shows empty-state message when widgetsToAdd is empty', () => {
    renderPicker({ widgetsToAdd: [] });
    expect(screen.queryByText('All widgets added to the layout.')).not.toBeNull();
  });

  it('calls onAddWidget with correct args when add button is clicked', () => {
    const handleAddWidget = jest.fn();
    renderPicker({ onAddWidget: handleAddWidget });
    fireEvent.click(screen.getByLabelText('Add Chart Widget widget'));
    expect(handleAddWidget).toHaveBeenCalledWith({ title: 'Chart Widget' }, 'chart');
  });
});
