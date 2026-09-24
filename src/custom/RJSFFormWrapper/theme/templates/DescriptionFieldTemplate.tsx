/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichDescription } from '@rjsf/core';
import {
  type DescriptionFieldProps,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  getUiOptions
} from '@rjsf/utils';
import React from 'react';
import { Typography } from '../../../../base/Typography';
import { useTheme } from '../../../../theme';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Sistent's `DescriptionFieldTemplate` renders field/section descriptions.
 */
export default function DescriptionFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: DescriptionFieldProps<T, S, F>): React.JSX.Element | null {
  const theme = useTheme();
  const { id, description, registry, uiSchema } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const { rjsfSlotProps: { descTypography } = {} } = getMuiProps(uiOptions);

  if (description) {
    return (
      <Typography
        variant="body2"
        {...descTypography}
        id={id}
        sx={computeSxProps({ mt: 0.5, mb: 1, color: theme.palette.text.secondary }, descTypography)}
      >
        <RichDescription description={description} registry={registry} uiSchema={uiSchema} />
      </Typography>
    );
  }
  return null;
}
