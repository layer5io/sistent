import React from 'react';
import { Paper as MuiPaper, PaperProps } from '@mui/material';

export function Paper(props: PaperProps) {
	return <MuiPaper {...props}>{props.children}</MuiPaper>
}