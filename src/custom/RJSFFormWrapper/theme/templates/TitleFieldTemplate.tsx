/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  type TitleFieldProps,
  getUiOptions
} from '@rjsf/utils';
import React from 'react';
import { Box } from '../../../../base/Box';
import { Divider } from '../../../../base/Divider';
import { Grid } from '../../../../base/Grid';
import { Typography } from '../../../../base/Typography';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Sistent's `TitleFieldTemplate` renders section headers with Sistent typography.
 */
export default function TitleFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: TitleFieldProps<T, S, F>): React.JSX.Element {
  const { id, title, optionalDataControl, uiSchema } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const {
    rjsfSlotProps: {
      titleBox,
      titleDivider,
      titleTypography,
      titleGridContainer,
      titleGridItem,
      titleOptionalDataGridItem
    } = {}
  } = getMuiProps(uiOptions);

  let heading = (
    <Typography
      variant="h6"
      {...titleTypography}
      sx={computeSxProps({ fontWeight: 600 }, titleTypography)}
    >
      {title}
    </Typography>
  );

  if (optionalDataControl) {
    heading = (
      <Grid container spacing={0} {...titleGridContainer}>
        <Grid {...titleGridItem} style={{ ...titleGridItem?.style, flexGrow: 1 }}>
          {heading}
        </Grid>
        <Grid
          {...titleOptionalDataGridItem}
          sx={computeSxProps({ justifyContent: 'flex-end', display: 'flex' }, titleOptionalDataGridItem)}
        >
          {optionalDataControl}
        </Grid>
      </Grid>
    );
  }

  return (
    <Box {...titleBox} id={id} sx={computeSxProps({ mb: 1.5, mt: 1.5 }, titleBox)}>
      {heading}
      <Divider {...titleDivider} sx={computeSxProps({ mt: 0.5, mb: 1 }, titleDivider)} />
    </Box>
  );
}
