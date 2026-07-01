import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const AccountTreeIcon = ({
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    ...props
}: IconProps): JSX.Element => {
    return (
        <svg
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            >
            <path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z" />
            </svg>
    );
};

export default AccountTreeIcon;