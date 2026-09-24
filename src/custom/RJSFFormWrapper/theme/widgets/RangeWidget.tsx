/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  type WidgetProps,
  ariaDescribedByIds,
  labelValue,
  rangeSpec
} from '@rjsf/utils';
import React, { type FocusEvent } from 'react';
import { Box } from '../../../../base/Box';
import { FormLabel } from '../../../../base/FormLabel';
import { Slider } from '../../../../base/Slider';
import { Typography } from '../../../../base/Typography';
import { useTheme } from '../../../../theme';
import { computeSxProps, getMuiProps } from '../util';

/**
 * Sistent's `RangeWidget` renders numeric range sliders.
 */
export default function RangeWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>): React.JSX.Element {
  const theme = useTheme();
  const {
    value,
    readonly,
    disabled,
    onBlur,
    onFocus,
    options,
    schema,
    onChange,
    required,
    label,
    hideLabel,
    id
  } = props;

  const sliderProps = { value, id, ...rangeSpec<S>(schema) };

  const _onChange = (_: Event, val: number | number[]): void => {
    onChange(val);
  };

  const _onBlur = ({ target }: FocusEvent<HTMLInputElement>): void => {
    onBlur(id, target && target.value);
  };

  const _onFocus = ({ target }: FocusEvent<HTMLInputElement>): void => {
    onFocus(id, target && target.value);
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
      <Box
        {...otherMuiProps}
        {...muiSlotProps?.rangeBox}
        sx={computeSxProps(
          [{ display: 'flex', alignItems: 'center', gap: 2 }, ...(Array.isArray(otherMuiProps.sx) ? otherMuiProps.sx : otherMuiProps.sx ? [otherMuiProps.sx] : [])],
          muiSlotProps?.rangeBox
        )}
      >
        <Slider
          {...sliderProps}
          {...(muiSlotProps?.rangeSlider ?? muiSlotProps?.slider)}
          disabled={disabled || readonly}
          onChange={_onChange}
          onBlur={_onBlur}
          onFocus={_onFocus}
          valueLabelDisplay="auto"
          value={Number(value ?? sliderProps.min ?? 0)}
          aria-labelledby={!hideLabel && label ? `${id}-label` : undefined}
          aria-label={hideLabel && label ? label : undefined}
          aria-describedby={ariaDescribedByIds(id)}
        />
        <Typography
          variant="body2"
          {...muiSlotProps?.rangeTypography}
          sx={computeSxProps(
            { minWidth: 32, textAlign: 'right', color: theme.palette.text.secondary },
            muiSlotProps?.rangeTypography
          )}
        >
          {value ?? sliderProps.min ?? 0}
        </Typography>
      </Box>
    </>
  );
}
