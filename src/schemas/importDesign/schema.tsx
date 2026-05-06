// TODO(meshery/schemas#866 — Phase 3): once `@meshery/schemas` ships
// `DesignImportRjsfSchemaV1Beta3` (canonical home: `typescript/forms/v1beta3/design/`),
// flip this file to:
//
//     export { DesignImportRjsfSchemaV1Beta3 as default } from '@meshery/schemas';
//
// The published Sistent export name (`importDesignSchema`) MUST stay
// the same; only the source flips.
import { DesignDefinitionV1Beta1OpenApiSchema } from '@meshery/schemas';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DesignSchema = (DesignDefinitionV1Beta1OpenApiSchema as any).components.schemas;

// In @meshery/schemas >= 1.1.0, MesheryPatternImportRequestBody is a
// `oneOf` union of a File-import variant and a URL-import variant rather than
// a flat properties object. Resolve the individual field shapes from the
// dedicated payload components so the form schema remains driven by the
// upstream API contract.
// See meshery/schemas commit b08a4f62 "fix(design): tighten
// MesheryPatternImportRequestBody to oneOf[File|URL]".
const ImportBody = DesignSchema.MesheryPatternImportRequestBody;
const FilePayload = DesignSchema.MesheryPatternImportFilePayload;
const URLPayload = DesignSchema.MesheryPatternImportURLPayload;

// `name` is a common field present on both variants; File is used as the
// canonical source.
const nameField = FilePayload.properties.name;
const fileField = FilePayload.properties.file;
const urlField = URLPayload.properties.url;

const importDesignSchema = {
  type: 'object',
  properties: {
    name: {
      type: nameField.type,
      title: 'Design file name',
      default: nameField.default,
      'x-rjsf-grid-area': '12',
      description: nameField.description
    },

    uploadType: {
      title: 'Upload method',
      enum: ['File Upload', 'URL Import'],
      default: 'URL Import',
      'x-rjsf-grid-area': '12',
      description: ImportBody.description
    }
  },

  allOf: [
    {
      if: {
        properties: {
          uploadType: {
            const: 'File Upload'
          }
        }
      },
      then: {
        properties: {
          file: {
            type: fileField.type,
            format: fileField.format,
            description: fileField.description,
            'x-rjsf-grid-area': '12'
          }
        },
        required: ['file']
      }
    },
    {
      if: {
        properties: {
          uploadType: {
            const: 'URL Import'
          }
        }
      },
      then: {
        properties: {
          url: {
            type: urlField.type,
            format: urlField.format,
            title: 'URL',
            description: urlField.description,
            'x-rjsf-grid-area': '12'
          }
        },
        required: ['url']
      }
    }
  ],
  required: ['uploadType', 'name']
};

export default importDesignSchema;
