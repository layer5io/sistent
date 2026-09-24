/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ArrayFieldTemplateProps,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  buttonId,
  getTemplate,
  getUiOptions
} from '@rjsf/utils';
import React from 'react';
import { Box } from '../../../../base/Box';
import { Grid } from '../../../../base/Grid';
import { Paper } from '../../../../base/Paper';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Sistent's `ArrayFieldTemplate` renders dynamic arrays with Sistent containers and add-item buttons.
 */
export default function ArrayFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ArrayFieldTemplateProps<T, S, F>): React.JSX.Element {
  const {
    canAdd,
    disabled,
    fieldPathId,
    uiSchema,
    items,
    optionalDataControl,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title
  } = props;

  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const ArrayFieldDescriptionTemplate = getTemplate<'ArrayFieldDescriptionTemplate', T, S, F>(
    'ArrayFieldDescriptionTemplate',
    registry,
    uiOptions
  );
  const ArrayFieldTitleTemplate = getTemplate<'ArrayFieldTitleTemplate', T, S, F>(
    'ArrayFieldTitleTemplate',
    registry,
    uiOptions
  );
  const effectiveTitle = uiOptions.title || title;
  const showOptionalDataControlInTitle = Boolean(effectiveTitle) && !readonly && !disabled;

  const {
    ButtonTemplates: { AddButton }
  } = registry.templates;

  const {
    rjsfSlotProps: {
      arrayPaper,
      arrayBox,
      arrayAddButtonGridContainer,
      arrayAddButtonGridItem,
      arrayAddButtonBox
    } = {}
  } = getMuiProps(uiOptions);

  return (
    <Paper
      variant="outlined"
      {...arrayPaper}
      sx={computeSxProps({ p: 2, mb: 2, borderRadius: 1 }, arrayPaper)}
    >
      <Box {...arrayBox} sx={computeSxProps({}, arrayBox)}>
        <ArrayFieldTitleTemplate
          fieldPathId={fieldPathId}
          title={effectiveTitle}
          schema={schema}
          uiSchema={uiSchema}
          required={required}
          registry={registry}
          optionalDataControl={showOptionalDataControlInTitle ? optionalDataControl : undefined}
        />
        <ArrayFieldDescriptionTemplate
          fieldPathId={fieldPathId}
          description={uiOptions.description || schema.description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
        {!showOptionalDataControlInTitle ? optionalDataControl : undefined}
        {items}
        {canAdd && (
          <Grid
            container
            {...arrayAddButtonGridContainer}
            sx={computeSxProps(
              { justifyContent: 'flex-end', display: 'flex', mt: 1 },
              arrayAddButtonGridContainer
            )}
          >
            <Grid {...arrayAddButtonGridItem}>
              <Box {...arrayAddButtonBox}>
                <AddButton
                  id={buttonId(fieldPathId, 'add')}
                  className="rjsf-array-item-add"
                  onClick={onAddClick}
                  disabled={disabled || readonly}
                  uiSchema={uiSchema}
                  registry={registry}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
}
