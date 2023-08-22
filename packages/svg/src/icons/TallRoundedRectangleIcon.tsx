import React, { FC } from "react";
import { IconProps } from "./types";

export const TallRoundedRectangleIcon: FC<IconProps> = ({ width, height, ...props }) => {
    return (
        <svg
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 40"
            {...props}
        >
            <rect width="32" height="40" rx="5" {...props} />
        </svg>
    )
}

export default TallRoundedRectangleIcon