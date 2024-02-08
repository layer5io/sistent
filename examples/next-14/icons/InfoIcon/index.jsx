import SvgIcon from '@mui/material/SvgIcon';

/**
 * Function component for rendering an info icon.
 * @param {import("../type").IconProps} props - Icon props.
 * @returns {JSX.Element} - Info icon SVG element.
 */
export function InfoIcon({ width = '24', height = '24', fill = 'currentColor', ...props }) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={props.style}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10.0003 1.66666C5.40033 1.66666 1.66699 5.39999 1.66699 9.99999C1.66699 14.6 5.40033 18.3333 10.0003 18.3333C14.6003 18.3333 18.3337 14.6 18.3337 9.99999C18.3337 5.39999 14.6003 1.66666 10.0003 1.66666ZM10.8337 14.1667H9.16699V9.16666H10.8337V14.1667ZM10.8337 7.49999H9.16699V5.83332H10.8337V7.49999Z"
        fill={fill}
      />
      <defs>
        <clipPath id="clip0_19460_1750">
          <rect width={width} height={height} fill="none" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default InfoIcon;
