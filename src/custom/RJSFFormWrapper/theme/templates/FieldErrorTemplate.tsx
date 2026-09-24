/* eslint-disable @typescript-eslint/no-explicit-any */
import FormHelperText from '@mui/material/FormHelperText';
import {
  type FieldErrorProps,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  errorId,
  getUiOptions
} from '@rjsf/utils';
import React from 'react';
import { List } from '../../../../base/List';
import { ListItem } from '../../../../base/ListItem';
import { getMuiProps } from '../util';

/**
 * Sistent's `FieldErrorTemplate` renders inline validation errors with status.error color tokens.
 */
export default function FieldErrorTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: FieldErrorProps<T, S, F>): React.JSX.Element | null {
  const { errors = [], fieldPathId, uiSchema } = props;
  if (errors.length === 0) {
    return null;
  }
  const id = errorId(fieldPathId);
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const muiProps = getMuiProps(uiOptions);
  const { rjsfSlotProps: muiSlotProps } = muiProps;

  return (
    <List dense disablePadding {...muiSlotProps?.fieldErrorList} id={id}>
      {errors.map((error, i) => (
        <ListItem key={i} disableGutters {...muiSlotProps?.fieldErrorListItem}>
          <FormHelperText
            component="div"
            {...muiSlotProps?.fieldErrorFormHelperText}
            error
            id={`${id}-${i}`}
          >
            {error}
          </FormHelperText>
        </ListItem>
      ))}
    </List>
  );
}
