import { ReactNode } from 'react';
import { IconButton } from '../../base';
import { useTheme } from '../../theme';
import { HOVER_DELETE } from '../../theme/colors/colors';
import { CustomTooltip } from '../CustomTooltip';
import { IconWrapper } from '../ResponsiveDataTable';

interface UnpublishTooltipIconProps {
  children: ReactNode;
  onClick: () => void;
  title: string;
  iconType: 'delete' | 'publish';
  id: string;
  style?: object;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  disabled?: boolean;
}

function UnpublishTooltipIcon({
  children,
  onClick,
  title,
  iconType,
  id,
  style,
  placement,
  disabled = false
}: UnpublishTooltipIconProps) {
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
                fill: iconType === 'delete' ? HOVER_DELETE : theme.palette.primary.brand?.default
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
}

export default UnpublishTooltipIcon;
