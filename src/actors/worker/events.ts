import { AnyEventObject } from 'xstate';

export const WORKER_COMMANDS = {
  START_ACTOR: 'START_ACTOR',
  STOP_ACTOR: 'STOP_ACTOR',
  SEND_EVENT: 'SEND_EVENT',
  GET_STATE: 'GET_STATE'
};

export const workerCommands = {
  startActor: () => ({ type: WORKER_COMMANDS.START_ACTOR }),
  stopActor: () => ({ type: WORKER_COMMANDS.STOP_ACTOR }),
  sendEvent: (event: AnyEventObject) => ({ type: WORKER_COMMANDS.SEND_EVENT, event }),
  getState: () => ({ type: WORKER_COMMANDS.GET_STATE })
};

export interface PROXY_EVENT {
  type: 'PROXY_EVENT';
  data: {
    event: AnyEventObject;
    to: string;
  };
}

export interface STATE_SNAPSHOT_EVENT {
  type: 'STATE_SNAPSHOT';
  data: {
    snapshot: unknown;
  };
}

export const workerEvents = {
  proxyEvent: (event: AnyEventObject, to: string) => ({
    type: 'PROXY_EVENT',
    data: { event, to }
  }),

  stateSnapshot: (snapshot: unknown) => ({
    type: 'STATE_SNAPSHOT',
    data: { snapshot }
  })
};

export const WORKER_EVENTS = {
  STATE_SNAPSHOT: 'STATE_SNAPSHOT',
  PROXY_EVENT: 'PROXY_EVENT'
};
