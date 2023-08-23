import React from "react";
import { Dialog as MuiDialog, DialogProps } from "@mui/material";

export function Dialog(props: DialogProps) {
    return <MuiDialog {...props} />
}