import { Store } from '@reduxjs/toolkit';
import { Api, EndpointDefinitions, QueryResultSelectorResult } from '@reduxjs/toolkit/query/react';
import { DoneActorEvent, ErrorActorEvent, EventObject, fromPromise, sendTo, setup } from 'xstate';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface RtkQueryActorContext {
  api: Api<any, EndpointDefinitions, any, any>;
  store: Store;
}

interface RtkQueryActorInput {
  api: Api<any, EndpointDefinitions, any, any>;
  store: Store;
}

interface initiateQueryEvent extends EventObject {
  type: 'INITIATE_QUERY';
  data: {
    endpointName: string;
    params: unknown;
  };
  returnAddress: string;
}

interface queryDoneEvent extends DoneActorEvent {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  output: {
    result: QueryResultSelectorResult<any>;
    sourceEvent: initiateQueryEvent;
  };
}

interface queryFailedEvent extends ErrorActorEvent {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  error: {
    result: QueryResultSelectorResult<any>;
    sourceEvent: initiateQueryEvent;
  };
}

interface QueryResultEvent extends EventObject {
  type: 'QUERY_RESULT';
  data: {
    result: unknown;
  };
}

interface QueryFailedEvent extends EventObject {
  type: 'QUERY_FAILED';
  data: {
    error: unknown;
  };
}

export const rtkQueryActorCommands = {
  initiateQuery: ({
    endpointName,
    params,
    returnAddress
  }: {
    endpointName: string;
    params: unknown;
    returnAddress: string;
  }): initiateQueryEvent => ({
    type: 'INITIATE_QUERY',
    data: { endpointName, params },
    returnAddress
  })
};

export const rtkQueryActorEvents = {
  queryResult: ({ result }: { result: unknown }): QueryResultEvent => ({
    type: 'QUERY_RESULT',
    data: { result }
  }),
  queryFailed: ({ error }: { error: unknown }): QueryFailedEvent => ({
    type: 'QUERY_FAILED',
    data: { error }
  })
};

export const RTK_EVENTS = {
  QUERY_RESULT: 'QUERY_RESULT',
  QUERY_FAILED: 'QUERY_FAILED'
};

type EVENTS = initiateQueryEvent | queryDoneEvent | queryFailedEvent;

interface InitiateQueryActorInput {
  context: RtkQueryActorContext;
  event: initiateQueryEvent;
}
const InitiateQueryActor = fromPromise(async ({ input }: { input: InitiateQueryActorInput }) => {
  const { event, context } = input;
  console.log('event.data.endpointName', event, context);
  const result = await context.store.dispatch(
    (context.api.endpoints[event.data.endpointName] as any).initiate(event.data.params)
  );
  return {
    result,
    sourceEvent: event
  };
});

export const rtkQueryActor = setup({
  types: {
    context: {} as RtkQueryActorContext,
    input: {} as RtkQueryActorInput,
    events: {} as EVENTS
  },
  actors: {
    InitiateQueryActor
  }
}).createMachine({
  initial: 'idle',
  context: ({ input }) => input,
  states: {
    idle: {
      on: {
        INITIATE_QUERY: {
          target: 'querying'
        }
      }
    },
    querying: {
      invoke: {
        id: 'initiateQuery',
        input: ({ context, event }) => ({
          context,
          event: event as initiateQueryEvent
        }),
        src: 'InitiateQueryActor',
        onDone: {
          actions: sendTo(
            ({ event }) => event.output.sourceEvent.returnAddress,
            ({ event }) => rtkQueryActorEvents.queryResult({ result: event.output })
          ),
          target: 'idle'
        },
        onError: {
          actions: sendTo(
            ({ event }) => (event as queryFailedEvent).error.sourceEvent.returnAddress,
            ({ event }) => rtkQueryActorEvents.queryFailed({ error: event.error })
          ),

          target: 'idle'
        }
      }
    }
  }
});
