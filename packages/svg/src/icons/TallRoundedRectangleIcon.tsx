import React, { FC } from "react";
import { IconProps } from "./types";

export const TallRoundedRectangleIcon: FC<IconProps> = ({
    height,
    width,
    fill,
    color
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 32 40"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="32" height="40" rx="5" fill={color} />
        </svg>
    )
}

export default TallRoundedRectangleIcon