import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { CHARCOAL_FILL, DEFAULT_WHITE_FILL } from '../../constants/constants';
import { IconProps } from '../types';

export type IconSize = 'xsmall' | 'small' | 'medium' | 'large';

const iconSizes: Record<IconSize, { width: number; height: number }> = {
  xsmall: { width: 16, height: 16 },
  small: { width: 24, height: 24 },
  medium: { width: 32, height: 32 },
  large: { width: 40, height: 40 }
};

export default function SistentIcon({
  title,
  size = 'small',
  fill = CHARCOAL_FILL,
  stroke,
  strokeWidth,
  viewBox,
  sx,
  children,
  ...rest
}: IconProps) {
  const { width, height } = iconSizes[size];
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const fillColor = isDarkMode ? DEFAULT_WHITE_FILL : fill || CHARCOAL_FILL;
  const strokeColor = isDarkMode && stroke ? DEFAULT_WHITE_FILL : stroke;

  return (
    <Box
      component={'svg'}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      sx={sx}
      {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </Box>
  );
}
