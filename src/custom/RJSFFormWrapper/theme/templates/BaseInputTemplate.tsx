/* eslint-disable @typescript-eslint/no-explicit-any */
import InputAdornment from '@mui/material/InputAdornment';
import { SchemaExamples } from '@rjsf/core';
import {
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  type WidgetProps,
  ariaDescribedByIds,
  examplesId,
  getInputProps,
  labelValue
} from '@rjsf/utils';
import React, { useCallback, type ChangeEvent, type FocusEvent } from 'react';
import { TextField, type TextFieldProps } from '../../../../base/TextField';
import { getMuiProps } from '../util';

const TYPES_THAT_SHRINK_LABEL = ['date', 'datetime-local', 'file', 'time'];

/**
 * Sistent's `BaseInputTemplate` renders the basic `<input>` / `TextField` component.
 * It is used for text, email, number, url, password, and other text-based widgets.
 */
export default function BaseInputTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>): React.JSX.Element {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    id,
    name: _name,
    htmlName,
    placeholder,
    required,
    readonly,
    disabled,
    type,
    label,
    hideLabel,
    hideError: _hideError,
    value,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
    autofocus,
    options,
    schema,
    uiSchema: _uiSchema,
    rawErrors = [],
    errorSchema: _errorSchema,
    registry,
    InputLabelProps,
    InputProps,
    formContext: _formContext,
    color: _color,
    ...textFieldProps
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const forwardedTextFieldProps: Partial<Omit<TextFieldProps, 'color'>> = textFieldProps;
  const { ClearButton } = registry.templates.ButtonTemplates;
  const { step, min, max, accept, ...rest } = getInputProps<T, S, F>(schema, type, options);
  const muiProps = getMuiProps(options);
  const { rjsfSlotProps: muiSlotProps, ...otherMuiProps } = muiProps;

  const htmlInputProps = {
    ...muiSlotProps?.htmlInput,
    step,
    min,
    max,
    accept,
    ...(schema.examples ? { list: examplesId(id) } : undefined),
    ...(readonly ? { readOnly: true } : undefined),
    ...(hideLabel && label ? { 'aria-label': label } : undefined)
  };

  const _onChange = ({ target: { value: nextValue } }: ChangeEvent<HTMLInputElement>): void => {
    onChange(nextValue === '' ? options.emptyValue : nextValue);
  };

  const _onBlur = ({ target }: FocusEvent<HTMLInputElement>): void => {
    onBlur(id, target && target.value);
  };

  const _onFocus = ({ target }: FocusEvent<HTMLInputElement>): void => {
    onFocus(id, target && target.value);
  };

  const DisplayInputLabelProps = TYPES_THAT_SHRINK_LABEL.includes(type)
    ? {
        ...muiSlotProps?.inputLabel,
        ...InputLabelProps,
        shrink: true
      }
    : {
        ...muiSlotProps?.inputLabel,
        ...InputLabelProps
      };

  const _onClear = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onChange(options.emptyValue ?? '');
    },
    [onChange, options.emptyValue]
  );

  const inputProps = {
    ...InputProps,
    ...muiSlotProps?.input,
    ...(readonly ? { readOnly: true } : undefined)
  };

  if (options.allowClearTextInputs && value && !readonly && !disabled) {
    const clearAdornment = (
      <InputAdornment position="end">
        <ClearButton registry={registry} onClick={_onClear} />
      </InputAdornment>
    );
    inputProps.endAdornment = !inputProps.endAdornment ? (
      clearAdornment
    ) : (
      <>
        {inputProps.endAdornment}
        {clearAdornment}
      </>
    );
  }

  return (
    <>
      <TextField
        fullWidth
        placeholder={placeholder}
        {...otherMuiProps}
        {...forwardedTextFieldProps}
        {...rest}
        id={id}
        name={htmlName || id}
        label={labelValue(label || undefined, hideLabel, undefined)}
        aria-label={hideLabel && label ? label : undefined}
        autoFocus={autofocus}
        required={required}
        disabled={disabled}
        slotProps={{
          ...muiSlotProps,
          input: inputProps,
          htmlInput: htmlInputProps,
          inputLabel: DisplayInputLabelProps
        }}
        value={value || value === 0 ? value : ''}
        error={rawErrors.length > 0}
        onChange={onChangeOverride || _onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds(id, !!schema.examples)}
      />
      <SchemaExamples id={id} schema={schema} />
    </>
  );
}
