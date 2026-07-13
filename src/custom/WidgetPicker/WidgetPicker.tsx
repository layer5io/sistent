import React from 'react';
import { Box, IconButton, Stack, Typography } from '../../base';
import { AddIcon, CloseIcon } from '../../icons';
import { useTheme } from '../../theme';
import { SxProps, Theme } from '@mui/material';

export interface WidgetItem {
  key: string;
  title: string;
  thumbnail?: string;
  [key: string]: unknown; // Allow passing extra widget properties
}

export interface WidgetPickerProps {
  /** The list of widgets available to add */
  widgetsToAdd: WidgetItem[];
  
  /** Callback when a widget is clicked to be added */
  onAddWidget: (widget: Omit<WidgetItem, 'key'>, key: string) => void;
  
  /** Optional callback to close the picker (renders a Close icon if provided) */
  onClose?: () => void;
  
  /** Custom background color for the header. Defaults to theme.palette.background.default */
  headerBackgroundColor?: string;
  
  /** Custom text color for the header. Defaults to theme.palette.text.primary */
  headerTextColor?: string;
  
  /** Custom styles for the outer container (e.g. for custom box shadows or borders) */
  containerSx?: SxProps<Theme>;
}

export const WidgetPicker: React.FC<WidgetPickerProps> = ({
  widgetsToAdd,
  onAddWidget,
  onClose,
  headerBackgroundColor,
  headerTextColor,
  containerSx = {},
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        ...containerSx,
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: headerBackgroundColor || theme.palette.background.default,
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        <Typography variant="h5" sx={{ color: headerTextColor || theme.palette.text.primary }}>
          Widgets
        </Typography>
        {onClose && (
          <IconButton aria-label="Close widget picker" onClick={onClose} size="small">
            <CloseIcon fill={headerTextColor || theme.palette.text.primary} width="20" />
          </IconButton>
        )}
      </Stack>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          p: 2,
          overflowY: 'auto',
          flex: 1,
          minHeight: 0,
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.palette.divider} transparent`,
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: '4px',
            border: '2px solid transparent',
            backgroundClip: 'content-box',
            '&:hover': {
              backgroundColor: theme.palette.text.secondary,
            },
          },
        }}
      >
        {widgetsToAdd.length === 0 && (
          <Typography variant="body2" sx={{ color: theme.palette.text.primary, textAlign: 'center', mt: 2 }}>
            All widgets added to the layout.
          </Typography>
        )}

        {widgetsToAdd.map(({ key, ...widget }) => (
          <Box
            key={key}
            sx={{
              width: '100%',
              minWidth: '16rem',
              p: 1.5,
              height: '18rem',
              flexShrink: 0,
              backgroundColor: theme.palette.background.secondary,
              boxShadow: theme.shadows[1],
              borderRadius: 1,
            }}
          >
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography variant="button">{widget.title}</Typography>
              <IconButton
                aria-label={`Add ${widget.title} widget`}
                onClick={() => onAddWidget(widget, key)}
              >
                <AddIcon fill={theme.palette.text.primary} width="30" />
              </IconButton>
            </Stack>
            {widget.thumbnail && (
              <img
                src={widget.thumbnail}
                alt={widget.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '180px',
                  objectFit: 'contain',
                  marginTop: '0.5rem',
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
