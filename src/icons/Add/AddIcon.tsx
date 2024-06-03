import { DEFAULT_FILL_NONE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const AddIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fill = DEFAULT_FILL_NONE,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-testid="add-icon-svg"
      {...props}
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={fill} />
    </svg>
  );
};

export default AddIcon;
