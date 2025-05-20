export const DEFAULT_WIDTH = '24';
export const DEFAULT_HEIGHT = '24';
export const DEFAULT_FILL = '#000';
export const DEFAULT_FILL_NONE = 'none';
export const KEPPEL_GREEN_FILL = '#00B39F';
export const CARIBBEAN_GREEN_FILL = '#00D3A9';
export const DEFAULT_STROKE = '#000';
export const DEFAULT_STROKE_WIDTH = '2';

export const KANVAS_MODE = {
  DESIGNER: 'design',
  OPERATOR: 'operator'
} as const;

export const PLAYGROUND_MODES = KANVAS_MODE;

export const VISIBILITY = {
  PUBLIC: 'public',
  PRIVATE: 'private'
};

export const RESOURCE_TYPE = {
  FILTER: 'filter',
  DESIGN: 'design',
  CATALOG: 'catalog',
  VIEW: 'view'
} as const;

export type ResourceType = (typeof RESOURCE_TYPE)[keyof typeof RESOURCE_TYPE];
export interface ICEServer {
  urls: string;
  username?: string;
  credential?: string;
}

/**
 * ICE server configuration for WebRTC connections
 */
export const ICE_SERVERS: ICEServer[] = [
  {
    urls: 'stun:stun.l.google.com:19302'
  },
  {
    urls: 'stun:global.stun.twilio.com:3478'
  },
  {
    urls: 'stun:openrelay.metered.ca:80'
  },
  {
    urls: 'turn:openrelay.metered.ca:80',
    username: 'openrelayproject',
    credential: 'openrelayproject'
  },
  {
    urls: 'turn:openrelay.metered.ca:443',
    username: 'openrelayproject',
    credential: 'openrelayproject'
  },
  {
    urls: 'turn:openrelay.metered.ca:443?transport=tcp',
    username: 'openrelayproject',
    credential: 'openrelayproject'
  }
];

export const MESHERY_CLOUD_PROD = 'https://cloud.layer5.io';
export const MESHERY_CLOUD_STAGING = 'staging-cloud.layer5.io';
export const MESHERY_CLOUD_WS_PROD = 'cloud-ws.layer5.io';
export const MESHERY_CLOUD_WS_STAGING = 'staging-cloud-ws.layer5.io:6543';
