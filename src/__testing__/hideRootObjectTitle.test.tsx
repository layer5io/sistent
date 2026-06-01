import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { render } from '@testing-library/react';
import { hideRootObjectTitle } from '../custom/RJSFFormWrapper/hideRootObjectTitle';
import importDesignSchema from '../schemas/importDesign/schema';
import importDesignUiSchema from '../schemas/importDesign/uiSchema';

describe('hideRootObjectTitle', () => {
  it('adds ui:options.label=false when no uiSchema is provided', () => {
    expect(hideRootObjectTitle()).toEqual({ 'ui:options': { label: false } });
  });

  it('adds ui:options.label=false to an empty uiSchema', () => {
    expect(hideRootObjectTitle({})).toEqual({ 'ui:options': { label: false } });
  });

  it('preserves ui:order and per-field overrides while suppressing the root title', () => {
    const ui = {
      'ui:order': ['name', 'uploadType'],
      uploadType: { 'ui:widget': 'radio' }
    };

    expect(hideRootObjectTitle(ui)).toEqual({
      'ui:order': ['name', 'uploadType'],
      uploadType: { 'ui:widget': 'radio' },
      'ui:options': { label: false }
    });
  });

  it('merges into existing ui:options rather than clobbering them', () => {
    const ui = { 'ui:options': { classNames: 'root', orderable: true } };

    expect(hideRootObjectTitle(ui)).toEqual({
      'ui:options': { classNames: 'root', orderable: true, label: false }
    });
  });

  it('forces label to false even if it was explicitly true', () => {
    expect(hideRootObjectTitle({ 'ui:options': { label: true } })).toEqual({
      'ui:options': { label: false }
    });
  });

  it('does not mutate the input uiSchema', () => {
    const ui = { 'ui:order': ['name'], 'ui:options': { classNames: 'root' } };
    const snapshot = JSON.parse(JSON.stringify(ui));

    hideRootObjectTitle(ui);

    expect(ui).toEqual(snapshot);
  });

  it('keeps the canonical import-design UI schema intact apart from the new option', () => {
    const result = hideRootObjectTitle(importDesignUiSchema);

    // Canonical directives survive untouched...
    expect(result['ui:order']).toEqual(importDesignUiSchema['ui:order']);
    expect(result.uploadType).toEqual(importDesignUiSchema.uploadType);
    // ...and the only addition is the root-title suppression.
    expect(result['ui:options']).toEqual({ label: false });
  });
});

/**
 * End-to-end proof that the UI-schema lever actually reaches RJSF and zeroes
 * out the title RJSF hands to the `ObjectFieldTemplate`. Rendered through
 * `@rjsf/core` directly with a trivial recording template (NOT `@rjsf/mui`,
 * which has an ESM-interop edge under the jest/swc transform — see the
 * RJSFFormWrapper smoke test), so the assertion is about RJSF's own
 * title/description derivation, independent of any theme.
 */
describe('hideRootObjectTitle — RJSF root title/description derivation', () => {
  type Recorded = { title: unknown; description: unknown; properties: string[] };
  const recordRootRender = (uiSchema: Record<string, unknown>): Recorded => {
    const recorded: Recorded = { title: undefined, description: undefined, properties: [] };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function RecordingObjectFieldTemplate(props: any): JSX.Element {
      if (props.fieldPathId?.$id === 'root') {
        recorded.title = props.title;
        recorded.description = props.description;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recorded.properties = props.properties.map((p: any) => p.name);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <div>{props.properties.map((p: any) => p.content)}</div>;
    }

    render(
      <Form
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        schema={importDesignSchema as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        uiSchema={uiSchema as any}
        validator={validator}
        templates={{ ObjectFieldTemplate: RecordingObjectFieldTemplate }}
      />
    );
    return recorded;
  };

  it('renders the canonical root title by default (the duplicative heading)', () => {
    const recorded = recordRootRender(importDesignUiSchema);
    expect(recorded.title).toBe('Import Design');
  });

  it('suppresses the root title and description after hideRootObjectTitle', () => {
    const recorded = recordRootRender(hideRootObjectTitle(importDesignUiSchema));
    expect(recorded.title).toBe('');
    expect(recorded.description).toBeUndefined();
    // The contents (child fields) are still rendered — we hide the object
    // header, not the object's fields.
    expect(recorded.properties).toEqual(expect.arrayContaining(['name', 'uploadType']));
  });
});
