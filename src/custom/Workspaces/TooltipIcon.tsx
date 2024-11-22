import { IconButton } from '@mui/material';
import { useTheme } from '../../theme';
import { CustomTooltip } from '../CustomTooltip';
import { IconWrapper } from '../ResponsiveDataTable';

interface TooltipIconProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  iconType: string;
  id: string;
  style?: React.CSSProperties;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  disabled?: boolean;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({
  children,
  onClick,
  title,
  iconType,
  id,
  style,
  placement,
  disabled = false
}) => {
  const theme = useTheme();
  return (
    <CustomTooltip key={id} title={title} placement={placement}>
      <IconWrapper disabled={disabled}>
        <IconButton
          disabled={disabled}
          onClick={onClick}
          sx={{
            '&:hover': {
              '& svg': {
                fill:
                  iconType === 'delete'
                    ? theme.palette.error.main
                    : theme.palette.primary.brand?.default
              }
            },
            ...style
          }}
          disableRipple
        >
          {children}
        </IconButton>
      </IconWrapper>
    </CustomTooltip>
  );
};

export default TooltipIcon;
