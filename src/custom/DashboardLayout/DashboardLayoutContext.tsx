import { createContext, useContext } from 'react';

export interface DashboardLayoutContextValue {
  /** Whether the dashboard is currently at the mobile breakpoint (below 'md'). */
  isMobile: boolean;
  /** Whether the sidebarContent is currently rendered inside the mobile BottomSheet. */
  isSheet: boolean;
  /** Whether the sidebar panel is currently visible/expanded (not minimized). */
  isSidebarVisible: boolean;
  /** Minimize the sidebar panel (shows the reopen FAB without ending edit mode). */
  closeSidebar: () => void;
  /** Expand the sidebar panel. */
  openSidebar: () => void;
}

export const DashboardLayoutContext = createContext<DashboardLayoutContextValue | null>(null);

/**
 * Consume the DashboardLayoutContext value.
 *
 * Returns `null` when called outside a DashboardLayout — consumers (e.g.
 * WidgetPicker) should treat `null` as "no layout context available" and fall
 * back to their standalone behaviour.
 */
export function useDashboardLayoutContext(): DashboardLayoutContextValue | null {
  return useContext(DashboardLayoutContext);
}
