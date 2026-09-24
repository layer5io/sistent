import type Form from '@rjsf/core';
import type { ErrorSchema, RJSFSchema } from '@rjsf/utils';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RJSFFormWrapper } from '../custom/RJSFFormWrapper/RJSFFormWrapper';
import {
  ArrayFieldItemTemplate,
  ArrayFieldTemplate,
  BaseInputTemplate,
  ButtonTemplates,
  CheckboxWidget,
  CheckboxesWidget,
  DescriptionFieldTemplate,
  ErrorListTemplate,
  FieldErrorTemplate,
  FieldHelpTemplate,
  FieldTemplate,
  FileWidget,
  ObjectFieldTemplate,
  RadioWidget,
  RangeWidget,
  SelectWidget,
  SwitchWidget,
  TextWidget,
  TextareaWidget,
  TitleFieldTemplate,
  ToggleWidget,
  WrapIfAdditionalTemplate,
  generateTemplates,
  generateTheme,
  generateWidgets,
  sistentRJSFTheme,
  sistentTheme
} from '../custom/RJSFFormWrapper/theme';
import { computeSxProps } from '../custom/RJSFFormWrapper/theme/util';
import { SistentThemeProvider, useTheme } from '../theme';

function Wrap({ children }: { children: React.ReactNode }) {
  return <SistentThemeProvider>{children}</SistentThemeProvider>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Theme exports and factories
// ─────────────────────────────────────────────────────────────────────────────

describe('Sistent RJSF Theme Registry (Issue #418)', () => {
  describe('Theme exports and factories', () => {
    it('exports sistentTheme with templates and widgets', () => {
      expect(sistentTheme).toBeDefined();
      expect(typeof sistentTheme.templates).toBe('object');
      expect(typeof sistentTheme.widgets).toBe('object');
    });

    it('generateTheme returns a fresh ThemeProps object', () => {
      const generated = generateTheme();
      expect(generated).toBeDefined();
      expect(typeof generated.templates).toBe('object');
      expect(typeof generated.widgets).toBe('object');
      expect(generated.templates?.FieldTemplate).toBeDefined();
      expect(generated.widgets?.TextWidget).toBeDefined();
    });

    it('sistentTheme matches default export from generateTheme module', () => {
      expect(sistentTheme).toBe(sistentRJSFTheme);
    });

    it('exports all expected templates in sistentTemplates registry', () => {
      const templates = generateTemplates();
      expect(templates.ArrayFieldItemTemplate).toBe(ArrayFieldItemTemplate);
      expect(templates.ArrayFieldTemplate).toBe(ArrayFieldTemplate);
      expect(templates.BaseInputTemplate).toBe(BaseInputTemplate);
      expect(templates.ButtonTemplates).toBe(ButtonTemplates);
      expect(templates.DescriptionFieldTemplate).toBe(DescriptionFieldTemplate);
      expect(templates.ErrorListTemplate).toBe(ErrorListTemplate);
      expect(templates.FieldErrorTemplate).toBe(FieldErrorTemplate);
      expect(templates.FieldHelpTemplate).toBe(FieldHelpTemplate);
      expect(templates.FieldTemplate).toBe(FieldTemplate);
      expect(templates.ObjectFieldTemplate).toBe(ObjectFieldTemplate);
      expect(templates.TitleFieldTemplate).toBe(TitleFieldTemplate);
      expect(templates.WrapIfAdditionalTemplate).toBe(WrapIfAdditionalTemplate);
    });

    it('exports all expected widgets in sistentWidgets registry', () => {
      const widgets = generateWidgets();
      expect(widgets.TextWidget).toBe(TextWidget);
      expect(widgets.TextareaWidget).toBe(TextareaWidget);
      expect(widgets.SelectWidget).toBe(SelectWidget);
      expect(widgets.CheckboxWidget).toBe(CheckboxWidget);
      expect(widgets.CheckboxesWidget).toBe(CheckboxesWidget);
      expect(widgets.RadioWidget).toBe(RadioWidget);
      expect(widgets.RangeWidget).toBe(RangeWidget);
      expect(widgets.ToggleWidget).toBe(ToggleWidget);
      expect(widgets.SwitchWidget).toBe(SwitchWidget);
      expect(widgets.FileWidget).toBe(FileWidget);
      expect(widgets.switch).toBe(SwitchWidget);
      expect(widgets.toggle).toBe(ToggleWidget);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 2. RJSFFormWrapper core integration
  // ─────────────────────────────────────────────────────────────────────────

  describe('RJSFFormWrapper core integration', () => {
    it('renders basic schema and fires onChange when field changes', () => {
      const onChange = jest.fn();
      const schema: RJSFSchema = {
        type: 'object',
        properties: { name: { type: 'string', title: 'Full Name' } }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={schema} onChange={onChange} />
        </Wrap>
      );
      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Alice' } });
      expect(onChange).toHaveBeenCalled();
      // onChange is invoked with the RJSF state object; verify formData key exists
      expect(onChange.mock.calls[0][0]).toHaveProperty('formData');
    });

    it('fires onSubmit with formData when the form element is submitted', () => {
      const onSubmit = jest.fn();
      const schema: RJSFSchema = {
        type: 'object',
        properties: { city: { type: 'string', title: 'City' } }
      };
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper schema={schema} formData={{ city: 'Tokyo' }} onSubmit={onSubmit} />
        </Wrap>
      );
      // Submit the form element directly — most reliable in jsdom
      const form = container.querySelector('form');
      if (form) fireEvent.submit(form);
      expect(onSubmit).toHaveBeenCalled();
      expect(onSubmit.mock.calls[0][0].formData).toEqual({ city: 'Tokyo' });
    });

    it('pre-populates fields from formData prop', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: { email: { type: 'string', title: 'Email' } }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={schema} formData={{ email: 'test@example.com' }} />
        </Wrap>
      );
      expect(screen.getByDisplayValue('test@example.com')).toBeDefined();
    });

    it('shows validation errors with liveValidate + extraErrors', () => {
      const schema: RJSFSchema = {
        type: 'object',
        required: ['email'],
        properties: { email: { type: 'string', title: 'Email Address' } }
      };
      render(
        <Wrap>
          <RJSFFormWrapper
            schema={schema}
            liveValidate
            extraErrors={{ email: { __errors: ['Email is required'] } }}
          />
        </Wrap>
      );
      expect(screen.getAllByText(/Email is required/i).length).toBeGreaterThanOrEqual(1);
    });

    it('inherits and preserves parent theme palette mode (e.g. dark mode)', () => {
      let observedMode: string | undefined;
      function ModeSpy() {
        const theme = useTheme();
        observedMode = theme.palette.mode;
        return <div data-testid="mode-spy">{theme.palette.mode}</div>;
      }
      const schema: RJSFSchema = {
        type: 'object',
        properties: { name: { type: 'string', title: 'Name' } }
      };
      render(
        <SistentThemeProvider initialMode="dark">
          <RJSFFormWrapper schema={schema}>
            <ModeSpy />
          </RJSFFormWrapper>
        </SistentThemeProvider>
      );
      expect(observedMode).toBe('dark');
      expect(screen.getByTestId('mode-spy').textContent).toBe('dark');
    });

    it('inherits and preserves custom parent theme overrides', () => {
      let observedPrimary: string | undefined;
      function ThemeSpy() {
        const theme = useTheme();
        observedPrimary = theme.palette.primary.main;
        return <div data-testid="theme-spy">{theme.palette.primary.main}</div>;
      }
      const schema: RJSFSchema = {
        type: 'object',
        properties: { name: { type: 'string', title: 'Name' } }
      };
      render(
        <SistentThemeProvider customTheme={{ primary: '#123456' }}>
          <RJSFFormWrapper schema={schema}>
            <ThemeSpy />
          </RJSFFormWrapper>
        </SistentThemeProvider>
      );
      expect(observedPrimary).toBe('#123456');
      expect(screen.getByTestId('theme-spy').textContent).toBe('#123456');
    });

    it('renders array fields and shows item values', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: {
          tags: { type: 'array', title: 'Tags', items: { type: 'string' } }
        }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={schema} formData={{ tags: ['alpha', 'beta'] }} />
        </Wrap>
      );
      expect(screen.getByDisplayValue('alpha')).toBeDefined();
      expect(screen.getByDisplayValue('beta')).toBeDefined();
    });

    it('sets readOnly attribute and keeps input enabled when field is readonly', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: { token: { type: 'string', title: 'Token', readOnly: true } }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={schema} formData={{ token: 'secret-token' }} readonly />
        </Wrap>
      );
      const input = screen.getByLabelText('Token') as HTMLInputElement;
      expect(input.readOnly).toBe(true);
      expect(input.disabled).toBe(false);
    });

    it('sets readOnly attribute and keeps select enabled when widget is readonly', () => {
      const selectSchema: RJSFSchema = {
        type: 'object',
        properties: { role: { type: 'string', title: 'Role', enum: ['Admin', 'User'], default: 'Admin' } }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={selectSchema} readonly />
        </Wrap>
      );
      const selectNode = screen.getByRole('combobox');
      expect(selectNode.getAttribute('aria-readonly')).toBe('true');
      expect(selectNode.getAttribute('aria-disabled')).toBeNull();
      fireEvent.mouseDown(selectNode);
      expect(screen.queryByRole('listbox')).toBeNull();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 3. RadioWidget behavior
  // ─────────────────────────────────────────────────────────────────────────

  describe('RadioWidget behavior', () => {
    const radioSchema: RJSFSchema = {
      type: 'object',
      properties: {
        color: { type: 'string', title: 'Color', enum: ['Red', 'Green', 'Blue'] }
      }
    };
    const radioUiSchema = { color: { 'ui:widget': 'radio' } };

    it('renders all enum options as radio buttons', () => {
      render(
        <Wrap>
          <RJSFFormWrapper schema={radioSchema} uiSchema={radioUiSchema} />
        </Wrap>
      );
      expect(screen.getByText('Red')).toBeDefined();
      expect(screen.getByText('Green')).toBeDefined();
      expect(screen.getByText('Blue')).toBeDefined();
    });

    it('calls onChange when a radio option is selected', () => {
      const onChange = jest.fn();
      render(
        <Wrap>
          <RJSFFormWrapper schema={radioSchema} uiSchema={radioUiSchema} onChange={onChange} />
        </Wrap>
      );
      fireEvent.click(screen.getAllByRole('radio')[1]);
      expect(onChange).toHaveBeenCalled();
    });

    it('only the first radio option has autoFocus when autofocus=true (other radios do not)', () => {
      const uiSchema = { color: { 'ui:widget': 'radio', 'ui:autofocus': true } };
      render(
        <Wrap>
          <RJSFFormWrapper schema={radioSchema} uiSchema={uiSchema} />
        </Wrap>
      );
      const radios = screen.getAllByRole('radio') as HTMLInputElement[];
      // In MUI, Radio autoFocus focuses the first radio input/button
      expect(document.activeElement).toBe(radios[0]);
      // Radios at index 1 and 2 must not have the autofocus attribute
      // (React maps autoFocus=false to no attribute; only first gets autoFocus=true)
      expect(radios[1].hasAttribute('autofocus')).toBe(false);
      expect(radios[2].hasAttribute('autofocus')).toBe(false);
      // There are exactly 3 radios rendered (Red, Green, Blue)
      expect(radios.length).toBe(3);
    });

    it('does not apply autoFocus to any radio when autofocus is absent', () => {
      render(
        <Wrap>
          <RJSFFormWrapper schema={radioSchema} uiSchema={radioUiSchema} />
        </Wrap>
      );
      screen.getAllByRole('radio').forEach((r) =>
        expect(r.hasAttribute('autofocus')).toBe(false)
      );
    });

    it('associates FormLabel with RadioGroup via aria-labelledby for accessibility', () => {
      render(
        <Wrap>
          <RJSFFormWrapper schema={radioSchema} uiSchema={radioUiSchema} />
        </Wrap>
      );
      expect(screen.getByRole('radiogroup', { name: 'Color' })).toBeDefined();
    });

    it('sets aria-label on RadioGroup when hideLabel is true', () => {
      const uiSchema = { color: { 'ui:widget': 'radio', 'ui:options': { label: false } } };
      render(
        <Wrap>
          <RJSFFormWrapper schema={radioSchema} uiSchema={uiSchema} />
        </Wrap>
      );
      expect(screen.getByRole('radiogroup', { name: 'Color' })).toBeDefined();
    });

    it('disables all radio options when widget is disabled', () => {
      const uiSchema = { color: { 'ui:widget': 'radio', 'ui:disabled': true } };
      render(
        <Wrap>
          <RJSFFormWrapper schema={radioSchema} uiSchema={uiSchema} />
        </Wrap>
      );
      screen.getAllByRole('radio').forEach((r) =>
        expect((r as HTMLInputElement).disabled).toBe(true)
      );
    });

    it('disables all radio options when widget is readonly', () => {
      const uiSchema = { color: { 'ui:widget': 'radio', 'ui:readonly': true } };
      render(
        <Wrap>
          <RJSFFormWrapper schema={radioSchema} uiSchema={uiSchema} />
        </Wrap>
      );
      screen.getAllByRole('radio').forEach((r) =>
        expect((r as HTMLInputElement).disabled).toBe(true)
      );
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 4. CheckboxesWidget behavior
  // ─────────────────────────────────────────────────────────────────────────

  describe('CheckboxesWidget behavior', () => {
    const checkboxSchema: RJSFSchema = {
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          title: 'Tags',
          items: { type: 'string', enum: ['A', 'B', 'C'] },
          uniqueItems: true
        }
      }
    };
    const uiSchema = { tags: { 'ui:widget': 'checkboxes' } };

    it('calls onChange when a checkbox is checked', () => {
      const onChange = jest.fn();
      render(
        <Wrap>
          <RJSFFormWrapper schema={checkboxSchema} uiSchema={uiSchema} formData={{ tags: [] }} onChange={onChange} />
        </Wrap>
      );
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0].formData.tags).toContain('A');
    });

    it('removes value from array when a checked box is unchecked', () => {
      const onChange = jest.fn();
      render(
        <Wrap>
          <RJSFFormWrapper schema={checkboxSchema} uiSchema={uiSchema} formData={{ tags: ['A', 'B'] }} onChange={onChange} />
        </Wrap>
      );
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0].formData.tags).not.toContain('A');
    });

    it('associates FormLabel with FormGroup via aria-labelledby for accessibility', () => {
      render(
        <Wrap>
          <RJSFFormWrapper schema={checkboxSchema} uiSchema={uiSchema} formData={{ tags: [] }} />
        </Wrap>
      );
      expect(screen.getByRole('group', { name: 'Tags' })).toBeDefined();
    });

    it('sets aria-label on FormGroup when hideLabel is true', () => {
      const hiddenLabelUiSchema = {
        tags: { 'ui:widget': 'checkboxes', 'ui:options': { label: false } }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={checkboxSchema} uiSchema={hiddenLabelUiSchema} formData={{ tags: [] }} />
        </Wrap>
      );
      expect(screen.getByRole('group', { name: 'Tags' })).toBeDefined();
    });

    it('does not produce [undefined] when starting from empty formData', () => {
      const onChange = jest.fn();
      render(
        <Wrap>
          <RJSFFormWrapper schema={checkboxSchema} uiSchema={uiSchema} formData={{ tags: [] }} onChange={onChange} />
        </Wrap>
      );
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      const result = onChange.mock.calls[0][0].formData?.tags as unknown[];
      expect(Array.isArray(result)).toBe(true);
      result.forEach((v) => expect(v).not.toBeUndefined());
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SelectWidget behavior
  // ─────────────────────────────────────────────────────────────────────────

  describe('SelectWidget behavior', () => {
    const selectSchema: RJSFSchema = {
      type: 'object',
      properties: {
        role: { type: 'string', title: 'Role', enum: ['Admin', 'Editor', 'Viewer'] }
      }
    };

    it('renders a select with label', () => {
      render(
        <Wrap>
          <RJSFFormWrapper schema={selectSchema} />
        </Wrap>
      );
      expect(screen.getByLabelText(/Role/i)).toBeDefined();
    });

    it('calls onChange when an option is selected', () => {
      const onChange = jest.fn();
      render(
        <Wrap>
          <RJSFFormWrapper schema={selectSchema} onChange={onChange} />
        </Wrap>
      );
      // Open the MUI Select popover, then click an option
      const combobox = screen.getByRole('combobox');
      fireEvent.mouseDown(combobox);
      const options = screen.getAllByRole('option');
      fireEvent.click(options[0]);
      expect(onChange).toHaveBeenCalled();
    });

    it('prevents ui:options.mui from overriding RJSF-controlled value, onChange, and disabled state', () => {
      const formOnChange = jest.fn();
      const maliciousOverrideOnChange = jest.fn();
      const uiSchema = {
        role: {
          'ui:options': {
            mui: {
              value: 'Viewer',
              onChange: maliciousOverrideOnChange,
              disabled: false
            }
          },
          'ui:disabled': true
        }
      };
      render(
        <Wrap>
          <RJSFFormWrapper
            schema={selectSchema}
            uiSchema={uiSchema}
            formData={{ role: 'Admin' }}
            onChange={formOnChange}
          />
        </Wrap>
      );
      // Value must reflect RJSF formData ('Admin'), not the mui override ('Viewer')
      expect(screen.getByText('Admin')).toBeDefined();
      // Disabled state must reflect RJSF ui:disabled=true
      const combobox = screen.getByRole('combobox');
      expect(combobox.getAttribute('aria-disabled')).toBe('true');
    });

    it('correctly handles readonly vs disabled semantics', () => {
      const { rerender } = render(
        <Wrap>
          <RJSFFormWrapper schema={selectSchema} disabled />
        </Wrap>
      );
      // disabled=true => combobox is disabled
      const disabledSelect = screen.getByRole('combobox');
      expect(disabledSelect.getAttribute('aria-disabled')).toBe('true');

      // readonly=true => combobox is NOT disabled, has aria-readonly, and does not open listbox
      rerender(
        <Wrap>
          <RJSFFormWrapper schema={selectSchema} readonly />
        </Wrap>
      );
      const readonlySelect = screen.getByRole('combobox');
      expect(readonlySelect.getAttribute('aria-disabled')).toBeNull();
      expect(readonlySelect.getAttribute('aria-readonly')).toBe('true');
      fireEvent.mouseDown(readonlySelect);
      expect(screen.queryByRole('listbox')).toBeNull();

      // normal select => interactive, opens listbox on mouseDown
      rerender(
        <Wrap>
          <RJSFFormWrapper schema={selectSchema} />
        </Wrap>
      );
      const normalSelect = screen.getByRole('combobox');
      expect(normalSelect.getAttribute('aria-disabled')).toBeNull();
      expect(normalSelect.getAttribute('aria-readonly')).toBeNull();
      fireEvent.mouseDown(normalSelect);
      expect(screen.getByRole('listbox')).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Toggle/Switch behavior
  // ─────────────────────────────────────────────────────────────────────────

  describe('Toggle/Switch widget behavior', () => {
    const boolSchema: RJSFSchema = {
      type: 'object',
      properties: { enabled: { type: 'boolean', title: 'Feature Enabled' } }
    };

    it('renders switch widget with correct label', () => {
      render(
        <Wrap>
          <RJSFFormWrapper
            schema={boolSchema}
            uiSchema={{ enabled: { 'ui:widget': 'switch' } }}
          />
        </Wrap>
      );
      expect(screen.getByText(/Feature Enabled/i)).toBeDefined();
    });

    it('calls onChange with flipped boolean value when toggled', () => {
      const onChange = jest.fn();
      render(
        <Wrap>
          <RJSFFormWrapper
            schema={boolSchema}
            uiSchema={{ enabled: { 'ui:widget': 'switch' } }}
            formData={{ enabled: false }}
            onChange={onChange}
          />
        </Wrap>
      );
      // MUI Switch has role="switch"
      fireEvent.click(screen.getByRole('switch'));
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0].formData.enabled).toBe(true);
    });

    it('renders description and connects aria-describedby even when hideLabel is true', () => {
      const descSchema: RJSFSchema = {
        type: 'object',
        properties: {
          enabled: { type: 'boolean', title: 'Feature', description: 'Enable experimental feature' }
        }
      };
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper
            schema={descSchema}
            uiSchema={{ enabled: { 'ui:widget': 'switch', 'ui:options': { label: false } } }}
          />
        </Wrap>
      );
      const desc = screen.getByText('Enable experimental feature');
      expect(desc.getAttribute('id')).toBe('root_enabled__description');
      const switchBase = container.querySelector('.MuiSwitch-switchBase');
      expect(switchBase?.getAttribute('aria-describedby')).toContain('root_enabled__description');
    });

    it('renders description exactly once and connects aria-describedby when label is visible for switch widget', () => {
      const descSchema: RJSFSchema = {
        type: 'object',
        properties: {
          enabled: { type: 'boolean', title: 'Feature', description: 'Enable experimental feature' }
        }
      };
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper
            schema={descSchema}
            uiSchema={{ enabled: { 'ui:widget': 'switch' } }}
          />
        </Wrap>
      );
      expect(screen.getAllByText('Enable experimental feature')).toHaveLength(1);
      const desc = screen.getByText('Enable experimental feature');
      expect(desc.getAttribute('id')).toBe('root_enabled__description');
      const switchBase = container.querySelector('.MuiSwitch-switchBase');
      expect(switchBase?.getAttribute('aria-describedby')).toContain('root_enabled__description');
    });

    it('renders description and connects aria-describedby even when hideLabel is true in CheckboxWidget', () => {
      const boolSchema: RJSFSchema = {
        type: 'object',
        properties: {
          agree: { type: 'boolean', title: 'Agree', description: 'I agree to terms' }
        }
      };
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper
            schema={boolSchema}
            uiSchema={{ agree: { 'ui:widget': 'checkbox', 'ui:options': { label: false } } }}
          />
        </Wrap>
      );
      const desc = screen.getByText('I agree to terms');
      expect(desc.getAttribute('id')).toBe('root_agree__description');
      const checkboxRoot = container.querySelector('.MuiCheckbox-root');
      expect(checkboxRoot?.getAttribute('aria-describedby')).toContain('root_agree__description');
    });

    it('renders description exactly once and connects aria-describedby when label is visible for checkbox widget', () => {
      const boolSchema: RJSFSchema = {
        type: 'object',
        properties: {
          agree: { type: 'boolean', title: 'Agree', description: 'I agree to terms' }
        }
      };
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper
            schema={boolSchema}
            uiSchema={{ agree: { 'ui:widget': 'checkbox' } }}
          />
        </Wrap>
      );
      expect(screen.getAllByText('I agree to terms')).toHaveLength(1);
      const desc = screen.getByText('I agree to terms');
      expect(desc.getAttribute('id')).toBe('root_agree__description');
      const checkboxRoot = container.querySelector('.MuiCheckbox-root');
      expect(checkboxRoot?.getAttribute('aria-describedby')).toContain('root_agree__description');
    });

    it('assigns descriptionId(id) to FieldTemplate description and connects via aria-describedby', () => {
      const textSchema: RJSFSchema = {
        type: 'object',
        properties: {
          username: { type: 'string', title: 'Username', description: 'Choose a unique handle' }
        }
      };
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper schema={textSchema} />
        </Wrap>
      );
      const desc = screen.getByText('Choose a unique handle');
      expect(desc.getAttribute('id')).toBe('root_username__description');
      const textField = container.querySelector('.MuiTextField-root');
      expect(textField?.getAttribute('aria-describedby')).toContain('root_username__description');
    });

    it('combines otherMuiProps.className with slot fieldFormControl.className in FieldTemplate', () => {
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper
            schema={{ type: 'object', properties: { name: { type: 'string', title: 'Name' } } }}
            uiSchema={{
              name: {
                'ui:options': {
                  mui: {
                    className: 'general-form-class',
                    rjsfSlotProps: {
                      fieldFormControl: { className: 'slot-form-class' }
                    }
                  }
                }
              }
            }}
          />
        </Wrap>
      );
      const formControl = container.querySelector('.rjsf-field-string > .MuiFormControl-root');
      expect(formControl?.classList.contains('general-form-class')).toBe(true);
      expect(formControl?.classList.contains('slot-form-class')).toBe(true);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 7. RangeWidget behavior
  // ─────────────────────────────────────────────────────────────────────────

  describe('RangeWidget behavior', () => {
    const rangeSchema: RJSFSchema = {
      type: 'object',
      properties: { volume: { type: 'number', title: 'Volume', minimum: 0, maximum: 100 } }
    };

    it('renders a slider', () => {
      render(
        <Wrap>
          <RJSFFormWrapper schema={rangeSchema} uiSchema={{ volume: { 'ui:widget': 'range' } }} />
        </Wrap>
      );
      expect(screen.getByRole('slider')).toBeDefined();
    });

    it('slider has aria-disabled when widget is disabled', () => {
      render(
        <Wrap>
          <RJSFFormWrapper
            schema={rangeSchema}
            uiSchema={{ volume: { 'ui:widget': 'range', 'ui:disabled': true } }}
          />
        </Wrap>
      );
      const slider = screen.getByRole('slider');
      // MUI Slider sets aria-disabled on the thumb span
      expect(
        slider.hasAttribute('aria-disabled') || (slider as HTMLInputElement).disabled
      ).toBe(true);
    });

    it('connects visible label via aria-labelledby', () => {
      render(
        <Wrap>
          <RJSFFormWrapper schema={rangeSchema} uiSchema={{ volume: { 'ui:widget': 'range' } }} />
        </Wrap>
      );
      const label = screen.getByText('Volume');
      expect(label.getAttribute('id')).toBe('root_volume-label');
      const slider = screen.getByRole('slider');
      expect(slider.getAttribute('aria-labelledby')).toBe('root_volume-label');
    });

    it('sets aria-label when hideLabel is true', () => {
      render(
        <Wrap>
          <RJSFFormWrapper
            schema={rangeSchema}
            uiSchema={{ volume: { 'ui:widget': 'range', 'ui:options': { label: false } } }}
          />
        </Wrap>
      );
      expect(screen.queryByText('Volume')).toBeNull();
      const slider = screen.getByRole('slider');
      expect(slider.getAttribute('aria-label')).toBe('Volume');
    });

    it('does not set aria-labelledby or aria-label when label is empty', () => {
      const noLabelSchema: RJSFSchema = {
        type: 'object',
        properties: { volume: { type: 'number', title: '', minimum: 0, maximum: 100 } }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={noLabelSchema} uiSchema={{ volume: { 'ui:widget': 'range' } }} />
        </Wrap>
      );
      const slider = screen.getByRole('slider');
      expect(slider.getAttribute('aria-labelledby')).toBeNull();
      expect(slider.getAttribute('aria-label')).toBeNull();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 8. FileWidget — disabled/readonly
  // ─────────────────────────────────────────────────────────────────────────

  describe('FileWidget disabled/readonly behavior', () => {
    const fileSchema: RJSFSchema = {
      type: 'object',
      properties: { doc: { type: 'string', format: 'data-url', title: 'Document' } }
    };

    it('renders an enabled file input by default', () => {
      render(
        <Wrap>
          <RJSFFormWrapper schema={fileSchema} />
        </Wrap>
      );
      expect((screen.getByLabelText(/Document/i) as HTMLInputElement).disabled).toBe(false);
    });

    it('disables file input when ui:disabled is true', () => {
      render(
        <Wrap>
          <RJSFFormWrapper schema={fileSchema} uiSchema={{ doc: { 'ui:disabled': true } }} />
        </Wrap>
      );
      expect((screen.getByLabelText(/Document/i) as HTMLInputElement).disabled).toBe(true);
    });

    it('disables file input when ui:readonly is true', () => {
      render(
        <Wrap>
          <RJSFFormWrapper schema={fileSchema} uiSchema={{ doc: { 'ui:readonly': true } }} />
        </Wrap>
      );
      expect((screen.getByLabelText(/Document/i) as HTMLInputElement).disabled).toBe(true);
    });

    it('renders img thumbnail preview for image/webp, image/svg+xml, and other image/* files', () => {
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper
            schema={fileSchema}
            uiSchema={{ doc: { 'ui:options': { filePreview: true } } }}
            formData={{ doc: 'data:image/webp;name=test.webp;base64,AAAA' }}
          />
        </Wrap>
      );
      const img = container.querySelector('img');
      expect(img).not.toBeNull();
      expect(img?.getAttribute('src')).toBe('data:image/webp;name=test.webp;base64,AAAA');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 9. computeSxProps unit tests
  // ─────────────────────────────────────────────────────────────────────────

  describe('computeSxProps utility', () => {
    it('returns sxProps unchanged when no muiProps', () => {
      const base = { mt: 1, mb: 2 };
      expect(computeSxProps(base, undefined)).toBe(base);
    });

    it('returns sxProps unchanged when muiProps has no sx', () => {
      const base = { mt: 1 };
      expect(computeSxProps(base, { className: 'foo' })).toBe(base);
    });

    it('merges two plain objects without losing base values', () => {
      const result = computeSxProps({ color: 'red', mt: 1 }, { sx: { mb: 2 } }) as Record<string, unknown>;
      expect(result['color']).toBe('red');
      expect(result['mt']).toBe(1);
      expect(result['mb']).toBe(2);
    });

    it('produces array when muiProps.sx is an array', () => {
      const result = computeSxProps({ mt: 1 }, { sx: [{ mb: 2 }, { pt: 3 }] }) as unknown[];
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toEqual({ mt: 1 });
      expect(result[1]).toEqual({ mb: 2 });
      expect(result[2]).toEqual({ pt: 3 });
    });

    it('produces array when muiProps.sx is a callback function', () => {
      const fn = () => ({ mt: 1 });
      const result = computeSxProps({ mb: 2 }, { sx: fn }) as unknown[];
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toEqual({ mb: 2 });
      expect(result[1]).toBe(fn);
    });

    it('handles array-valued sxProps + object muiProps.sx without numeric keys', () => {
      const baseSx: Parameters<typeof computeSxProps>[0] = [{ display: 'flex' }, { gap: 2 }];
      const result = computeSxProps(baseSx, { sx: { mt: 1 } }) as unknown[];
      expect(Array.isArray(result)).toBe(true);
      // Items must not be at numeric-index keys of a plain object (i.e. must be a real array)
      expect(result.length).toBeGreaterThan(0);
      expect(result).toContainEqual({ mt: 1 });
      expect(result).toContainEqual({ display: 'flex' });
      expect(result).toContainEqual({ gap: 2 });
    });

    it('handles array-valued sxProps + array muiProps.sx correctly', () => {
      const baseSx: Parameters<typeof computeSxProps>[0] = [{ display: 'flex' }];
      const result = computeSxProps(baseSx, { sx: [{ mt: 1 }] }) as unknown[];
      expect(Array.isArray(result)).toBe(true);
      expect(result).toContainEqual({ display: 'flex' });
      expect(result).toContainEqual({ mt: 1 });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 10. rjsfSlotProps and MUI styling customization
  // ─────────────────────────────────────────────────────────────────────────

  describe('rjsfSlotProps and MUI styling customization', () => {
    it('passes rjsfSlotProps.radioGroup attributes to the RadioGroup element', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: { pick: { type: 'string', enum: ['X', 'Y'] } }
      };
      const uiSchema = {
        pick: {
          'ui:widget': 'radio',
          'ui:options': {
            mui: { rjsfSlotProps: { radioGroup: { 'data-testid': 'my-radio-group' } } }
          }
        }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={schema} uiSchema={uiSchema} />
        </Wrap>
      );
      expect(screen.getByTestId('my-radio-group')).toBeDefined();
    });

    it('merges consumer slot sx with component default styling rather than replacing it', () => {
      // Default TitleFieldTemplate provides default margin/divider styling
      const defaultSx = { mt: 2, mb: 1 };
      const consumerSlot = { sx: { color: 'primary.main', mb: 4 } };
      const merged = computeSxProps(defaultSx, consumerSlot) as Record<string, unknown>;
      // mt survives from default; mb is customized by consumer; color is added
      expect(merged.mt).toBe(2);
      expect(merged.mb).toBe(4);
      expect(merged.color).toBe('primary.main');
    });

    it('handles function/callback consumer sx alongside base object styles', () => {
      const defaultSx = { color: 'text.secondary' };
      const consumerCallback = () => ({ fontWeight: 'bold' });
      const merged = computeSxProps(defaultSx, { sx: consumerCallback }) as unknown[];
      expect(Array.isArray(merged)).toBe(true);
      expect(merged[0]).toEqual({ color: 'text.secondary' });
      expect(merged[1]).toBe(consumerCallback);
    });

    it('handles consumer array sx preserving all array items and base styles', () => {
      const defaultSx = { display: 'flex' };
      const consumerArray = [{ gap: 2 }, { justifyContent: 'space-between' }];
      const merged = computeSxProps(defaultSx, { sx: consumerArray }) as unknown[];
      expect(Array.isArray(merged)).toBe(true);
      expect(merged[0]).toEqual({ display: 'flex' });
      expect(merged[1]).toEqual({ gap: 2 });
      expect(merged[2]).toEqual({ justifyContent: 'space-between' });
    });

    it('preserves RJSF-generated accessibility IDs when slot props specify custom id', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: {
          bio: { type: 'string', title: 'Bio', description: 'Your bio' }
        }
      };
      const uiSchema = {
        bio: {
          'ui:help': 'Help text for bio',
          'ui:options': {
            mui: {
              rjsfSlotProps: {
                helpFormHelperText: { id: 'overridden-help-id' },
                descTypography: { id: 'overridden-desc-id' },
                fieldErrorList: { id: 'overridden-error-id' }
              }
            }
          }
        }
      };
      const extraErrors: ErrorSchema = {
        bio: { __errors: ['Bio is invalid'] }
      };
      render(
        <Wrap>
          <RJSFFormWrapper
            schema={schema}
            uiSchema={uiSchema}
            extraErrors={extraErrors}
          />
        </Wrap>
      );
      // Help text should retain root_bio__help
      const help = screen.getByText('Help text for bio');
      expect(help.getAttribute('id')).toBe('root_bio__help');

      // Description text should retain root_bio__description
      const desc = screen.getByText('Your bio');
      expect(desc.getAttribute('id')).toBe('root_bio__description');

      // Field error list should retain root_bio__error
      const errorItem = screen.getByText('Bio is invalid');
      expect(errorItem.getAttribute('id')).toBe('root_bio__error-0');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 11. CodeRabbit Review Regressions & Edge Cases
  // ─────────────────────────────────────────────────────────────────────────

  describe('Slot props and widget customization edge cases', () => {
    it('preserves caller formRef attachment on RJSFFormWrapper regardless of rest props', () => {
      const ref = React.createRef<Form<Record<string, unknown>>>();
      const schema: RJSFSchema = {
        type: 'object',
        properties: { name: { type: 'string' } }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={schema} formRef={ref} id="custom-form-id" />
        </Wrap>
      );
      expect(ref.current).not.toBeNull();
      expect(typeof ref.current.validateForm).toBe('function');
    });

    it('merges slot-provided className and style on WrapIfAdditionalTemplate container', () => {
      const schema: RJSFSchema = {
        type: 'object',
        additionalProperties: { type: 'string' }
      };
      const uiSchema = {
        additionalProperties: {
          'ui:options': {
            mui: {
              rjsfSlotProps: {
                wrapGridContainer: {
                  className: 'custom-wrap-container-class',
                  style: { backgroundColor: 'rgb(240, 240, 240)' }
                }
              }
            }
          }
        }
      };
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper
            schema={schema}
            uiSchema={uiSchema}
            formData={{ extraProp: 'extraValue' }}
          />
        </Wrap>
      );
      const gridContainer = container.querySelector('.custom-wrap-container-class') as HTMLElement;
      expect(gridContainer).not.toBeNull();
      expect(gridContainer.style.backgroundColor).toBe('rgb(240, 240, 240)');
    });

    it('keeps multiple file input required when all files are removed', () => {
      const schema: RJSFSchema = {
        type: 'object',
        required: ['docs'],
        properties: {
          docs: {
            type: 'array',
            title: 'Documents',
            items: { type: 'string', format: 'data-url' }
          }
        }
      };
      const { rerender } = render(
        <Wrap>
          <RJSFFormWrapper
            schema={schema}
            formData={{ docs: ['data:text/plain;name=file1.txt;base64,AAAA'] }}
          />
        </Wrap>
      );
      // When files are present, the file input is not required
      let fileInput = screen.getByLabelText(/Documents/i) as HTMLInputElement;
      expect(fileInput.required).toBe(false);

      // When all files are removed (empty array), the field becomes required again
      rerender(
        <Wrap>
          <RJSFFormWrapper
            schema={schema}
            formData={{ docs: [] }}
          />
        </Wrap>
      );
      fileInput = screen.getByLabelText(/Documents/i) as HTMLInputElement;
      expect(fileInput.required).toBe(true);
    });

    it('applies muiSlotProps.formLabel to FormLabel in RadioWidget and RangeWidget', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: {
          choice: { type: 'string', title: 'Choice', enum: ['A', 'B'] },
          level: { type: 'number', title: 'Level', minimum: 0, maximum: 10 }
        }
      };
      const uiSchema = {
        choice: {
          'ui:widget': 'radio',
          'ui:options': {
            mui: {
              rjsfSlotProps: {
                formLabel: { className: 'custom-radio-form-label' }
              }
            }
          }
        },
        level: {
          'ui:widget': 'range',
          'ui:options': {
            mui: {
              rjsfSlotProps: {
                formLabel: { className: 'custom-range-form-label' }
              }
            }
          }
        }
      };
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper schema={schema} uiSchema={uiSchema} />
        </Wrap>
      );
      expect(container.querySelector('.custom-radio-form-label')).not.toBeNull();
      expect(container.querySelector('.custom-range-form-label')).not.toBeNull();
    });

    it('applies muiSlotProps.menuItem to MenuItem elements in SelectWidget', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: {
          status: { type: 'string', title: 'Status', enum: ['Active', 'Inactive'] }
        }
      };
      const uiSchema = {
        status: {
          'ui:options': {
            mui: {
              rjsfSlotProps: {
                menuItem: { className: 'custom-select-menu-item' }
              }
            }
          }
        }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={schema} uiSchema={uiSchema} />
        </Wrap>
      );
      // Open select dropdown
      fireEvent.mouseDown(screen.getByRole('combobox'));
      const menuItems = screen.getAllByRole('option');
      expect(menuItems.length).toBeGreaterThan(0);
      expect(menuItems[0].classList.contains('custom-select-menu-item')).toBe(true);
    });

    it('applies aria-label on Switch in ToggleWidget when hideLabel is true', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: {
          enabled: { type: 'boolean', title: 'Feature Toggle' }
        }
      };
      const uiSchema = {
        enabled: {
          'ui:widget': 'toggle',
          'ui:options': { label: false }
        }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={schema} uiSchema={uiSchema} />
        </Wrap>
      );
      const switchInput = screen.getByRole('switch', { name: 'Feature Toggle' });
      expect(switchInput).toBeDefined();
    });

    it('applies muiSlotProps.formLabel to FormLabel in CheckboxesWidget', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: {
          permissions: {
            type: 'array',
            title: 'Permissions',
            items: { type: 'string', enum: ['read', 'write'] },
            uniqueItems: true
          }
        }
      };
      const uiSchema = {
        permissions: {
          'ui:widget': 'checkboxes',
          'ui:options': {
            mui: {
              rjsfSlotProps: {
                formLabel: { className: 'custom-checkboxes-form-label' }
              }
            }
          }
        }
      };
      const { container } = render(
        <Wrap>
          <RJSFFormWrapper schema={schema} uiSchema={uiSchema} />
        </Wrap>
      );
      expect(container.querySelector('.custom-checkboxes-form-label')).not.toBeNull();
    });

    it('applies aria-label on CheckboxWidget and BaseInputTemplate when hideLabel is true', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: {
          agree: { type: 'boolean', title: 'I Agree' },
          username: { type: 'string', title: 'User Name' },
          role: { type: 'string', title: 'User Role', enum: ['Admin', 'User'] }
        }
      };
      const uiSchema = {
        agree: {
          'ui:widget': 'checkbox',
          'ui:options': { label: false }
        },
        username: {
          'ui:options': { label: false }
        },
        role: {
          'ui:options': { label: false }
        }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={schema} uiSchema={uiSchema} />
        </Wrap>
      );
      expect(screen.getByRole('checkbox', { name: 'I Agree' })).toBeDefined();
      expect(screen.getByRole('textbox', { name: 'User Name' })).toBeDefined();
      expect(screen.getByRole('combobox', { name: 'User Role' })).toBeDefined();
    });

    it('prevents muiSlotProps.fieldFormControl from overriding RJSF validation error state', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: {
          username: { type: 'string', title: 'Username' }
        }
      };
      const uiSchema = {
        username: {
          'ui:options': {
            mui: {
              rjsfSlotProps: {
                fieldFormControl: { error: false }
              }
            }
          }
        }
      };
      render(
        <Wrap>
          <RJSFFormWrapper
            schema={schema}
            uiSchema={uiSchema}
            liveValidate
            extraErrors={{ username: { __errors: ['Invalid username'] } }}
          />
        </Wrap>
      );
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-invalid')).toBe('true');
      expect(screen.getByText('Invalid username')).toBeDefined();
    });

    it('supports rangeSlider and toggle slot prop aliases', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: {
          sliderVal: { type: 'number', title: 'Volume', minimum: 0, maximum: 100 },
          toggleVal: { type: 'boolean', title: 'Notifications' }
        }
      };
      const uiSchema = {
        sliderVal: {
          'ui:widget': 'range',
          'ui:options': {
            mui: {
              rjsfSlotProps: {
                rangeSlider: { 'data-testid': 'custom-range-slider' }
              }
            }
          }
        },
        toggleVal: {
          'ui:widget': 'switch',
          'ui:options': {
            mui: {
              rjsfSlotProps: {
                toggle: { 'data-testid': 'custom-toggle-switch' }
              }
            }
          }
        }
      };
      render(
        <Wrap>
          <RJSFFormWrapper schema={schema} uiSchema={uiSchema} />
        </Wrap>
      );
      expect(screen.getByTestId('custom-range-slider')).toBeDefined();
      expect(screen.getByTestId('custom-toggle-switch')).toBeDefined();
    });

    it('renders object fields with stable property keys and supports dynamic property addition/removal without state corruption', () => {
      const schema: RJSFSchema = {
        type: 'object',
        properties: {
          hiddenField: { type: 'string' }
        },
        additionalProperties: { type: 'string' }
      };
      const uiSchema = {
        hiddenField: { 'ui:widget': 'hidden' }
      };
      const initialFormData = {
        hiddenField: 'secret',
        propA: 'value A',
        propB: 'value B'
      };

      const { rerender } = render(
        <Wrap>
          <RJSFFormWrapper schema={schema} uiSchema={uiSchema} formData={initialFormData} />
        </Wrap>
      );

      expect(screen.getByDisplayValue('propA')).toBeDefined();
      expect(screen.getByDisplayValue('propB')).toBeDefined();
      expect(screen.getByDisplayValue('value A')).toBeDefined();
      expect(screen.getByDisplayValue('value B')).toBeDefined();

      // Dynamically remove propA (leaving only propB)
      const updatedFormData = {
        hiddenField: 'secret',
        propB: 'value B'
      };

      rerender(
        <Wrap>
          <RJSFFormWrapper schema={schema} uiSchema={uiSchema} formData={updatedFormData} />
        </Wrap>
      );

      // propA must be completely removed, propB must be retained without state reuse corruption
      expect(screen.queryByDisplayValue('propA')).toBeNull();
      expect(screen.queryByDisplayValue('value A')).toBeNull();
      expect(screen.getByDisplayValue('propB')).toBeDefined();
      expect(screen.getByDisplayValue('value B')).toBeDefined();

      // Dynamically insert a new property before propB
      const reorderedFormData = {
        hiddenField: 'secret',
        propNew: 'value New',
        propB: 'value B'
      };

      rerender(
        <Wrap>
          <RJSFFormWrapper schema={schema} uiSchema={uiSchema} formData={reorderedFormData} />
        </Wrap>
      );

      expect(screen.getByDisplayValue('propNew')).toBeDefined();
      expect(screen.getByDisplayValue('value New')).toBeDefined();
      expect(screen.getByDisplayValue('propB')).toBeDefined();
      expect(screen.getByDisplayValue('value B')).toBeDefined();
    });
  });
});

