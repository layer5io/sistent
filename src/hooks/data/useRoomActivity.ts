import { MutableRefObject, useEffect, useRef, useState } from 'react';
import {
  ICE_SERVERS,
  ICEServer,
  MESHERY_CLOUD_PROD,
  MESHERY_CLOUD_STAGING,
  MESHERY_CLOUD_WS_PROD,
  MESHERY_CLOUD_WS_STAGING
} from '../../constants/constants';

interface UserProfile {
  [key: string]: unknown;
}

interface CollaborationConfigParams {
  provider_url: string;
  getUserProfile: () => Promise<{ data: UserProfile }>;
  getUserAccessToken: () => Promise<{ data: string }>;
}

interface CollaborationConfig {
  signalingUrl: string[];
  user: UserProfile;
  authToken: string;
  refreshAuthToken: () => Promise<string>;
  websocketCallbacks: string[];
  peerOpts: {
    config: {
      iceServers: ICEServer[];
    };
  };
}

interface SubscribeToRoomsActivityMessage {
  type: string;
}

interface UserMapChangeMessage {
  type: string;
  user_map?: UserMapping;
}

interface UserMapping {
  [roomId: string]: {
    [userId: string]: unknown;
  };
}

interface UseRoomActivityParams {
  provider_url: string;
  getUserProfile: () => Promise<{ data: UserProfile }>;
  getUserAccessToken: () => Promise<{ data: string }>;
}

const SUBSCRIBE_TO_ROOMS_ACTIVITY_MSG: SubscribeToRoomsActivityMessage = {
  type: 'subscribe_to_rooms_activity'
};
const USER_MAP_CHANGE_MSG = 'user_map';

/**
 * Determines the appropriate websocket host based on the provider host
 * @param {string} providerHost - The provider host
 * @returns {string} - The websocket host
 */
const getWebsocketHost = (providerHost: string): string => {
  if (providerHost === MESHERY_CLOUD_PROD) {
    return MESHERY_CLOUD_WS_PROD;
  } else if (providerHost === MESHERY_CLOUD_STAGING) {
    return MESHERY_CLOUD_WS_STAGING;
  }

  return providerHost;
};

/**
 * Determines the appropriate WebSocket protocol based on current page protocol
 * @returns {string} - WebSocket protocol ('ws://' or 'wss://')
 */
export function getWebSocketProtocol(): string {
  const isSecure = window.location.protocol === 'https:'; // https only accepts secure websockets
  return isSecure ? 'wss://' : 'ws://';
}

/**
 * Constructs a signaling URL from a provider URL
 * @param {string} providerUrl - The provider URL
 * @returns {string} - The signaling URL
 */
const getSignalingUrlFromProviderUrl = (providerUrl: string): string => {
  const parsedUrl = new URL(providerUrl);
  const websocketHost = getWebsocketHost(parsedUrl.host);
  const protocol = websocketHost === MESHERY_CLOUD_WS_PROD ? 'wss://' : getWebSocketProtocol();
  return `${protocol}${websocketHost}/collaboration`;
};

/**
 * Gets collaboration configuration for WebRTC
 */
export const getCollaborationConfig = async ({
  provider_url,
  getUserProfile,
  getUserAccessToken
}: CollaborationConfigParams): Promise<CollaborationConfig> => {
  const { data: userProfile } = await getUserProfile();

  const websocketCallbacks = ['user_info', 'user_left', 'user_joined', 'user_map'];

  // Fetch token after fetching provider and user so that it
  // gets refreshed if necessary.
  const { data: accessToken } = await getUserAccessToken();
  const refreshToken = async () => {
    return (await getUserAccessToken()).data;
  };

  return {
    signalingUrl: [getSignalingUrlFromProviderUrl(provider_url)],
    user: userProfile,
    authToken: accessToken,
    refreshAuthToken: refreshToken,
    websocketCallbacks,
    peerOpts: {
      config: {
        iceServers: ICE_SERVERS
      }
    }
  };
};

/**
 * Subscribes to room activity via WebSocket
 */
const subscribeToRoomActivity = async (
  wsRef: React.MutableRefObject<WebSocket | null>,
  onUserMapChange: (userMap: UserMapping) => void,
  provider_url: string,
  getUserProfile: () => Promise<{ data: UserProfile }>,
  getUserAccessToken: () => Promise<{ data: string }>
): Promise<void> => {
  const config = await getCollaborationConfig({
    provider_url,
    getUserProfile,
    getUserAccessToken
  });

  // Create the websocket connection with proper headers
  const ws = new WebSocket(config.signalingUrl[0], ['auth', config.authToken]);
  wsRef.current = ws;

  ws.addEventListener('open', () => {
    console.log('[RoomActivity] connected to room activity');
    ws.send(JSON.stringify(SUBSCRIBE_TO_ROOMS_ACTIVITY_MSG));
  });

  ws.addEventListener('message', (event: MessageEvent) => {
    console.log('[RoomActivity] new message', event);
    const data = JSON.parse(event.data) as UserMapChangeMessage;
    if (data.type === USER_MAP_CHANGE_MSG && data.user_map) {
      onUserMapChange(data.user_map);
    }
  });

  ws.addEventListener('close', () => {
    console.log('[RoomActivity] subscription to room activity closed');
  });

  ws.addEventListener('error', (err: Event) => {
    console.error('[RoomActivity] error in room activity subscription', err);
  });
};

/**
 * Hook to subscribe to and get room activity data
 */
export const useRoomActivity = ({
  provider_url,
  getUserProfile,
  getUserAccessToken
}: UseRoomActivityParams): [UserMapping, MutableRefObject<WebSocket | null>] => {
  const [allRoomsUserMapping, setAllRoomsUserMapping] = useState<UserMapping>({});
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    subscribeToRoomActivity(
      wsRef,
      setAllRoomsUserMapping,
      provider_url,
      getUserProfile,
      getUserAccessToken
    );

    const ws = wsRef.current;

    return () => {
      if (ws) {
        console.log('closing websocket', ws);
        ws.close();
      }
    };
  }, [provider_url, getUserProfile, getUserAccessToken]);

  return [allRoomsUserMapping, wsRef];
};

export const subscribeToRoom = (ws: WebSocket, room: string) => {
  ws.send(
    JSON.stringify({
      type: 'subscribe',
      topic: room
    })
  );
};

export const unSubscribeRoom = (ws: WebSocket, room: string) => {
  ws.send(
    JSON.stringify({
      type: 'unsubscribe',
      topic: room
    })
  );
};
