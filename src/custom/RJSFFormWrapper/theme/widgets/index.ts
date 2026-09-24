/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  FormContextType,
  RJSFSchema,
  RegistryWidgetsType,
  StrictRJSFSchema
} from '@rjsf/utils';
import CheckboxWidget from './CheckboxWidget';
import CheckboxesWidget from './CheckboxesWidget';
import FileWidget from './FileWidget';
import RadioWidget from './RadioWidget';
import RangeWidget from './RangeWidget';
import SelectWidget from './SelectWidget';
import TextWidget from './TextWidget';
import TextareaWidget from './TextareaWidget';
import ToggleWidget, { SwitchWidget } from './ToggleWidget';

export function generateWidgets<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): RegistryWidgetsType<T, S, F> {
  return {
    CheckboxWidget,
    CheckboxesWidget,
    FileWidget,
    RadioWidget,
    RangeWidget,
    SelectWidget,
    TextWidget,
    TextareaWidget,
    ToggleWidget,
    SwitchWidget,
    switch: SwitchWidget,
    toggle: ToggleWidget
  };
}

export {
  CheckboxWidget,
  CheckboxesWidget,
  FileWidget,
  RadioWidget,
  RangeWidget,
  SelectWidget,
  SwitchWidget,
  TextWidget,
  TextareaWidget,
  ToggleWidget
};

export default generateWidgets();
