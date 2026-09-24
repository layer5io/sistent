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
  labelValue,
  optionId
} from '@rjsf/utils';
import React, { type ChangeEvent, type FocusEvent } from 'react';
import { FormControlLabel } from '../../../../base/FormControlLabel';
import { FormLabel } from '../../../../base/FormLabel';
import { Radio } from '../../../../base/Radio';
import { RadioGroup } from '../../../../base/RadioGroup';
import { getMuiProps } from '../util';

/**
 * Sistent's `RadioWidget` renders single-choice radio option groups.
 */
export default function RadioWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>): React.JSX.Element {
  const {
    id,
    htmlName,
    options,
    value,
    required,
    disabled,
    readonly,
    label,
    hideLabel,
    autofocus,
    onChange,
    onBlur,
    onFocus
  } = props;

  const { enumOptions, enumDisabled, emptyValue } = options;
  const optionValueFormat = getOptionValueFormat(options);

  const _onChange = (_: ChangeEvent<HTMLInputElement>, val: string): void => {
    onChange(enumOptionValueDecoder(val, enumOptions, optionValueFormat, emptyValue));
  };

  const _onBlur = ({ target }: FocusEvent<HTMLInputElement>): void => {
    onBlur(
      id,
      enumOptionValueDecoder(target && target.value, enumOptions, optionValueFormat, emptyValue)
    );
  };

  const _onFocus = ({ target }: FocusEvent<HTMLInputElement>): void => {
    onFocus(
      id,
      enumOptionValueDecoder(target && target.value, enumOptions, optionValueFormat, emptyValue)
    );
  };

  const row = options ? Boolean(options.inline) : false;
  const selectValue = enumOptionSelectedValue(value, enumOptions, false, optionValueFormat, '');
  const { rjsfSlotProps: muiSlotProps, ...otherMuiProps } = getMuiProps(options);

  return (
    <>
      {labelValue(
        <FormLabel {...muiSlotProps?.formLabel} id={`${id}-label`} required={required}>
          {label || undefined}
        </FormLabel>,
        hideLabel
      )}
      <RadioGroup
        {...otherMuiProps}
        {...muiSlotProps?.radioGroup}
        id={id}
        name={htmlName || id}
        value={selectValue}
        row={row}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-labelledby={!hideLabel && label ? `${id}-label` : undefined}
        aria-label={hideLabel && label ? label : undefined}
        aria-describedby={ariaDescribedByIds(id)}
      >
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index) => {
            const itemDisabled =
              Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
            return (
              <FormControlLabel
                {...muiSlotProps?.formControlLabel}
                control={
                  <Radio
                    {...muiSlotProps?.radio}
                    name={htmlName || id}
                    id={optionId(id, index)}
                    color="primary"
                    autoFocus={Boolean(autofocus && index === 0)}
                  />
                }
                label={option.label}
                value={enumOptionValueEncoder(option.value, index, optionValueFormat)}
                key={index}
                disabled={disabled || itemDisabled || readonly}
              />
            );
          })}
      </RadioGroup>
    </>
  );
}
