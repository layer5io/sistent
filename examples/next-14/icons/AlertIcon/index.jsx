import SvgIcon from '@mui/material/SvgIcon';

/**
 * Function component for rendering an alert icon.
 * @param {import("../type").IconProps} props - Icon props.
 * @returns {JSX.Element} - Alert icon SVG element.
 */
export function AlertIcon({ width = '24', height = '24', fill = 'currentColor', ...props }) {
  return (
    <SvgIcon
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill="#fff"
      style={props.style}
    >
      <path
        d="M11.6042 11.6667H9.89591V7.49999H11.6042V11.6667ZM11.6042 15H9.89591V13.3333H11.6042V15ZM1.35425 17.5H20.1459L10.7501 1.66666L1.35425 17.5Z"
        fill={fill}
      />
    </SvgIcon>
  );
}

export default AlertIcon;
