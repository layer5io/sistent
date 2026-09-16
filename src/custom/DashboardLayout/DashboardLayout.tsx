import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Fab } from '../../base';
import { AddIcon } from '../../icons/Add';
import { useTheme, useMediaQuery } from '../../theme';
import { BottomSheet } from '../BottomSheet';
import { DashboardLayoutContext } from './DashboardLayoutContext';

export interface DashboardLayoutProps {
  /** The main dashboard content (typically the React-Grid-Layout) */
  children: React.ReactNode;

  /** Whether Edit Mode is active (controls sidebar visibility). When this
   *  transitions from false → true the mobile sheet auto-opens. */
  isSidebarOpen: boolean;

  /** The content to render inside the sidebar (e.g., Widget Gallery) */
  sidebarContent: React.ReactNode;

  /** Accessible title for the mobile bottom sheet (used as aria-labelledby on the Dialog).
   *  Defaults to 'Widget Picker'. */
  sidebarTitle?: string;

  /** Optional custom width for the sidebar. Defaults to responsive width. */
  sidebarWidth?: string | number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string | number>>;

  /** Optional sticky top offset for the sidebar (useful if page has a top navbar) */
  sidebarTopOffset?: string | number;

  /** Optional fixed height for the sticky sidebar. Defaults to `calc(100dvh - <sidebarTopOffset>)`. */
  sidebarHeight?: string | number;

  /** Background color for the mobile bottom sheet header */
  headerBackgroundColor?: string;

  /** Text color for the mobile bottom sheet header */
  headerTextColor?: string;

  /**
   * Controlled sidebar-panel visibility.
   * When provided, DashboardLayout becomes a controlled component for the
   * panel's open/minimized state and will not manage `sidebarVisible`
   * internally. Pair with `onSidebarVisibilityChange`.
   */
  sidebarVisible?: boolean;

  /**
   * Initial panel visibility when running uncontrolled.
   * Ignored when `sidebarVisible` is provided.
   * Defaults to `true` (panel starts open).
   */
  defaultSidebarVisible?: boolean;

  /**
   * Called when the panel's open/minimized state changes.
   * Receives the next value (`true` = expanded, `false` = minimized).
   */
  onSidebarVisibilityChange?: (visible: boolean) => void;

  /**
   * Whether to render the floating reopen FAB when the sidebar panel is
   * minimized while edit mode is still active.
   * Defaults to `true`.
   * Set to `false` when the host application provides its own toolbar button
   * that can reopen the panel.
   */
  showReopenFab?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  isSidebarOpen,
  sidebarContent,
  sidebarTitle = 'Widget Picker',
  sidebarWidth = { xs: '100%', md: '350px' },
  sidebarTopOffset = '0',
  sidebarHeight,
  headerBackgroundColor,
  headerTextColor,
  sidebarVisible: controlledVisible,
  defaultSidebarVisible = true,
  onSidebarVisibilityChange,
  showReopenFab = true,
}) => {
  const theme = useTheme();
  // We use the 'md' breakpoint (900px default) to switch between mobile and desktop layout
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // isSidebarVisible represents "panel expanded" (true) vs "panel minimized" (false).
  // This is independent of isSidebarOpen (the edit-session flag).
  // In uncontrolled mode, we manage visibility internally.
  // In controlled mode (sidebarVisible prop provided), the caller drives it.
  const isControlled = controlledVisible !== undefined;
  const [internalVisible, setInternalVisible] = useState(defaultSidebarVisible);

  const isSidebarVisible = isControlled ? (controlledVisible as boolean) : internalVisible;

  const setSidebarVisible = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalVisible(next);
      }
      onSidebarVisibilityChange?.(next);
    },
    [isControlled, onSidebarVisibilityChange]
  );

  const prevIsSidebarOpen = useRef(isSidebarOpen);

  useEffect(() => {
    if (isSidebarOpen && !prevIsSidebarOpen.current) {
      // Edit Mode just turned ON → expand the panel
      setSidebarVisible(true);
    }
    if (!isSidebarOpen && prevIsSidebarOpen.current) {
      // Edit Mode turned OFF → collapse the panel
      setSidebarVisible(false);
    }
    prevIsSidebarOpen.current = isSidebarOpen;
  }, [isSidebarOpen, setSidebarVisible]);

  const closeSidebar = useCallback(() => setSidebarVisible(false), [setSidebarVisible]);
  const openSidebar = useCallback(() => setSidebarVisible(true), [setSidebarVisible]);

  // Derive sidebar height: if sidebarTopOffset is a non-zero string or number,
  // use calc(100dvh - <offset>) so the sidebar never pushes content off viewport.
  const resolvedSidebarHeight =
    sidebarHeight !== undefined
      ? sidebarHeight
      : sidebarTopOffset && sidebarTopOffset !== '0' && sidebarTopOffset !== 0
        ? `calc(100dvh - ${typeof sidebarTopOffset === 'number' ? `${sidebarTopOffset}px` : sidebarTopOffset})`
        : '100dvh';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}>
      <Box sx={{ flex: 1, padding: 0, minWidth: 0 }}>
        {children}
      </Box>

      {isSidebarOpen && isMobile && (
        <>
          <DashboardLayoutContext.Provider
            value={{ isMobile, isSheet: true, isSidebarVisible, closeSidebar, openSidebar }}
          >
            <BottomSheet
              open={isSidebarVisible}
              onClose={closeSidebar}
              title={sidebarTitle}
              maxHeight="50vh"
              headerBackgroundColor={headerBackgroundColor}
              headerTextColor={headerTextColor}
            >
              {sidebarContent}
            </BottomSheet>
          </DashboardLayoutContext.Provider>

          {/* FAB appears when Edit Mode is active but the panel has been minimized,
              letting users rearrange the dashboard and pull the picker back up. */}
          {!isSidebarVisible && showReopenFab && (
            <Fab
              color="primary"
              aria-label="Open Widget Picker"
              onClick={openSidebar}
              sx={(fabTheme) => ({
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: fabTheme.zIndex.drawer,
              })}
            >
              <AddIcon fill={theme.palette.primary.contrastText} />
            </Fab>
          )}
        </>
      )}

      {isSidebarOpen && !isMobile && (
        <>
          {isSidebarVisible ? (
            <DashboardLayoutContext.Provider
              value={{ isMobile, isSheet: false, isSidebarVisible, closeSidebar, openSidebar }}
            >
              <Box
                sx={{
                  width: sidebarWidth,
                  flexShrink: 0,
                  position: 'sticky',
                  top: sidebarTopOffset,
                  alignSelf: 'flex-start',
                  height: resolvedSidebarHeight,
                  maxHeight: resolvedSidebarHeight,
                }}
              >
                {sidebarContent}
              </Box>
            </DashboardLayoutContext.Provider>
          ) : (
            showReopenFab && (
              <Fab
                color="primary"
                aria-label="Open Widget Picker"
                onClick={openSidebar}
                sx={(fabTheme) => ({
                  position: 'fixed',
                  bottom: 24,
                  right: 24,
                  zIndex: fabTheme.zIndex.drawer,
                })}
              >
                <AddIcon fill={theme.palette.primary.contrastText} />
              </Fab>
            )
          )}
        </>
      )}
    </Box>
  );
};
