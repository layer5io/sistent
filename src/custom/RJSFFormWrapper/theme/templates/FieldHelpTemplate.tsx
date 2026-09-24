/* eslint-disable @typescript-eslint/no-explicit-any */
import FormHelperText from '@mui/material/FormHelperText';
import { RichHelp } from '@rjsf/core';
import {
  type FieldHelpProps,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  getUiOptions,
  helpId
} from '@rjsf/utils';
import React from 'react';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Sistent's `FieldHelpTemplate` renders field helper text.
 */
export default function FieldHelpTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: FieldHelpProps<T, S, F>): React.JSX.Element | null {
  const { fieldPathId, help, uiSchema, registry } = props;
  if (!help) {
    return null;
  }
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const { rjsfSlotProps: { helpFormHelperText } = {} } = getMuiProps(uiOptions);

  return (
    <FormHelperText
      component="div"
      {...helpFormHelperText}
      id={helpId(fieldPathId)}
      sx={computeSxProps({ mt: 0.5 }, helpFormHelperText)}
    >
      <RichHelp help={help} registry={registry} uiSchema={uiSchema} />
    </FormHelperText>
  );
}
