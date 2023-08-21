import { FC } from "react";
import { IconProps } from "./types";

export const ZoomOutIcon: FC<IconProps> = ({
    width,
    height,
    fill
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={height}
            viewBox="0 0 24 24"
            width={width}
            fill={fill}
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 13H5v-2h14v2z" />
        </svg>
    )
}

export default ZoomOutIcon