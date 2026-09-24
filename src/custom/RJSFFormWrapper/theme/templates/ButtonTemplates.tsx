/* eslint-disable @typescript-eslint/no-explicit-any */
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import CopyIcon from '@mui/icons-material/ContentCopy';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  type FormContextType,
  type IconButtonProps,
  type RJSFSchema,
  type StrictRJSFSchema,
  type SubmitButtonProps,
  TranslatableString,
  getSubmitButtonOptions,
  getUiOptions
} from '@rjsf/utils';
import React from 'react';
import { Box } from '../../../../base/Box';
import { Button } from '../../../../base/Button';
import { IconButton } from '../../../../base/IconButton';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Submit button template for RJSF forms, supporting text, custom styling, and slot customization.
 */
export function SubmitButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ uiSchema }: SubmitButtonProps<T, S, F>): React.JSX.Element | null {
  const {
    submitText,
    norender,
    props: submitButtonProps = {}
  } = getSubmitButtonOptions<T, S, F>(uiSchema);
  if (norender) {
    return null;
  }
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const { rjsfSlotProps: { submitButton: submitButtonSlotProps, submitBox } = {}, ...otherMuiProps } =
    getMuiProps(uiOptions);
  return (
    <Box {...otherMuiProps} {...submitBox} sx={computeSxProps(otherMuiProps.sx ?? { mt: 2 }, submitBox)}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        {...submitButtonSlotProps}
        {...submitButtonProps}
      >
        {submitText}
      </Button>
    </Box>
  );
}

/**
 * Add button template for appending items to array fields in RJSF.
 */
export function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ uiSchema, registry, color, ...props }: IconButtonProps<T, S, F>): React.JSX.Element {
  const { translateString } = registry;
  const uiOptions = getUiOptions(uiSchema);
  const muiProps = getMuiProps(uiOptions, [
    'color',
    'disableFocusRipple',
    'disableRipple',
    'edge',
    'size',
    'sx'
  ]);
  const { color: muiColor, ...otherMuiProps } = muiProps;
  const resolvedColor = (muiColor || color || 'primary') as any;
  return (
    <IconButton
      title={translateString(TranslatableString.AddItemButton)}
      color={resolvedColor}
      size="small"
      {...otherMuiProps}
      {...props}
    >
      <AddIcon fontSize="small" />
    </IconButton>
  );
}

/**
 * Shared icon button component used across RJSF array and action button templates.
 */
export function SistentIconButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>): React.JSX.Element {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    icon,
    color,
    uiSchema,
    registry: _registry,
    iconType: _iconType,
    ...otherProps
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const uiOptions = getUiOptions(uiSchema);
  const muiProps = getMuiProps(uiOptions, [
    'color',
    'disableFocusRipple',
    'disableRipple',
    'edge',
    'size',
    'sx'
  ]);
  const { color: muiColor, ...otherMuiProps } = muiProps;
  const resolvedColor = (muiColor || color) as any;
  return (
    <IconButton
      size="small"
      color={resolvedColor}
      {...otherMuiProps}
      {...otherProps}
    >
      {icon}
    </IconButton>
  );
}

/**
 * Copy button template for duplicating an array item in RJSF.
 */
export function CopyButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>): React.JSX.Element {
  const {
    registry: { translateString }
  } = props;
  return (
    <SistentIconButton
      title={translateString(TranslatableString.CopyButton)}
      {...props}
      icon={<CopyIcon fontSize="small" />}
    />
  );
}

/**
 * Move-down button template for shifting an array item downward in RJSF.
 */
export function MoveDownButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>): React.JSX.Element {
  const {
    registry: { translateString }
  } = props;
  return (
    <SistentIconButton
      title={translateString(TranslatableString.MoveDownButton)}
      {...props}
      icon={<ArrowDownwardIcon fontSize="small" />}
    />
  );
}

/**
 * Move-up button template for shifting an array item upward in RJSF.
 */
export function MoveUpButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>): React.JSX.Element {
  const {
    registry: { translateString }
  } = props;
  return (
    <SistentIconButton
      title={translateString(TranslatableString.MoveUpButton)}
      {...props}
      icon={<ArrowUpwardIcon fontSize="small" />}
    />
  );
}

/**
 * Remove button template for deleting an array item in RJSF.
 */
export function RemoveButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>): React.JSX.Element {
  const { iconType, registry, ...otherProps } = props;
  const { translateString } = registry;
  return (
    <SistentIconButton
      title={translateString(TranslatableString.RemoveButton)}
      color="error"
      registry={registry}
      {...otherProps}
      icon={<RemoveIcon fontSize={iconType === 'default' ? undefined : 'small'} />}
    />
  );
}

/**
 * Clear button template for resetting a text input field in RJSF.
 */
export function ClearButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>): React.JSX.Element {
  const { iconType, registry, ...otherProps } = props;
  const { translateString } = registry;
  return (
    <SistentIconButton
      title={translateString(TranslatableString.ClearButton)}
      registry={registry}
      {...otherProps}
      icon={<ClearIcon fontSize={iconType === 'default' ? undefined : 'small'} />}
    />
  );
}

export default {
  AddButton,
  CopyButton,
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
  SubmitButton,
  ClearButton
};
