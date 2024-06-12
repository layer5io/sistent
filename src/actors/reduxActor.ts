import { assertEvent, sendTo, setup } from 'xstate';

import { Selector, Store, UnknownAction } from '@reduxjs/toolkit';

interface ReduxActorContext {
  store: Store;
  selectors: {
    [key: string]: Selector;
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type extraArgs = any[];

export const REDUX_COMMANDS = {
  DISPATCH: 'DISPATCH',
  GET_STATE: 'GET_STATE',
  GET_STATE_FROM_SELECTOR: 'GET_STATE_FROM_SELECTOR',
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE'
};

export const REDUX_EVENTS = {
  REDUX_STATE_SNAPSHOT: 'REDUX_STATE_SNAPSHOT'
};

export type REXUX_ACTOR_EVENTS =
  | { type: 'DISPATCH'; data: { action: UnknownAction } }
  | { type: 'SUBSCRIBE' }
  | { type: 'UNSUBSCRIBE' }
  | { type: 'REDUX_STATE_SNAPSHOT'; data: { snapshot: unknown } }
  | { type: 'GET_STATE'; returnAddress: string; data: { key: string } }
  | {
      type: 'GET_STATE_FROM_SELECTOR';
      returnAddress: string;
      data: { selector: string; extraArgs?: extraArgs };
    };

export const reduxEvents = {
  stateSnapshot: (snapshot: unknown) => ({
    type: 'STATE_SNAPSHOT',
    data: { snapshot }
  })
};

export const reduxCommands = {
  dispatch: (action: UnknownAction) => ({
    type: 'DISPATCH',
    data: { action }
  }),

  getState: (key: string, returnAddress: string) => ({
    type: 'GET_STATE',
    returnAddress,
    data: { key }
  }),

  getStateFromSelector: (selector: string, returnAddress: string, extraArgs?: extraArgs) => ({
    type: 'GET_STATE_FROM_SELECTOR',
    returnAddress,
    data: { selector, extraArgs }
  })
};

export const reduxActor = setup({
  types: {
    context: {} as ReduxActorContext,
    input: {} as ReduxActorContext,
    events: {} as REXUX_ACTOR_EVENTS
  }
}).createMachine({
  initial: 'idle',
  context: ({ input }) => input,
  states: {
    idle: {
      on: {
        DISPATCH: {
          actions: [({ event, context }) => context.store.dispatch(event.data.action)]
        },
        GET_STATE_FROM_SELECTOR: {
          actions: sendTo(
            ({ event }) => event.returnAddress,
            ({ context, event }) => {
              assertEvent(event, 'GET_STATE_FROM_SELECTOR');
              const selector = context.selectors[event.data.selector];
              const snapshot = selector(context.store.getState(), ...(event.data.extraArgs || []));
              return reduxEvents.stateSnapshot(snapshot);
            }
          )
        }
      }
    }
  }
});
