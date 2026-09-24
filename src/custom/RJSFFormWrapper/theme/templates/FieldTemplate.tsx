/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FieldTemplateProps,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  descriptionId,
  getTemplate,
  getUiOptions
} from '@rjsf/utils';
import React from 'react';
import { FormControl } from '../../../../base/FormControl';
import { Typography } from '../../../../base/Typography';
import { useTheme } from '../../../../theme';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Sistent's `FieldTemplate` wraps every schema field with Sistent FormControl styling.
 */
export default function FieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: FieldTemplateProps<T, S, F>): React.JSX.Element {
  const theme = useTheme();
  const {
    id,
    children,
    classNames,
    style,
    disabled,
    displayLabel,
    hidden,
    label,
    onKeyRename,
    onKeyRenameBlur,
    onRemoveProperty,
    readonly,
    required,
    rawErrors = [],
    errors,
    help,
    description,
    rawDescription,
    schema,
    uiSchema,
    registry
  } = props;

  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate<'WrapIfAdditionalTemplate', T, S, F>(
    'WrapIfAdditionalTemplate',
    registry,
    uiOptions
  );

  if (hidden) {
    return <div style={{ display: 'none' }}>{children}</div>;
  }

  const isSelfDescribingWidget =
    uiOptions.widget === 'checkbox' ||
    uiOptions.widget === 'switch' ||
    uiOptions.widget === 'toggle' ||
    (schema.type === 'boolean' && !uiOptions.widget);
  const { rjsfSlotProps: muiSlotProps, ...otherMuiProps } = getMuiProps(uiOptions);

  return (
    <WrapIfAdditionalTemplate
      classNames={classNames}
      style={style}
      disabled={disabled}
      id={id}
      label={label}
      displayLabel={displayLabel}
      rawDescription={rawDescription}
      onKeyRename={onKeyRename}
      onKeyRenameBlur={onKeyRenameBlur}
      onRemoveProperty={onRemoveProperty}
      readonly={readonly}
      required={required}
      schema={schema}
      uiSchema={uiSchema}
      registry={registry}
    >
      <FormControl
        fullWidth
        {...otherMuiProps}
        {...muiSlotProps?.fieldFormControl}
        error={rawErrors.length > 0}
        required={required}
        sx={computeSxProps(otherMuiProps.sx ?? {}, muiSlotProps?.fieldFormControl)}
        className={[otherMuiProps.className, muiSlotProps?.fieldFormControl?.className]
          .filter(Boolean)
          .join(' ') || undefined}
      >
        {children}
        {displayLabel && !isSelfDescribingWidget && rawDescription ? (
          <Typography
            variant="caption"
            {...muiSlotProps?.fieldTypography}
            id={descriptionId(id)}
            sx={computeSxProps({ mt: 0.5, color: theme.palette.text.secondary }, muiSlotProps?.fieldTypography)}
          >
            {description}
          </Typography>
        ) : null}
        {errors}
        {help}
      </FormControl>
    </WrapIfAdditionalTemplate>
  );
}
