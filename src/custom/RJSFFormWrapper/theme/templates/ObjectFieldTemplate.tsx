/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FormContextType,
  type ObjectFieldTemplateProps,
  type RJSFSchema,
  type StrictRJSFSchema,
  buttonId,
  canExpand,
  descriptionId,
  getTemplate,
  getUiOptions,
  titleId
} from '@rjsf/utils';
import React from 'react';
import { Grid } from '../../../../base/Grid';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Sistent's `ObjectFieldTemplate` renders objects with clean grid spacing and section headings.
 */
export default function ObjectFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ObjectFieldTemplateProps<T, S, F>): React.JSX.Element {
  const {
    description,
    title,
    properties,
    required,
    disabled,
    readonly,
    uiSchema,
    fieldPathId,
    schema,
    formData,
    optionalDataControl,
    onAddProperty,
    registry
  } = props;

  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const TitleFieldTemplate = getTemplate<'TitleFieldTemplate', T, S, F>(
    'TitleFieldTemplate',
    registry,
    uiOptions
  );
  const DescriptionFieldTemplate = getTemplate<'DescriptionFieldTemplate', T, S, F>(
    'DescriptionFieldTemplate',
    registry,
    uiOptions
  );
  const showOptionalDataControlInTitle = !readonly && !disabled;

  const {
    ButtonTemplates: { AddButton }
  } = registry.templates;

  const {
    rjsfSlotProps: {
      objectGridContainer,
      objectGridItem,
      objectAddButtonGridContainer,
      objectAddButtonGridItem
    } = {}
  } = getMuiProps(uiOptions);

  return (
    <>
      {title && (
        <TitleFieldTemplate
          id={titleId(fieldPathId)}
          title={title}
          required={required}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
          optionalDataControl={showOptionalDataControlInTitle ? optionalDataControl : undefined}
        />
      )}
      {description && (
        <DescriptionFieldTemplate
          id={descriptionId(fieldPathId)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <Grid
        container
        spacing={2}
        {...objectGridContainer}
        sx={computeSxProps({ mt: 1 }, objectGridContainer)}
      >
        {(!title || !showOptionalDataControlInTitle) && optionalDataControl}
        {properties.map((element, index) => {
          // Prefer RJSF's stable key from element.content.key (which includes rename tracking),
          // falling back to element.name, and only using an index fallback if neither exists.
          const key =
            (element.content && (element.content as React.ReactElement).key) ??
            (typeof element.name === 'string' && element.name.length > 0 ? element.name : undefined) ??
            `property-${index}`;
          return element.hidden ? (
            <React.Fragment key={key}>{element.content}</React.Fragment>
          ) : (
            <Grid
              key={key}
              size={12}
              {...objectGridItem}
              sx={computeSxProps({ mb: 1 }, objectGridItem)}
            >
              {element.content}
            </Grid>
          );
        })}
      </Grid>
      {canExpand(schema, uiSchema, formData) && (
        <Grid
          container
          {...objectAddButtonGridContainer}
          sx={computeSxProps(
            { justifyContent: 'flex-end', display: 'flex', mt: 1 },
            objectAddButtonGridContainer
          )}
        >
          <Grid {...objectAddButtonGridItem}>
            <AddButton
              id={buttonId(fieldPathId, 'add')}
              className="rjsf-object-property-expand"
              onClick={onAddProperty}
              disabled={disabled || readonly}
              uiSchema={uiSchema}
              registry={registry}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
