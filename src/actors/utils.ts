// disbale stict no any for now for full file
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnyActorRef, AnyEventObject, assign, enqueueActions, sendTo } from 'xstate';
import { AnyActorSystem } from 'xstate/dist/declarations/src/system';
import { workerEvents } from './worker/events';

type ContextWithReturnAddress = { returnAddress: AnyActorRef };

export const sendToActor = (actor: string, event: AnyEventObject) =>
  sendTo(({ system }: { system: AnyActorSystem }) => {
    console.log('sendToActor', actor, event);
    return system.get(actor);
  }, event);

export const sendToActors = (
  actorSystemIds: string[],
  eventCreator: (actionArgs: any, params: any) => AnyEventObject
) =>
  enqueueActions(({ enqueue, ...actionArgs }, params) => {
    actorSystemIds.forEach((actorSystemId) => {
      const actor = actionArgs.system.get(actorSystemId);
      if (!actor) {
        console.log('actor not found --sendToActors', actorSystemId);
        return;
      }
      enqueue.sendTo(actor, eventCreator(actionArgs, params));
    });
  });

export const forwardToActors = (actorSystemIds: string[]) =>
  enqueueActions(({ enqueue, event, system }) => {
    actorSystemIds.forEach((actorSystemId) => {
      const actor = system.get(actorSystemId);
      if (actor) {
        enqueue.sendTo(actor, event);
      }
    });
  });

export const deadLetter = (event: AnyEventObject) => ({ type: 'DEAD_LETTER', event });



function isInWorker() {
  return (
    typeof self !== 'undefined' &&         // 'self' exists
    typeof self?.document === 'undefined'        // no Window in worker
  );
}

export const reply = (eventFn: (actionArgs: any, params: any) => AnyEventObject) =>  enqueueActions(({ enqueue, ...actionArgs }, params) => {

    if (!actionArgs.context.returnAddress) {
        console.warn('No return address specified in context for reply action');
        return;
    }
  if (isInWorker()) {
        console.log('reply in worker - posting message to main thread', actionArgs.context.returnAddress, eventFn(actionArgs, params));
        postMessage(workerEvents.proxyEvent(eventFn(actionArgs, params), actionArgs.context.returnAddress));
        return;
  }
   enqueue.sendTo(actionArgs.context.returnAddress, eventFn);
})

export const XSTATE_DEBUG_EVENT = 'XSTATE_DEBUG_EVENT';

type deferredEventsQueue = AnyEventObject[];

interface DeferredEventsQueueContext {
  deferredEventsQueue: deferredEventsQueue;
}

interface deferActionParams {
  event: AnyEventObject;
  context: DeferredEventsQueueContext;
}

const defer = assign({
  deferredEventsQueue: ({ context: { deferredEventsQueue }, event }: deferActionParams) => [
    ...deferredEventsQueue,
    event
  ]
});

const recall = enqueueActions(({ context: { deferredEventsQueue }, enqueue }) => {
  enqueue.assign({
    deferredEventsQueue: []
  });
  for (const event of deferredEventsQueue) {
    enqueue.raise(event);
  }
});

export const DeferEvents = {
  defer,
  recall
};
