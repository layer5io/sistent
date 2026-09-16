import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { DashboardLayout } from '../custom/DashboardLayout/DashboardLayout';
import { DashboardLayoutContext, useDashboardLayoutContext } from '../custom/DashboardLayout/DashboardLayoutContext';
import { SistentThemeProvider } from '../theme';

// ---------------------------------------------------------------------------
// Mock breakpoint / media query
// ---------------------------------------------------------------------------

let mockIsMobile = false;

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: () => mockIsMobile
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const WIDGETS = <div>Widget Gallery</div>;

function renderLayout(
  props: Partial<React.ComponentProps<typeof DashboardLayout>> & {
    isSidebarOpen: boolean;
  }
) {
  return render(
    <SistentThemeProvider initialMode="light">
      <DashboardLayout sidebarContent={WIDGETS} {...props}>
        <div>Dashboard Content</div>
      </DashboardLayout>
    </SistentThemeProvider>
  );
}

// ---------------------------------------------------------------------------
// Mobile tests
// ---------------------------------------------------------------------------

describe('DashboardLayout – mobile', () => {
  beforeEach(() => {
    mockIsMobile = true;
  });
  afterAll(() => {
    mockIsMobile = false;
  });

  it('renders BottomSheet title and no reopen FAB when isSidebarOpen=true', () => {
    renderLayout({ isSidebarOpen: true });
    // BottomSheet renders its title text
    expect(screen.queryByText('Widget Picker')).not.toBeNull();
    // No reopen FAB while sheet is open
    expect(screen.queryByLabelText('Open Widget Picker')).toBeNull();
  });

  it('does not render BottomSheet or FAB when isSidebarOpen=false', () => {
    renderLayout({ isSidebarOpen: false });
    // BottomSheet title is not rendered
    expect(screen.queryByText('Widget Picker')).toBeNull();
    // No reopen FAB either
    expect(screen.queryByLabelText('Open Widget Picker')).toBeNull();
  });

  it('shows FAB when BottomSheet is closed and keeps edit mode active', () => {
    renderLayout({ isSidebarOpen: true });
    // BottomSheet has its own close button labelled 'Close'
    const closeBtn = screen.getByLabelText('Close');
    fireEvent.click(closeBtn);
    // FAB appears so the user can reopen (sheet is minimized, but MUI Dialog
    // keeps DOM content mounted — so we check the FAB, not the close button)
    expect(screen.queryByLabelText('Open Widget Picker')).not.toBeNull();
  });

  it('reopens BottomSheet when FAB is clicked', () => {
    renderLayout({ isSidebarOpen: true });
    // Close the sheet first
    fireEvent.click(screen.getByLabelText('Close'));
    // FAB is now visible
    expect(screen.queryByLabelText('Open Widget Picker')).not.toBeNull();
    // Click the reopen FAB
    fireEvent.click(screen.getByLabelText('Open Widget Picker'));
    // FAB disappears because sheet is open again
    expect(screen.queryByLabelText('Open Widget Picker')).toBeNull();
  });

  it('hides FAB when showReopenFab=false even when sheet is minimized', () => {
    renderLayout({ isSidebarOpen: true, showReopenFab: false });
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByLabelText('Open Widget Picker')).toBeNull();
  });

  it('provides isSheet=true to sidebarContent via context', () => {
    let capturedContext: ReturnType<typeof useDashboardLayoutContext> = null;

    function ContextCapture() {
      capturedContext = useDashboardLayoutContext();
      return null;
    }

    renderLayout({ isSidebarOpen: true, sidebarContent: <ContextCapture /> });

    expect(capturedContext).not.toBeNull();
    expect(capturedContext?.isSheet).toBe(true);
    expect(capturedContext?.isMobile).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Desktop tests
// ---------------------------------------------------------------------------

describe('DashboardLayout – desktop', () => {
  beforeEach(() => {
    mockIsMobile = false;
  });

  it('renders sidebar content and no FAB when isSidebarOpen=true', () => {
    renderLayout({ isSidebarOpen: true });
    expect(screen.queryByText('Widget Gallery')).not.toBeNull();
    expect(screen.queryByLabelText('Open Widget Picker')).toBeNull();
  });

  it('does not render sidebar or FAB when isSidebarOpen=false', () => {
    renderLayout({ isSidebarOpen: false });
    expect(screen.queryByText('Widget Gallery')).toBeNull();
    expect(screen.queryByLabelText('Open Widget Picker')).toBeNull();
  });

  it('provides isSheet=false to sidebarContent via context', () => {
    let capturedContext: ReturnType<typeof useDashboardLayoutContext> = null;

    function ContextCapture() {
      capturedContext = useDashboardLayoutContext();
      return null;
    }

    // Must use WIDGETS to have sidebarContent that renders AND the context capture
    renderLayout({
      isSidebarOpen: true,
      sidebarContent: (
        <>
          <ContextCapture />
          {WIDGETS}
        </>
      )
    });

    expect(capturedContext).not.toBeNull();
    expect(capturedContext?.isSheet).toBe(false);
    expect(capturedContext?.isMobile).toBe(false);
  });

  it('shows FAB and hides sidebar when closeSidebar is called from context', () => {
    let capturedContext: ReturnType<typeof useDashboardLayoutContext> = null;

    function MinimizeButton() {
      capturedContext = useDashboardLayoutContext();
      return (
        <button aria-label="minimize" onClick={() => capturedContext?.closeSidebar()}>
          Minimize
        </button>
      );
    }

    renderLayout({ isSidebarOpen: true, sidebarContent: <MinimizeButton /> });

    // sidebar is open: close button visible, no FAB
    expect(screen.queryByLabelText('minimize')).not.toBeNull();
    expect(screen.queryByLabelText('Open Widget Picker')).toBeNull();

    // Minimize the sidebar via context
    fireEvent.click(screen.getByLabelText('minimize'));

    // sidebar is hidden: minimize button gone, reopen FAB visible
    expect(screen.queryByLabelText('minimize')).toBeNull();
    expect(screen.queryByLabelText('Open Widget Picker')).not.toBeNull();
  });

  it('reopens desktop sidebar when FAB is clicked after minimizing', () => {
    let capturedContext: ReturnType<typeof useDashboardLayoutContext> = null;

    function MinimizeButton() {
      capturedContext = useDashboardLayoutContext();
      return (
        <button aria-label="minimize" onClick={() => capturedContext?.closeSidebar()}>
          Minimize
        </button>
      );
    }

    renderLayout({ isSidebarOpen: true, sidebarContent: <MinimizeButton /> });

    // Minimize sidebar
    fireEvent.click(screen.getByLabelText('minimize'));
    expect(screen.queryByLabelText('Open Widget Picker')).not.toBeNull();

    // Click reopen FAB
    fireEvent.click(screen.getByLabelText('Open Widget Picker'));
    // Sidebar is back: minimize button visible, no FAB
    expect(screen.queryByLabelText('minimize')).not.toBeNull();
    expect(screen.queryByLabelText('Open Widget Picker')).toBeNull();
  });

  it('respects controlled sidebarVisible=true prop', () => {
    const onSidebarVisibilityChange = jest.fn();
    render(
      <SistentThemeProvider initialMode="light">
        <DashboardLayout
          isSidebarOpen={true}
          sidebarContent={WIDGETS}
          sidebarVisible={true}
          onSidebarVisibilityChange={onSidebarVisibilityChange}
        >
          <div>Dashboard</div>
        </DashboardLayout>
      </SistentThemeProvider>
    );

    expect(screen.queryByText('Widget Gallery')).not.toBeNull();
    expect(screen.queryByLabelText('Open Widget Picker')).toBeNull();
  });

  it('respects controlled sidebarVisible=false prop (shows FAB)', () => {
    const onSidebarVisibilityChange = jest.fn();
    render(
      <SistentThemeProvider initialMode="light">
        <DashboardLayout
          isSidebarOpen={true}
          sidebarContent={WIDGETS}
          sidebarVisible={false}
          onSidebarVisibilityChange={onSidebarVisibilityChange}
        >
          <div>Dashboard</div>
        </DashboardLayout>
      </SistentThemeProvider>
    );

    expect(screen.queryByText('Widget Gallery')).toBeNull();
    expect(screen.queryByLabelText('Open Widget Picker')).not.toBeNull();
  });

  it('calls onSidebarVisibilityChange when FAB is clicked in controlled mode', () => {
    const onSidebarVisibilityChange = jest.fn();
    render(
      <SistentThemeProvider initialMode="light">
        <DashboardLayout
          isSidebarOpen={true}
          sidebarContent={WIDGETS}
          sidebarVisible={false}
          onSidebarVisibilityChange={onSidebarVisibilityChange}
        >
          <div>Dashboard</div>
        </DashboardLayout>
      </SistentThemeProvider>
    );

    fireEvent.click(screen.getByLabelText('Open Widget Picker'));
    expect(onSidebarVisibilityChange).toHaveBeenCalledWith(true);
  });

  it('does not emit onSidebarVisibilityChange on initial mount when isSidebarOpen is false', () => {
    const onSidebarVisibilityChange = jest.fn();
    render(
      <SistentThemeProvider initialMode="light">
        <DashboardLayout
          isSidebarOpen={false}
          sidebarContent={WIDGETS}
          onSidebarVisibilityChange={onSidebarVisibilityChange}
        >
          <div>Dashboard</div>
        </DashboardLayout>
      </SistentThemeProvider>
    );

    expect(onSidebarVisibilityChange).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Context value tests
// ---------------------------------------------------------------------------

describe('DashboardLayoutContext – standalone usage', () => {
  it('useDashboardLayoutContext returns null when used outside DashboardLayout', () => {
    let ctxValue: ReturnType<typeof useDashboardLayoutContext> = undefined as unknown as null;

    function Probe() {
      ctxValue = useDashboardLayoutContext();
      return null;
    }

    render(<Probe />);
    expect(ctxValue).toBeNull();
  });

  it('DashboardLayoutContext.Provider propagates value correctly', () => {
    let ctxValue: ReturnType<typeof useDashboardLayoutContext> = null;
    const mockClose = jest.fn();
    const mockOpen = jest.fn();

    function Probe() {
      ctxValue = useDashboardLayoutContext();
      return null;
    }

    render(
      <DashboardLayoutContext.Provider
        value={{
          isMobile: false,
          isSheet: false,
          isSidebarVisible: true,
          closeSidebar: mockClose,
          openSidebar: mockOpen
        }}
      >
        <Probe />
      </DashboardLayoutContext.Provider>
    );

    expect(ctxValue?.isMobile).toBe(false);
    expect(ctxValue?.isSheet).toBe(false);
    expect(ctxValue?.isSidebarVisible).toBe(true);

    ctxValue?.closeSidebar();
    expect(mockClose).toHaveBeenCalledTimes(1);

    ctxValue?.openSidebar();
    expect(mockOpen).toHaveBeenCalledTimes(1);
  });

  describe('sidebar height derivation from sidebarTopOffset (#1843)', () => {
    it('derives height as calc(100dvh - offset) when sidebarTopOffset is provided without sidebarHeight', () => {
      renderLayout({
        isSidebarOpen: true,
        sidebarTopOffset: '64px',
        sidebarContent: <div data-testid="sidebar-child">content</div>
      });

      const container = screen.getByTestId('sidebar-child').parentElement;
      const styles = window.getComputedStyle(container as Element);
      expect(styles.height).toBe('calc(100dvh - 64px)');
      expect(styles.maxHeight).toBe('calc(100dvh - 64px)');
      expect(styles.top).toBe('64px');
    });

    it('formats numeric sidebarTopOffset in pixels for height calc', () => {
      renderLayout({
        isSidebarOpen: true,
        sidebarTopOffset: 80,
        sidebarContent: <div data-testid="sidebar-child">content</div>
      });

      const container = screen.getByTestId('sidebar-child').parentElement;
      const styles = window.getComputedStyle(container as Element);
      expect(styles.height).toBe('calc(100dvh - 80px)');
      expect(styles.maxHeight).toBe('calc(100dvh - 80px)');
      expect(styles.top).toBe('80px');
    });

    it('respects explicit sidebarHeight when both are provided', () => {
      renderLayout({
        isSidebarOpen: true,
        sidebarTopOffset: '64px',
        sidebarHeight: '500px',
        sidebarContent: <div data-testid="sidebar-child">content</div>
      });

      const container = screen.getByTestId('sidebar-child').parentElement;
      const styles = window.getComputedStyle(container as Element);
      expect(styles.height).toBe('500px');
      expect(styles.maxHeight).toBe('500px');
      expect(styles.top).toBe('64px');
    });

    it('defaults to 100dvh when sidebarTopOffset is 0 or not provided', () => {
      renderLayout({
        isSidebarOpen: true,
        sidebarTopOffset: '0',
        sidebarContent: <div data-testid="sidebar-child">content</div>
      });

      const container = screen.getByTestId('sidebar-child').parentElement;
      const styles = window.getComputedStyle(container as Element);
      expect(styles.height).toBe('100dvh');
      expect(styles.maxHeight).toBe('100dvh');
    });
  });
});
