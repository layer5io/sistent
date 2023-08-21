import { FC } from "react";
import { IconProps } from "./types";

export const RectangleShape: FC<IconProps> = ({
    color
}) => {
    return (
        <path d="M40 0H0V40H40V0Z" fill={color} />
    )
}

export default RectangleShape