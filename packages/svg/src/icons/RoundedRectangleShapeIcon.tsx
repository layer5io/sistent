import { FC } from "react";
import { IconProps } from "./types";

export const RoundedRectangleShapeIcon: FC<IconProps> = ({
    color
}) => {
    return (
        <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="40" height="40" rx="9" fill={color} />
    </svg>
    )
}

export default RoundedRectangleShapeIcon