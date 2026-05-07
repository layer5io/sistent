/**
 * Contract tests for the schema/UI-schema exports driving the three
 * Meshery UI import modals (Design, Filter, Model).
 *
 * These are data-shape assertions, not RJSF rendering tests. They pin the
 * invariant whose violation causes the "Browse…" button to disappear: the
 * canonical RJSF schemas in @meshery/schemas declare the conditional
 * `file` field as `type: string` with no `format`, so without an explicit
 * `ui:widget: 'file'` override RJSF falls back to TextWidget and the
 * file picker is replaced by a plain text input.
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
