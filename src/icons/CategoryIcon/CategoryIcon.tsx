import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { CARIBBEAN_GREEN, DARK_SLATE_GRAY, KEPPEL, useTheme } from '../../theme';
import { CustomIconProps } from '../types';

export const CategoryIcon: FC<CustomIconProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  primaryFill,
  secondaryFill,
  style = {},
  ...props
}) => {
  const theme = useTheme();
  const themeMode = theme?.palette?.mode ?? 'light';
  const themePrimaryFill = primaryFill ?? (themeMode === 'dark' ? KEPPEL : DARK_SLATE_GRAY);
  const themeSecondaryFill = secondaryFill ?? (themeMode === 'dark' ? CARIBBEAN_GREEN : KEPPEL);

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={style}
      {...props}
    >
      <path d="m12 2-5.5 9h11z" fill={themeSecondaryFill} />
      <path
        d="M17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5z"
        fill={themePrimaryFill}
      />
      <path d="M3 13h8v8H3z" fill={themePrimaryFill} />
    </svg>
  );
};
