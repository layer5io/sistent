import { FC } from "react";
import { IconProps } from "./types";

export const RectangleShape: FC<IconProps> = ({ width, height, ...props }) => {
    return (
        <path d="M40 0H0V40H40V0Z" {...props} />
    )
}

export default RectangleShape