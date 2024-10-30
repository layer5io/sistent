import { FC } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { CARIBBEAN_GREEN, DARK_SLATE_GRAY, KEPPEL, useTheme } from '../../theme';
import { IconProps } from '../types';

type CatalogIconProps = {
  primaryFill?: string;
  secondaryFill?: string;
  tertiaryFill?: string;
} & IconProps;

export const CatalogIcon: FC<CatalogIconProps> = ({
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
      viewBox="0 0 64 64"
      style={style}
      {...props}
    >
      <path
        d="M32.03,60H5.1c-2.38,0-4.18-1.23-4.86-3.33-.15-.52-.25-1.11-.25-1.67C0,46.11-.04,37.19,0,28.3c0-.74.12-1.48.34-2.19,2.26-6.92,4.52-13.8,6.78-20.68.43-1.3.62-1.42,2.01-1.42h45.34c1.36,0,1.55.12,1.95,1.36,2.14,6.3,4.24,12.63,6.38,18.92.19.56.5,1.08.68,1.64.22.74.53,1.48.53,2.22.03,9.01.03,18.06,0,27.07,0,2.66-2.17,4.75-4.89,4.75-9.04.03-18.04.03-27.08.03ZM41.19,23.26h18.75c-.06-.28-.09-.43-.15-.62-1.76-5.25-3.53-10.47-5.26-15.71-.19-.59-.56-.65-1.05-.65H10.08c-.62,0-.9.22-1.08.8-1.67,5.19-3.37,10.37-5.08,15.53-.06.22-.12.43-.19.68h19.06c.31,2.38.99,2.99,3.37,2.99h11.67c2.32.03,3.09-.62,3.34-3.03ZM23.24,43.08c.22-.77.43-1.48.62-2.19.37-1.42-.34-2.75-1.64-3.12-1.36-.37-2.63.34-3.06,1.76-.53,1.73-1.05,3.49-1.55,5.25-.5,1.76.62,3.21,2.44,3.21h24.67c1.61,0,2.82-1.42,2.38-2.96-.59-2.01-1.27-3.95-1.98-5.93-.37-1.02-1.33-1.48-2.41-1.42-.99.06-1.89.71-2.1,1.67-.12.59-.03,1.2.06,1.82.12.65.37,1.23.62,1.91h-18.04Z"
        fill={themePrimaryFill}
      />

      <path
        d="M32.11,18.48h22.13c.34,0,.8,0,1.02.19.28.28.56.77.53,1.14-.03.62-.53.93-1.11.93-1.21.03-2.41,0-3.62,0H9.58c-.84-.03-1.36-.46-1.36-1.17s.53-1.14,1.39-1.14h11.14c3.78.06,7.55.06,11.36.06Z"
        fill={themeSecondaryFill}
        opacity={0.8}
      />
      <path
        d="M31.98,13.66h20.64c.31,0,.62,0,.93.03.62.09.99.43,1.02,1.08.03.65-.34,1.05-.99,1.2-.25.06-.53.03-.77.03H10.97c-.31,0-.71.03-.9-.12-.31-.31-.68-.8-.65-1.14.03-.37.53-.71.9-.99.19-.12.56-.06.84-.06,6.96-.03,13.9-.03,20.83-.03Z"
        fill={themeSecondaryFill}
        opacity={0.8}
      />
      <path
        d="M32,11.16H12.9c-.22,0-.46.03-.68-.03-.62-.12-1.02-.52-1.02-1.17s.4-1.02,1.05-1.14c.19-.03.4-.03.62-.03h38.25c.22,0,.4-.03.62.03.62.12,1.02.49,1.05,1.14.03.56-.46,1.11-1.11,1.2-.22.03-.4,0-.62,0h-19.06Z"
        fill={themeSecondaryFill}
        opacity={0.8}
      />
    </svg>
  );
};

export default CatalogIcon;
