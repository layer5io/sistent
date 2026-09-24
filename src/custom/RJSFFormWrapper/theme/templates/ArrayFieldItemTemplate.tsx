/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ArrayFieldItemTemplateProps,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  getTemplate,
  getUiOptions
} from '@rjsf/utils';
import React, { type CSSProperties } from 'react';
import { Box } from '../../../../base/Box';
import { Grid } from '../../../../base/Grid';
import { Paper } from '../../../../base/Paper';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Sistent's `ArrayFieldItemTemplate` renders individual items in an array list with reorder/remove controls.
 */
export default function ArrayFieldItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ArrayFieldItemTemplateProps<T, S, F>): React.JSX.Element {
  const { children, buttonsProps, hasDescription, hasToolbar, uiSchema, registry } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const ArrayFieldItemButtonsTemplate = getTemplate<'ArrayFieldItemButtonsTemplate', T, S, F>(
    'ArrayFieldItemButtonsTemplate',
    registry,
    uiOptions
  );

  const btnStyle: CSSProperties = {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
    fontWeight: 'bold',
    minWidth: 0
  };

  const {
    rjsfSlotProps: {
      arrayItemGridContainer,
      arrayItemGridItem,
      arrayItemInnerBox,
      arrayItemOuterBox,
      arrayItemPaper,
      arrayItemToolbarGrid
    } = {}
  } = getMuiProps(uiOptions);

  return (
    <Grid
      container
      spacing={1}
      {...arrayItemGridContainer}
      sx={computeSxProps({ alignItems: 'center', mb: 1 }, arrayItemGridContainer)}
    >
      <Grid
        size={hasToolbar ? { xs: 8, sm: 9, md: 10, lg: 10.5 } : 12}
        {...arrayItemGridItem}
        sx={computeSxProps({ overflow: 'auto' }, arrayItemGridItem)}
      >
        <Box {...arrayItemOuterBox} sx={computeSxProps({ mb: 1 }, arrayItemOuterBox)}>
          <Paper
            variant="outlined"
            {...arrayItemPaper}
            sx={computeSxProps({ p: 2, borderRadius: 1 }, arrayItemPaper)}
          >
            <Box {...arrayItemInnerBox} sx={computeSxProps({}, arrayItemInnerBox)}>
              {children}
            </Box>
          </Paper>
        </Box>
      </Grid>
      {hasToolbar && (
        <Grid
          size={{ xs: 4, sm: 3, md: 2, lg: 1.5 }}
          {...arrayItemToolbarGrid}
          sx={computeSxProps({ mt: hasDescription ? -3 : 0 }, arrayItemToolbarGrid)}
        >
          <ArrayFieldItemButtonsTemplate {...buttonsProps} style={btnStyle} />
        </Grid>
      )}
    </Grid>
  );
}
