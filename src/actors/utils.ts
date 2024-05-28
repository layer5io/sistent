// disbale stict no any for now for full file
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnyActorRef, AnyEventObject, enqueueActions, sendTo } from 'xstate';
import { AnyActorSystem } from 'xstate/dist/declarations/src/system';

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

export const reply = (eventFn: (actionArgs: any, params: any) => AnyEventObject) =>
  sendTo(({ context }: { context: ContextWithReturnAddress }) => context.returnAddress, eventFn);

export const XSTATE_DEBUG_EVENT = 'XSTATE_DEBUG_EVENT';
