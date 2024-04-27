import SistentIcon from '../SistentIcon';
import { IconProps } from '../types';

function AlertIcon({ ...props }: IconProps): React.JSX.Element {
  return (
    <SistentIcon
      size={props.size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={props.style}
      {...props}
    >
      <path
        d="M11.6042 11.6667H9.89591V7.49999H11.6042V11.6667ZM11.6042 15H9.89591V13.3333H11.6042V15ZM1.35425 17.5H20.1459L10.7501 1.66666L1.35425 17.5Z"
        fill={props.fill}
      />
    </SistentIcon>
  );
}

export default AlertIcon;

export { AlertIcon };
