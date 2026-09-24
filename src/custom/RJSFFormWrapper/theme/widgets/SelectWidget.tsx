/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  type WidgetProps,
  ariaDescribedByIds,
  enumOptionSelectedValue,
  enumOptionValueDecoder,
  enumOptionValueEncoder,
  getOptionValueFormat,
  labelValue
} from '@rjsf/utils';
import React, { type ChangeEvent, type FocusEvent } from 'react';
import { MenuItem } from '../../../../base/MenuItem';
import { TextField, type TextFieldProps } from '../../../../base/TextField';
import { getMuiProps } from '../util';

/**
 * Sistent's `SelectWidget` renders dropdown menus using Sistent Select / MenuItem.
 */
export default function SelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>): React.JSX.Element {
  const {
    schema,
    id,
    htmlName,
    options,
    label,
    hideLabel,
    required,
    disabled,
    placeholder,
    readonly,
    value,
    multiple,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    rawErrors = []
  } = props;

  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options;
  const optionValueFormat = getOptionValueFormat(options);
  const isMultiple = typeof multiple === 'undefined' ? false : Boolean(multiple);
  const emptyValue = isMultiple ? [] : '';
  const isEmpty =
    typeof value === 'undefined' ||
    (isMultiple && Array.isArray(value) && value.length < 1) ||
    (!isMultiple && value === emptyValue);

  const _onChange = ({ target: { value: nextVal } }: ChangeEvent<HTMLInputElement>): void => {
    onChange(enumOptionValueDecoder(nextVal, enumOptions, optionValueFormat, optEmptyVal));
  };

  const _onBlur = ({ target }: FocusEvent<HTMLInputElement>): void => {
    onBlur(
      id,
      enumOptionValueDecoder(target && target.value, enumOptions, optionValueFormat, optEmptyVal)
    );
  };

  const _onFocus = ({ target }: FocusEvent<HTMLInputElement>): void => {
    onFocus(
      id,
      enumOptionValueDecoder(target && target.value, enumOptions, optionValueFormat, optEmptyVal)
    );
  };

  const { rjsfSlotProps: muiSlotProps, ...otherMuiProps } = getMuiProps(options);
  const showPlaceholderOption = !isMultiple && schema.default === undefined;

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    schema: _schema,
    id: _id,
    htmlName: _htmlName,
    options: _options,
    label: _label,
    hideLabel: _hideLabel,
    required: _required,
    disabled: _disabled,
    placeholder: _placeholder,
    readonly: _readonly,
    value: _value,
    multiple: _multiple,
    autofocus: _autofocus,
    onChange: _onChange2,
    onBlur: _onBlur2,
    onFocus: _onFocus2,
    rawErrors: _rawErrors,
    // exclude RJSF-only props that must not reach TextField
    name: _name,
    hideError: _hideError,
    errorSchema: _errorSchema,
    uiSchema: _uiSchema,
    registry: _registry,
    InputLabelProps: _InputLabelProps,
    SelectProps: _SelectProps,
    formContext: _formContext,
    color: _color,
    ...textFieldProps
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const forwardedTextFieldProps: Partial<Omit<TextFieldProps, 'color'>> = textFieldProps;

  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      {...otherMuiProps}
      {...forwardedTextFieldProps}
      id={id}
      name={htmlName || id}
      label={labelValue(label || undefined, hideLabel, undefined)}
      aria-label={hideLabel && label ? label : undefined}
      value={enumOptionSelectedValue(value, enumOptions, isMultiple, optionValueFormat, emptyValue)}
      required={required}
      disabled={disabled}
      autoFocus={autofocus}
      error={rawErrors.length > 0}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      select
      slotProps={{
        ...muiSlotProps,
        input: {
          ...muiSlotProps?.input,
          ...(readonly ? { readOnly: true } : undefined)
        },
        inputLabel: {
          ...muiSlotProps?.inputLabel,
          shrink: !isEmpty
        },
        select: {
          ...muiSlotProps?.select,
          multiple: isMultiple,
          ...(readonly ? { readOnly: true } : undefined),
          ...(hideLabel && label ? { 'aria-label': label } : undefined)
        }
      }}
      aria-describedby={ariaDescribedByIds(id)}
    >
      {showPlaceholderOption && (
        <MenuItem {...muiSlotProps?.menuItem} value="">
          <em>{placeholder || 'Select...'}</em>
        </MenuItem>
      )}
      {Array.isArray(enumOptions) &&
        enumOptions.map(({ value: optVal, label: optLabel }, i) => {
          const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(optVal) !== -1;
          return (
            <MenuItem
              key={i}
              {...muiSlotProps?.menuItem}
              value={enumOptionValueEncoder(optVal, i, optionValueFormat)}
              disabled={itemDisabled}
            >
              {optLabel}
            </MenuItem>
          );
        })}
    </TextField>
  );
}
