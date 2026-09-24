/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  type WidgetProps,
  ariaDescribedByIds,
  enumOptionsDeselectValue,
  enumOptionsIsSelected,
  enumOptionsSelectValue,
  labelValue,
  optionId
} from '@rjsf/utils';
import React, { type ChangeEvent } from 'react';
import { Checkbox } from '../../../../base/Checkbox';
import { FormControlLabel } from '../../../../base/FormControlLabel';
import { FormGroup } from '../../../../base/FormGroup';
import { FormLabel } from '../../../../base/FormLabel';
import { getMuiProps } from '../util';

/**
 * Sistent's `CheckboxesWidget` renders checkbox groups for enum arrays.
 */
export default function CheckboxesWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>): React.JSX.Element {
  const {
    label,
    hideLabel,
    id,
    htmlName,
    disabled,
    options,
    value,
    autofocus,
    readonly,
    required,
    onChange,
    onBlur,
    onFocus
  } = props;

  const { enumOptions, enumDisabled, inline } = options;
  const checkboxesValues = Array.isArray(value) ? value : value !== undefined ? [value] : [];

  const _onChange =
    (index: number) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>): void => {
      if (checked) {
        onChange(enumOptionsSelectValue(index, checkboxesValues, enumOptions));
      } else {
        onChange(enumOptionsDeselectValue(index, checkboxesValues, enumOptions));
      }
    };

  const _onBlur = (): void => {
    onBlur(id, checkboxesValues);
  };

  const _onFocus = (): void => {
    onFocus(id, checkboxesValues);
  };

  const { rjsfSlotProps: muiSlotProps, ...otherMuiProps } = getMuiProps(options);

  return (
    <>
      {labelValue(
        <FormLabel {...muiSlotProps?.formLabel} id={`${id}-label`} required={required}>
          {label || undefined}
        </FormLabel>,
        hideLabel
      )}
      <FormGroup
        role="group"
        {...otherMuiProps}
        {...muiSlotProps?.formGroup}
        id={id}
        row={Boolean(inline)}
        aria-labelledby={!hideLabel && label ? `${id}-label` : undefined}
        aria-label={hideLabel && label ? label : undefined}
      >
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index) => {
            const checked = enumOptionsIsSelected(option.value, checkboxesValues);
            const itemDisabled =
              Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
            const checkbox = (
              <Checkbox
                {...muiSlotProps?.checkbox}
                id={optionId(id, index)}
                name={htmlName || id}
                checked={checked}
                disabled={disabled || itemDisabled || readonly}
                autoFocus={Boolean(autofocus && index === 0)}
                onChange={_onChange(index)}
                onBlur={_onBlur}
                onFocus={_onFocus}
                aria-describedby={ariaDescribedByIds(id)}
              />
            );
            return (
              <FormControlLabel
                {...muiSlotProps?.formControlLabel}
                control={checkbox}
                key={index}
                label={option.label}
              />
            );
          })}
      </FormGroup>
    </>
  );
}
