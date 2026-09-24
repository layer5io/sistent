/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADDITIONAL_PROPERTY_FLAG,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  TranslatableString,
  type WrapIfAdditionalTemplateProps,
  buttonId,
  getUiOptions
} from '@rjsf/utils';
import React, { type CSSProperties } from 'react';
import { Grid } from '../../../../base/Grid';
import { TextField } from '../../../../base/TextField';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Sistent's `WrapIfAdditionalTemplate` allows renaming and removing dynamic keys in `additionalProperties`.
 */
export default function WrapIfAdditionalTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WrapIfAdditionalTemplateProps<T, S, F>): React.JSX.Element {
  const {
    children,
    classNames,
    style,
    disabled,
    id,
    label,
    displayLabel,
    onKeyRenameBlur,
    onRemoveProperty,
    readonly,
    required,
    schema,
    uiSchema,
    registry
  } = props;

  const { templates, translateString } = registry;
  const { RemoveButton } = templates.ButtonTemplates;
  const keyLabel = translateString(TranslatableString.KeyLabel, [label]);
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;
  const btnStyle: CSSProperties = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold'
  };
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const {
    rjsfSlotProps: {
      wrapGridContainer,
      wrapKeyGridItem,
      wrapChildrenGridItem,
      wrapRemoveButtonGridItem
    } = {}
  } = getMuiProps(uiOptions);

  if (!additional) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    );
  }

  const {
    className: slotContainerClassName,
    style: slotContainerStyle,
    ...otherWrapGridContainer
  } = wrapGridContainer || {};

  return (
    <Grid
      key={`${id}-key`}
      container
      spacing={2}
      {...otherWrapGridContainer}
      className={[classNames, slotContainerClassName].filter(Boolean).join(' ') || undefined}
      style={{ ...style, ...slotContainerStyle }}
      sx={computeSxProps({ alignItems: 'flex-start' }, wrapGridContainer)}
    >
      <Grid size={5.5} {...wrapKeyGridItem}>
        <TextField
          key={label}
          fullWidth
          required={required}
          label={displayLabel ? keyLabel : undefined}
          defaultValue={label}
          disabled={disabled}
          id={`${id}-key`}
          name={`${id}-key`}
          onBlur={!readonly ? onKeyRenameBlur : undefined}
          type="text"
          slotProps={{
            input: readonly ? { readOnly: true } : undefined,
            htmlInput: readonly ? { readOnly: true } : undefined
          }}
        />
      </Grid>
      <Grid size={5.5} {...wrapChildrenGridItem}>
        {children}
      </Grid>
      <Grid size={1} {...wrapRemoveButtonGridItem} sx={computeSxProps({ mt: 1 }, wrapRemoveButtonGridItem)}>
        <RemoveButton
          id={buttonId(id, 'remove')}
          className="rjsf-object-property-remove"
          iconType="default"
          style={btnStyle}
          disabled={disabled || readonly}
          onClick={onRemoveProperty}
          uiSchema={uiSchema}
          registry={registry}
        />
      </Grid>
    </Grid>
  );
}
