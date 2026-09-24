/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ErrorListProps,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  TranslatableString,
  getUiOptions
} from '@rjsf/utils';
import React from 'react';
import { Alert } from '../../../../base/Alert';
import { AlertTitle } from '../../../../base/AlertTitle';
import { List } from '../../../../base/List';
import { ListItem } from '../../../../base/ListItem';
import { Typography } from '../../../../base/Typography';
import { useTheme } from '../../../../theme';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Sistent's `ErrorListTemplate` renders top-level validation error summaries using Sistent Alert.
 */
export default function ErrorListTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ errors, registry, uiSchema }: ErrorListProps<T, S, F>): React.JSX.Element {
  const theme = useTheme();
  const { translateString } = registry;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const {
    rjsfSlotProps: {
      errorAlert,
      errorList,
      errorListItem,
      errorListItemText
    } = {}
  } = getMuiProps(uiOptions);

  return (
    <Alert
      severity="error"
      {...errorAlert}
      sx={computeSxProps({ mb: 2 }, errorAlert)}
    >
      <AlertTitle>{translateString(TranslatableString.ErrorsLabel)}</AlertTitle>
      <List dense disablePadding {...errorList}>
        {errors.map((error, i) => (
          <ListItem key={i} disableGutters {...errorListItem}>
            <Typography
              variant="body2"
              {...errorListItemText}
              sx={computeSxProps({ color: theme.palette.text.error || theme.palette.error.main }, errorListItemText)}
            >
              {error.stack}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Alert>
  );
}
