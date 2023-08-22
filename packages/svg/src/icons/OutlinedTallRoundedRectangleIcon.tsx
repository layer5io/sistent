import React, { FC } from "react";
import { IconProps } from "./types";

export const OutlinedTallRoundedRectangleIcon: FC<IconProps> = ({ width, height, stroke = "currentColor", strokeWidth = "2", ...props }) => {
    return (
        <svg
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 40"
            {...props}
        >
            <rect width="28" height="36" x="2" y="2" rx="5" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
    )
}

export default { Outlined: OutlinedTallRoundedRectangleIcon }