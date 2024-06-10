import { AnyActorLogic, AnyActorRef, Subscription, createActor, setup } from 'xstate';
import { WORKER_COMMANDS, workerEvents } from './events';

interface ProxyActorContext {
  proxyToId: string;
}

interface ProxyActorInput {
  proxyToId: string;
}

const ProxyActor = setup({
  types: {
    context: {} as ProxyActorContext,
    input: {} as ProxyActorInput
  }
}).createMachine({
  id: 'proxy-actor',
  initial: 'idle',
  context: ({ input }) => ({
    proxyToId: input.proxyToId
  }),

  states: {
    idle: {
      on: {
        '*': {
          actions: [
            ({ event, context }) => console.log('Proxying event', event, 'to', context.proxyToId),
            ({ event, context }) => postMessage(workerEvents.proxyEvent(event, context.proxyToId))
          ]
        }
      }
    }
  }
});

const syncSnapshot = (actorRef: AnyActorRef) => {
  return actorRef.subscribe((snapshot) => {
    const jsonSnapshot = snapshot.toJSON();
    delete jsonSnapshot.children; // children are not serializable
    try {
      postMessage(workerEvents.stateSnapshot(jsonSnapshot));
    } catch (error) {
      console.error('Error sending snapshot from worker', error, jsonSnapshot);
    }
  });
};

export const workerfyActor = (actor: AnyActorLogic) => {
  let actorRef: AnyActorRef | null = null;
  let snapshotSubscription: Subscription | null = null;
  const parentProxy = createActor(ProxyActor, {
    input: {
      proxyToId: 'parent'
    }
  }).start();

  addEventListener('message', (event) => {
    if (event.data.type === WORKER_COMMANDS.START_ACTOR) {
      actorRef = createActor(actor, {
        input: event.data.input,
        parent: parentProxy
      });

      snapshotSubscription = syncSnapshot(actorRef);
      actorRef.start();
    }

    if (event.data.type === WORKER_COMMANDS.STOP_ACTOR) {
      snapshotSubscription?.unsubscribe && snapshotSubscription.unsubscribe();
      actorRef?.stop && actorRef.stop();
    }

    if (event.data.type === WORKER_COMMANDS.SEND_EVENT) {
      if (!actorRef) {
        throw new Error('Cannot send event to uninitialized actor');
      }
      actorRef.send(event.data.event);
    }

    if (event.data.type === WORKER_COMMANDS.GET_STATE) {
      if (!actorRef) {
        throw new Error('Cannot get state of uninitialized actor');
      }
      const snapshot = actorRef.getSnapshot().toJSON();
      postMessage(workerEvents.stateSnapshot(snapshot));
    }
  });

  return actorRef;
};
