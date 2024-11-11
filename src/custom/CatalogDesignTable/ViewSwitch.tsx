/**
 * Renders a switch component for toggling between grid and table view.
 *
 * @typedef {("grid" | "table")} TypeView
 * @typedef {object} Props
 * @prop {TypeView} props.view - The current view type ("grid" or "table").
 * @prop {Function} props.changeView - The function to change the view type.
 */

import { IconButton } from '@mui/material';
import { GridViewIcon, TableViewIcon } from '../../icons';
import { useTheme } from '../../theme';
import { CustomTooltip } from '../CustomTooltip';

type TypeView = 'grid' | 'table';

interface ViewSwitchProps {
  view: TypeView;
  changeView: (view: TypeView) => void;
  height?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const ViewSwitch: React.FC<ViewSwitchProps> = ({
  view,
  changeView,
  height = '3rem',
  style = {},
  disabled = false
}) => {
  const handleClick = () => {
    changeView(view === 'grid' ? 'table' : 'grid');
  };

  const Icon = view === 'grid' ? TableViewIcon : GridViewIcon;
  const label = view === 'grid' ? 'Table View' : 'Grid View';
  const theme = useTheme();

  return (
    <CustomTooltip title={label} arrow>
      <span>
        <IconButton
          disabled={disabled}
          onClick={handleClick}
          aria-label="Switch View"
          sx={{
            height: { height },
            borderRadius: '50%',
            padding: '0.625rem',
            '&:hover': {
              '& svg': {
                fill: theme.palette.primary.brand?.default
              },
              borderRadius: '4px'
            },
            ...style
          }}
          disableRipple
        >
          <Icon fill={theme.palette.icon.default} opacity={disabled ? 0.5 : 1} />
        </IconButton>
      </span>
    </CustomTooltip>
  );
};
