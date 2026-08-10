import React, { useState, useEffect, useRef } from 'react';
import { Box, Fab } from '../../base';
import { AddIcon } from '../../icons/Add';
import { useTheme, useMediaQuery } from '../../theme';
import { BottomSheet } from '../BottomSheet';

export interface DashboardLayoutProps {
  /** The main dashboard content (typically the React-Grid-Layout) */
  children: React.ReactNode;

  /** Whether Edit Mode is active (controls sidebar visibility). When this
   *  transitions from false → true the mobile sheet auto-opens. */
  isSidebarOpen: boolean;

  /** The content to render inside the sidebar (e.g., Widget Gallery) */
  sidebarContent: React.ReactNode;

  /** Optional custom width for the sidebar. Defaults to responsive width. */
  sidebarWidth?: string | number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string | number>>;

  /** Optional sticky top offset for the sidebar (useful if page has a top navbar) */
  sidebarTopOffset?: string | number;

  /** Optional fixed height for the sticky sidebar. Defaults to 100vh */
  sidebarHeight?: string | number;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  isSidebarOpen,
  sidebarContent,
  sidebarWidth = { xs: '100%', md: '350px' },
  sidebarTopOffset = '0',
  sidebarHeight = '100vh'
}) => {
  const theme = useTheme();
  // We use the 'md' breakpoint (900px default) to switch between mobile and desktop layout
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // isSheetVisible is independently owned by DashboardLayout:
  // - resets to true whenever Edit Mode (isSidebarOpen) transitions OFF → ON
  // - can be set to false by the user dismissing the sheet (FAB appears instead)
  // - set to false when Edit Mode turns OFF
  // This two-dimension model prevents the sheet from re-opening on every
  // isSidebarOpen change after the user has intentionally minimized it.
  const [isSheetVisible, setIsSheetVisible] = useState(isSidebarOpen);
  const prevIsSidebarOpen = useRef(isSidebarOpen);

  useEffect(() => {
    if (isSidebarOpen && !prevIsSidebarOpen.current) {
      // Edit Mode just turned ON → pop the sheet open
      setIsSheetVisible(true);
    }
    if (!isSidebarOpen) {
      // Edit Mode turned OFF → close the sheet and hide the FAB
      setIsSheetVisible(false);
    }
    prevIsSidebarOpen.current = isSidebarOpen;
  }, [isSidebarOpen]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}>
      <Box sx={{ flex: 1, padding: 0, minWidth: 0 }}>
        {children}
      </Box>

      {isSidebarOpen && isMobile && (
        <>
          <BottomSheet
            open={isSheetVisible}
            onClose={() => setIsSheetVisible(false)}
            maxHeight="50vh"
          >
            {sidebarContent}
          </BottomSheet>

          {/* FAB appears when Edit Mode is active but the sheet has been minimized,
              letting users rearrange the dashboard and pull the picker back up. */}
          {!isSheetVisible && (
            <Fab
              color="primary"
              aria-label="Open Widget Picker"
              onClick={() => setIsSheetVisible(true)}
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
        <Box
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            position: 'sticky',
            top: sidebarTopOffset,
            alignSelf: 'flex-start',
            height: sidebarHeight,
            maxHeight: sidebarHeight,
          }}
        >
          {sidebarContent}
        </Box>
      )}
    </Box>
  );
};
