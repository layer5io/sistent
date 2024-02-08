import SvgIcon from '@mui/material/SvgIcon';

/**
 * Function component for rendering an info icon.
 * @param {import("../type").IconProps} props - Icon props.
 * @returns {JSX.Element} - Info icon SVG element.
 */
export function ErrorIcon({ width = '24', height = '24', fill = 'currentColor', ...props }) {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill={fill}
      style={props.style}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </SvgIcon>
  );
}

export default ErrorIcon;
