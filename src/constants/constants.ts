export const DEFAULT_WIDTH = '24';
export const DEFAULT_HEIGHT = '24';
export const DEFAULT_FILL = '#000';
export const DEFAULT_FILL_NONE = 'none';
export const KEPPEL_GREEN_FILL = '#00B39F';
export const CARIBBEAN_GREEN_FILL = '#00D3A9';
export const DEFAULT_STROKE = '#000';
export const DEFAULT_STROKE_WIDTH = '2';
export const CLOUD_URL = 'https://cloud.layer5.io';

export const KANVAS_MODE = {
  DESIGN: "design",
  OPERATOR: "operator"
} as const;


export const PLAYGROUND_MODES = KANVAS_MODE

export const VISIBILITY = {
  PUBLIC : "public",
  PRIVATE :"private"
}

export const RESOURCE_TYPE = {
  FILTER: "filter",
  DESIGN: "design",
  CATALOG: "catalog",
  VIEW: "view"
} as const;


export type ResourceType = (typeof RESOURCE_TYPE)[keyof typeof RESOURCE_TYPE];

