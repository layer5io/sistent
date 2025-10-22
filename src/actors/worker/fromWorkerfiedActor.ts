import {
  ActorLogic,
  AnyEventObject,
  AnyMachineSnapshot,
  EventObject,
  NonReducibleUnknown,
  StateValue,
  matchesState
} from 'xstate';
import { AnyActorSystem } from 'xstate/dist/declarations/src/system';
import { STATE_SNAPSHOT_EVENT, WORKER_EVENTS, workerCommands } from './events';

const instanceStates = /* #__PURE__ */ new WeakMap();

type WorkerInput = NonReducibleUnknown;

type WorkerSnapshot = AnyMachineSnapshot;
type WorkerActorLogic<TEvent extends EventObject, TInput = NonReducibleUnknown> = ActorLogic<
  WorkerSnapshot,
  TEvent,
  TInput,
  AnyActorSystem,
  EventObject // TEmitted
>;

interface ProxyEvent {
  type: 'PROXY_EVENT';
  data: {
    event: AnyEventObject;
    to: string;
  };
}

export const fromWorkerfiedActor = (
  worker: Worker
): WorkerActorLogic<EventObject, WorkerInput> => ({
  config: Worker,
  
  
  

  start: (state, actorScope) => {
    const { self, system } = actorScope;
    console.log('Starting fromWorkerActor [+]', state, actorScope);
    worker.postMessage(workerCommands.startActor());
    const workerState = {
      worker,
      snapshot: null
    };

    worker.addEventListener('message', (event) => {
      console.log('Message received from worker --> ', event,event.data.type == WORKER_EVENTS.PROXY_EVENT,WORKER_EVENTS.PROXY_EVENT);
      const eventPayload = event.data;
      if (eventPayload.type === WORKER_EVENTS.STATE_SNAPSHOT) {
        const eventFromWorker = eventPayload as STATE_SNAPSHOT_EVENT;
        self.send(eventFromWorker);
        return state;
      }

      if (eventPayload.type === WORKER_EVENTS.PROXY_EVENT) {
    
        const proxyEvent = eventPayload as ProxyEvent;
        const targetActorId = proxyEvent.data.to;
        const targetEvent = proxyEvent.data.event;
        const isToParent = targetActorId === 'parent';
        console.log('Proxy event received from worker to', targetActorId, targetEvent, isToParent);


        if (isToParent && self._parent) {
          console.log('Relaying to parent', proxyEvent.data);
          self._parent.send(proxyEvent.data.event);
          return state;
        }
        if (!isToParent) {
          const targetActor = system.get(proxyEvent.data.to);
          console.log('Relaying to system actor', proxyEvent.data, targetActor,system,self);
          if (targetActor){
            targetActor.send(proxyEvent.data.event);
          }
          return state;
        }



      }
    });

    instanceStates.set(self, workerState);
  },
  transition: (state, event, actorScope) => {
    const { self } = actorScope;
    const workerState = instanceStates.get(self);
    console.log('fromWorkerActor transition', state, event, actorScope);

    if (event.type === 'xstate.stop') {
      console.log('Stopping fromWorkerActor...', state, event, actorScope);
      workerState.worker.postMessage(workerCommands.stopActor());
      workerState.worker.terminate();
      return {
        ...state,
        status: 'stopped',
        error: undefined
      };
    }



    if (event.type == WORKER_EVENTS.STATE_SNAPSHOT) {
      const snapshot = (event as STATE_SNAPSHOT_EVENT).data.snapshot as AnyMachineSnapshot;
      return {
        ...state,
        ...(snapshot || {})
      };
    }

    try {
      workerState.worker.postMessage(workerCommands.sendEvent(event));
    } catch (error) {
      console.error('Error sending event to worker', error, event);
    }
    const nextState = {
      ...state
    };
    return nextState;
  },
  getInitialSnapshot: (_, input) => {
    return {
      status: 'active',
      output: undefined,
      error: undefined,
      value: 'created',
      input,
      tags: [],
      historyValue: undefined,
      context: {},
      matches: function (value: StateValue) {
        const currentValue = (this as WorkerSnapshot).value;
        return matchesState(value, currentValue);
      }
    } as unknown as AnyMachineSnapshot;
  },

  getPersistedSnapshot: (snapshot) => snapshot,
  restoreSnapshot: (snapshot) => snapshot as WorkerSnapshot
});
