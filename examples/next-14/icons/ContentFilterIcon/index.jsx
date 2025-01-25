import SvgIcon from '@mui/material/SvgIcon';

/**
 * Function component for rendering a content filter icon.
 * @param {import("../type").IconProps} props - Icon props.
 * @returns {JSX.Element} - Content filter icon SVG element.
 */
export function ContentFilterIcon({ width = '24', height = '24', ...props }) {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      // fill={props.fill}
      style={{ ...props.style }}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"
        fillOpacity=".54"
        // fill={props.fill}
      />
    </SvgIcon>
  );
}

export default ContentFilterIcon;
