import type {
  AlertProps,
  BoxProps,
  ButtonProps,
  CardProps,
  CheckboxProps,
  DividerProps,
  FormControlLabelProps,
  FormControlProps,
  FormGroupProps,
  FormHelperTextProps,
  FormLabelProps,
  GridProps,
  InputBaseComponentProps,
  InputLabelProps,
  InputProps,
  ListItemProps,
  ListProps,
  MenuItemProps,
  PaperProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  SliderProps,
  SvgIconProps,
  SwitchProps,
  TextFieldProps,
  TypographyProps
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { FormContextType, RJSFSchema, StrictRJSFSchema, UIOptionsType } from '@rjsf/utils';

export type SistentSlotProps<P> = Omit<P, 'ref'>;

/**
 * Slot props for individual Sistent/MUI sub-components across RJSF widgets and templates.
 * Explicitly declares known sub-component slot props with their corresponding MUI prop types.
 */
export interface SistentMuiSlotProps {
  // Radio & Checkbox slots
  radioGroup?: Partial<SistentSlotProps<RadioGroupProps>>;
  formGroup?: Partial<SistentSlotProps<FormGroupProps>>;
  formControlLabel?: Partial<SistentSlotProps<FormControlLabelProps>>;
  formLabel?: Partial<SistentSlotProps<FormLabelProps>>;
  radio?: Partial<SistentSlotProps<RadioProps>>;
  checkbox?: Partial<SistentSlotProps<CheckboxProps>>;
  switch?: Partial<SistentSlotProps<SwitchProps>>;
  toggle?: Partial<SistentSlotProps<SwitchProps>>;

  // Form field & Typography slots
  fieldFormControl?: Partial<SistentSlotProps<FormControlProps>>;
  fieldTypography?: Partial<SistentSlotProps<TypographyProps>>;
  descTypography?: Partial<SistentSlotProps<TypographyProps>>;
  helpFormHelperText?: Partial<SistentSlotProps<FormHelperTextProps>>;
  fieldErrorList?: Partial<SistentSlotProps<ListProps>>;
  fieldErrorListItem?: Partial<SistentSlotProps<ListItemProps>>;
  fieldErrorFormHelperText?: Partial<SistentSlotProps<FormHelperTextProps>>;

  // Title slots
  titleBox?: Partial<SistentSlotProps<BoxProps>>;
  titleTypography?: Partial<SistentSlotProps<TypographyProps>>;
  titleDivider?: Partial<SistentSlotProps<DividerProps>>;
  titleGridContainer?: Partial<SistentSlotProps<GridProps>>;
  titleGridItem?: Partial<SistentSlotProps<GridProps>>;
  titleOptionalDataGridItem?: Partial<SistentSlotProps<GridProps>>;

  // Error list slots
  errorAlert?: Partial<SistentSlotProps<AlertProps>>;
  errorListRoot?: Partial<SistentSlotProps<BoxProps>>;
  errorListCard?: Partial<SistentSlotProps<CardProps>>;
  errorListHeading?: Partial<SistentSlotProps<TypographyProps>>;
  errorList?: Partial<SistentSlotProps<ListProps>>;
  errorListItem?: Partial<SistentSlotProps<ListItemProps>>;
  errorListItemText?: Partial<SistentSlotProps<TypographyProps>>;

  // Button slots
  submitButton?: Partial<SistentSlotProps<ButtonProps>>;
  submitBox?: Partial<SistentSlotProps<BoxProps>>;
  addButton?: Partial<SistentSlotProps<ButtonProps>>;
  removeButton?: Partial<SistentSlotProps<ButtonProps>>;
  moveUpButton?: Partial<SistentSlotProps<ButtonProps>>;
  moveDownButton?: Partial<SistentSlotProps<ButtonProps>>;

  // Input & Select slots
  textField?: Partial<SistentSlotProps<TextFieldProps>>;
  input?: Partial<SistentSlotProps<InputProps>>;
  htmlInput?: InputBaseComponentProps;
  inputLabel?: Partial<SistentSlotProps<InputLabelProps>>;
  select?: Partial<SistentSlotProps<SelectProps>>;
  menuItem?: Partial<SistentSlotProps<MenuItemProps>>;

  // Range widget slots
  rangeBox?: Partial<SistentSlotProps<BoxProps>>;
  slider?: Partial<SistentSlotProps<SliderProps>>;
  rangeSlider?: Partial<SistentSlotProps<SliderProps>>;
  rangeTypography?: Partial<SistentSlotProps<TypographyProps>>;

  // Array slots
  arrayBox?: Partial<SistentSlotProps<BoxProps>>;
  arrayPaper?: Partial<SistentSlotProps<PaperProps>>;
  arrayToolbar?: Partial<SistentSlotProps<BoxProps>>;
  arrayAddButton?: Partial<SistentSlotProps<ButtonProps>>;
  arrayAddButtonBox?: Partial<SistentSlotProps<BoxProps>>;
  arrayAddButtonGridContainer?: Partial<SistentSlotProps<GridProps>>;
  arrayAddButtonGridItem?: Partial<SistentSlotProps<GridProps>>;
  arrayItemGridContainer?: Partial<SistentSlotProps<GridProps>>;
  arrayItemGridItem?: Partial<SistentSlotProps<GridProps>>;
  arrayItemInnerBox?: Partial<SistentSlotProps<BoxProps>>;
  arrayItemOuterBox?: Partial<SistentSlotProps<BoxProps>>;
  arrayItemPaper?: Partial<SistentSlotProps<PaperProps>>;
  arrayItemToolbarGrid?: Partial<SistentSlotProps<GridProps>>;

  // Object field & Wrapper slots
  objectBox?: Partial<SistentSlotProps<BoxProps>>;
  objectGrid?: Partial<SistentSlotProps<GridProps>>;
  objectGridContainer?: Partial<SistentSlotProps<GridProps>>;
  objectGridItem?: Partial<SistentSlotProps<GridProps>>;
  objectAddButtonGridContainer?: Partial<SistentSlotProps<GridProps>>;
  objectAddButtonGridItem?: Partial<SistentSlotProps<GridProps>>;
  wrapBox?: Partial<SistentSlotProps<BoxProps>>;
  wrapGridContainer?: Partial<SistentSlotProps<GridProps>>;
  wrapKeyGridItem?: Partial<SistentSlotProps<GridProps>>;
  wrapChildrenGridItem?: Partial<SistentSlotProps<GridProps>>;
  wrapRemoveButtonGridItem?: Partial<SistentSlotProps<GridProps>>;
  wrapHelpIcon?: Partial<SistentSlotProps<SvgIconProps>>;
}

/**
 * Top-level MUI customization options read from `uiSchema.ui:options.mui`.
 * Known fields are explicitly typed; additional MUI props can be passed as unknown.
 */
export interface SistentMuiOptions {
  sx?: SxProps<Theme>;
  className?: string;
  rjsfSlotProps?: SistentMuiSlotProps;
  [key: string]: unknown;
}

/**
 * Extract props meant for MUI/Sistent components from the `options` field of the `uiSchema`.
 */
export function getMuiProps<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = unknown
>(
  options?: UIOptionsType<T, S, F>,
  propsToFilter?: string[]
): SistentMuiOptions {
  const muiProps = (options?.mui as SistentMuiOptions) || {};
  if (propsToFilter) {
    return Object.keys(muiProps)
      .filter((key) => propsToFilter.includes(key))
      .reduce((obj: Record<string, unknown>, key) => {
        obj[key] = muiProps[key];
        return obj;
      }, {}) as SistentMuiOptions;
  }
  return muiProps;
}

/**
 * Merges base sx props with any custom sx specified in uiOptions.mui.
 */
export function computeSxProps(
  sxProps: SxProps<Theme>,
  muiProps?: SistentMuiOptions
): SxProps<Theme> {
  if (!muiProps) {
    return sxProps;
  }
  const sxIsObject = sxProps !== null && typeof sxProps === 'object' && !Array.isArray(sxProps);
  if (Array.isArray(muiProps?.sx)) {
    return sxIsObject
      ? [sxProps, ...muiProps.sx] as unknown as SxProps<Theme>
      : [...(Array.isArray(sxProps) ? sxProps : [sxProps]), ...muiProps.sx] as unknown as SxProps<Theme>;
  }
  if (typeof muiProps?.sx === 'function') {
    return sxIsObject
      ? [sxProps, muiProps.sx] as unknown as SxProps<Theme>
      : [...(Array.isArray(sxProps) ? sxProps : [sxProps]), muiProps.sx] as unknown as SxProps<Theme>;
  }
  if (muiProps?.sx) {
    return sxIsObject
      ? { ...(sxProps as object), ...(muiProps.sx as object) } as unknown as SxProps<Theme>
      : [...(Array.isArray(sxProps) ? sxProps : [sxProps]), muiProps.sx] as unknown as SxProps<Theme>;
  }
  return sxProps;
}
