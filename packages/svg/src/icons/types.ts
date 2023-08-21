type Properties<K extends string | number, T> = {
    [P in K]: T;
};

type CSSProperties = Properties<string | number, string & {}>

export type IconProps = {
    width?: string | number;
    height?: string | number;
    color?: string;
    fill?: string;
    style?: CSSProperties | undefined;
    onClick?: () => void;
    className?: string;
}