import React, { useState, useEffect } from 'react';
import { Box } from '../../base';
import { useTheme, useMediaQuery } from '../../theme';
import { SwipeableDrawer } from '@mui/material';

export interface DashboardLayoutProps {
  /** The main dashboard content (typically the React-Grid-Layout) */
  children: React.ReactNode;
  
  /** Whether the right-hand sidebar should be visible */
  isSidebarOpen: boolean;
  
  /** The content to render inside the sidebar (e.g., Widget Gallery) */
  sidebarContent: React.ReactNode;
  
  /** Optional custom width for the sidebar. Defaults to responsive width. */
  sidebarWidth?: string | number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string | number>>;

  /** Optional sticky top offset for the sidebar (useful if page has a top navbar) */
  sidebarTopOffset?: string | number;

  /** Optional fixed height for the sticky sidebar. Defaults to 100vh */
  sidebarHeight?: string | number;

  /** Callback fired when the component requests to be closed (e.g. clicking the backdrop on mobile) */
  onClose?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  isSidebarOpen,
  sidebarContent,
  sidebarWidth = { xs: '100%', md: '350px' },
  sidebarTopOffset = '0',
  sidebarHeight = '100vh',
  onClose,
}) => {
  const theme = useTheme();
  // We use the 'md' breakpoint (900px default) to switch between mobile and desktop layout
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const drawerBleeding = 56;

  useEffect(() => {
    if (isSidebarOpen) {
      setIsMobileDrawerOpen(true);
    } else {
      setIsMobileDrawerOpen(false);
    }
  }, [isSidebarOpen]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}>
      <Box sx={{ flex: 1, padding: 0, minWidth: 0 }}>
        {children}
      </Box>
      
      {isMobile && (
        <>
          <SwipeableDrawer
            anchor="bottom"
            open={isMobileDrawerOpen}
            onClose={() => {
              setIsMobileDrawerOpen(false);
              onClose?.();
            }}
            onOpen={() => setIsMobileDrawerOpen(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiPaper-root': {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: 'visible',
              },
              '& .MuiDrawer-paper': {
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -drawerBleeding,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                visibility: 'visible',
                right: 0,
                left: 0,
                backgroundColor: theme.palette.background.paper,
                height: drawerBleeding,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                cursor: 'pointer',
              }}
              onClick={() => {
                const nextState = !isMobileDrawerOpen;
                setIsMobileDrawerOpen(nextState);
                if (!nextState) {
                  onClose?.();
                }
              }}
            >
              <Box
                sx={{
                  width: 30,
                  height: 6,
                  backgroundColor: theme.palette.mode === 'light' ? '#e0e0e0' : '#424242',
                  borderRadius: 3,
                }}
              />
            </Box>
            <Box sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
              {sidebarContent}
            </Box>
          </SwipeableDrawer>
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
