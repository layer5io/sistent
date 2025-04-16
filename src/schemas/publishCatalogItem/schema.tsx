import { CatalogDataDefinitionV1Alpha1Schema } from '@layer5/schemas';

/**
 * Schema for publish catalog item modal;
 * Can be use for publishing filters and designs
 */
const publishCatalogItemSchema = {
  type: 'object',
  properties: {
    compatibility: {
      type: CatalogDataDefinitionV1Alpha1Schema.properties.compatibility.type,
      title: 'Technology',
      items: CatalogDataDefinitionV1Alpha1Schema.properties.compatibility.items,
      uniqueItems: true,
      minItems: 1,
      description:
        'A list of technologies included in or implicated by this design; a list of relevant technology tags.',
      'x-rjsf-grid-area': 6
    },
    pattern_caveats: {
      type: CatalogDataDefinitionV1Alpha1Schema.properties.pattern_caveats.type,
      title: CatalogDataDefinitionV1Alpha1Schema.properties.pattern_caveats.title,
      description: CatalogDataDefinitionV1Alpha1Schema.properties.pattern_caveats,
      format: 'textarea',
      'x-rjsf-grid-area': 12,
      'x-encode-in-uri': true
    },
    pattern_info: {
      type: CatalogDataDefinitionV1Alpha1Schema.properties.pattern_info.type,
      title: CatalogDataDefinitionV1Alpha1Schema.properties.pattern_info.title,
      description: CatalogDataDefinitionV1Alpha1Schema.properties.pattern_info,
      format: 'textarea',
      'x-rjsf-grid-area': 12,
      'x-encode-in-uri': true
    },
    type: {
      type: CatalogDataDefinitionV1Alpha1Schema.properties.type.type,
      title: CatalogDataDefinitionV1Alpha1Schema.properties.type.title,
      enum: CatalogDataDefinitionV1Alpha1Schema.properties.type.enum,
      default: CatalogDataDefinitionV1Alpha1Schema.properties.type.default,
      description: CatalogDataDefinitionV1Alpha1Schema.properties.type.description,
      'x-rjsf-grid-area': 6
    }
  },
  required: ['compatibility', 'pattern_caveats', 'pattern_info', 'type']
};

export default publishCatalogItemSchema;
