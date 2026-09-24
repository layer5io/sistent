/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  type WidgetProps,
  ariaDescribedByIds,
  descriptionId,
  getTemplate,
  labelValue,
  schemaRequiresTrueValue
} from '@rjsf/utils';
import React, { type ChangeEvent } from 'react';
import { Checkbox } from '../../../../base/Checkbox';
import { FormControlLabel } from '../../../../base/FormControlLabel';
import { getMuiProps } from '../util';

/**
 * Sistent's `CheckboxWidget` renders boolean properties using Sistent Checkbox.
 */
export default function CheckboxWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>): React.JSX.Element {
  const {
    schema,
    id,
    htmlName,
    value,
    disabled,
    readonly,
    label = '',
    hideLabel,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    registry,
    options,
    uiSchema
  } = props;

  const DescriptionFieldTemplate = getTemplate<'DescriptionFieldTemplate', T, S, F>(
    'DescriptionFieldTemplate',
    registry,
    options
  );

  const required = schemaRequiresTrueValue(schema);
  const _onChange = (_: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    onChange(checked);
  };
  const _onBlur = (): void => onBlur(id, value);
  const _onFocus = (): void => onFocus(id, value);
  const description = options.description ?? schema.description;
  const { rjsfSlotProps: muiSlotProps, ...otherMuiProps } = getMuiProps(options);

  return (
    <>
      {description && (
        <DescriptionFieldTemplate
          id={descriptionId(id)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <FormControlLabel
        {...otherMuiProps}
        {...muiSlotProps?.formControlLabel}
        aria-label={hideLabel && label ? label : undefined}
        control={
          <Checkbox
            {...muiSlotProps?.checkbox}
            id={id}
            name={htmlName || id}
            checked={typeof value === 'undefined' ? false : Boolean(value)}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            aria-describedby={ariaDescribedByIds(id)}
            aria-label={hideLabel && label ? label : undefined}
          />
        }
        label={labelValue(label, hideLabel, false)}
      />
    </>
  );
}
