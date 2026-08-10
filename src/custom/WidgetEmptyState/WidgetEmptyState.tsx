import React from 'react';
import { Box, Typography, Button, Stack } from '../../base';
import { useTheme } from '../../theme';

export interface WidgetEmptyStateProps {
  /** The message to display when no data is available */
  message?: string;

  /** Optional icon to display above the message */
  icon?: React.ReactNode;

  /** Optional action button configuration */
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const WidgetEmptyState: React.FC<WidgetEmptyStateProps> = ({
  message = 'No data available',
  icon,
  action,
}) => {
  const theme = useTheme();

  return (
    // Outer container is a plain presentational box — role="status" is scoped
    // only to the message Typography below so interactive descendants (icon, Button)
    // are not degraded by the live-region semantics.
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        minHeight: '120px',
        p: 3,
      }}
    >
      <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
        {icon && (
          <Box
            sx={{
              color: theme.palette.text.secondary,
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& svg': {
                width: 48,
                height: 48,
              },
            }}
          >
            {icon}
          </Box>
        )}
        {/* role="status" + aria-live scoped only to the message text, not the
            interactive siblings — per ARIA spec, live regions must not contain
            interactive elements or AT may hide/degrade their semantics. */}
        <Typography
          role="status"
          aria-live="polite"
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            textAlign: 'center',
            maxWidth: '280px',
          }}
        >
          {message}
        </Typography>
        {action && (
          <Button
            variant="outlined"
            size="small"
            onClick={action.onClick}
            sx={{ mt: 0.5 }}
          >
            {action.label}
          </Button>
        )}
      </Stack>
    </Box>
  );
};
