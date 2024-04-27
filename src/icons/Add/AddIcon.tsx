import SistentIcon from '../SistentIcon';
import { IconProps } from '../types';

function AddIcon({ fill = 'none', ...props }: IconProps): React.JSX.Element {
  return (
    <SistentIcon
      size={props.size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-testid="add-icon-svg"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill={fill} />
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </SistentIcon>
  );
}

export default AddIcon;

export { AddIcon };
