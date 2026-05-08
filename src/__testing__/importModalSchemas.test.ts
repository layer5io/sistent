/**
 * Contract tests for the schema/UI-schema exports driving the three
 * Meshery UI import modals (Design, Filter, Model).
 *
 * These pin the `ui:widget: 'file'` override on the conditional `file`
 * field for each form. The override is a TEMPORARY downstream patch:
 * @meshery/schemas declares the conditional `file` property as
 * `type: string` with no `format`, so RJSF falls back to TextWidget and
 * the Browse… button disappears. Forcing the FileWidget here keeps the
 * import flows usable until the upstream schema declares
 * `format: 'data-url'` (or ships a canonical UI schema with the widget
 * hint), at which point this override AND these tests can be deleted.
 */
import {
  importDesignSchema,
  importDesignUiSchema,
  importFilterSchema,
  importFilterUiSchema,
  importModelSchema,
  importModelUiSchema
} from '../schemas';

describe('Import Design modal', () => {
  it('re-exports a schema object from @meshery/schemas', () => {
    expect(importDesignSchema).toBeDefined();
    expect(importDesignSchema).not.toBeNull();
    expect(typeof importDesignSchema).toBe('object');
  });

  it('routes the conditional file field through the consumer FileWidget', () => {
    expect(importDesignUiSchema.file['ui:widget']).toBe('file');
  });

  it('renders uploadType as a radio control', () => {
    expect(importDesignUiSchema.uploadType['ui:widget']).toBe('radio');
  });

  it('lists the file field in ui:order so it surfaces when File is selected', () => {
    expect(importDesignUiSchema['ui:order']).toContain('file');
  });
});

describe('Import Filter modal', () => {
  it('re-exports a schema object from @meshery/schemas', () => {
    expect(importFilterSchema).toBeDefined();
    expect(importFilterSchema).not.toBeNull();
    expect(typeof importFilterSchema).toBe('object');
  });

  it('routes the conditional file field through the consumer FileWidget', () => {
    expect(importFilterUiSchema.file['ui:widget']).toBe('file');
  });

  it('lists the file field in ui:order so it surfaces when File is selected', () => {
    expect(importFilterUiSchema['ui:order']).toContain('file');
  });
});

describe('Import Model modal', () => {
  it('re-exports a schema object from @meshery/schemas', () => {
    expect(importModelSchema).toBeDefined();
    expect(importModelSchema).not.toBeNull();
    expect(typeof importModelSchema).toBe('object');
  });

  it('routes the conditional file field through the consumer FileWidget', () => {
    expect(importModelUiSchema.file['ui:widget']).toBe('file');
  });

  it('renders uploadType as a radio control', () => {
    expect(importModelUiSchema.uploadType['ui:widget']).toBe('radio');
  });

  it('lists the file field in ui:order so it surfaces when File is selected', () => {
    expect(importModelUiSchema['ui:order']).toContain('file');
  });
});
