/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  DoneActorEvent,
  ErrorActorEvent,
  EventObject,
  SnapshotFrom,
  assign,
  fromPromise,
  setup
} from 'xstate';
import { reply } from '../utils';

export const DATA_VALIDATOR_COMMANDS = {
  VALIDATE_DATA: 'VALIDATE_DATA' as const
};

export const DATA_VALIDATOR_EVENTS = {
  DESIGN_VALIDATION_DONE: 'DESIGN_VALIDATION_DONE' as const,
  DESIGN_VALIDATION_FAILED: 'DESIGN_VALIDATION_FAILED' as const
};

type ValidationPayload = Record<string, unknown>;
type ValidationResults = unknown;
type SystemErrors = unknown;

interface ValidateDataCommand extends EventObject {
  type: typeof DATA_VALIDATOR_COMMANDS.VALIDATE_DATA;
  returnAddress: string;
  data: {
    validationPayload: ValidationPayload;
  };
}

interface ValidateActorDoneEvent extends DoneActorEvent {
  output: {
    validationResults: ValidationResults;
  };
}

interface DataValidatedEvent extends EventObject {
  type: typeof DATA_VALIDATOR_EVENTS.DESIGN_VALIDATION_DONE;
  data: {
    validationPayload: ValidationPayload;
    validationResults: ValidationResults;
  };
}

interface DataValidationFailedEvent extends EventObject {
  type: typeof DATA_VALIDATOR_EVENTS.DESIGN_VALIDATION_FAILED;
  data: {
    validationPayload: ValidationPayload;
    systemErrors: SystemErrors;
  };
}

export const dataValidatorCommands = {
  validateData: ({
    validationPayload,
    returnAddress
  }: {
    validationPayload: ValidationPayload;
    returnAddress: string;
  }): ValidateDataCommand => ({
    type: DATA_VALIDATOR_COMMANDS.VALIDATE_DATA,
    returnAddress,
    data: { validationPayload }
  })
};

export const dataValidatorEvents = {
  dataValidated: ({
    validationPayload,
    validationResults
  }: {
    validationPayload: ValidationPayload;
    validationResults: ValidationResults;
  }): DataValidatedEvent => ({
    type: DATA_VALIDATOR_EVENTS.DESIGN_VALIDATION_DONE,
    data: { validationPayload, validationResults }
  }),

  dataValidationFailed: ({
    validationPayload,
    systemErrors
  }: {
    validationPayload: ValidationPayload;
    systemErrors: SystemErrors;
  }): DataValidationFailedEvent => ({
    type: DATA_VALIDATOR_EVENTS.DESIGN_VALIDATION_FAILED,
    data: { validationPayload, systemErrors }
  })
};

interface ValidationMachineContext {
  validationResults: ValidationResults | null;
  validationPayload: ValidationPayload | null;
  returnAddress: string | null;
}

interface ValidateActorInput {
  validationPayload: ValidationPayload;
  prevValidationResults: ValidationResults;
}

type ValidationMachineEvents =
  | ValidateDataCommand
  | DataValidatedEvent
  | DataValidationFailedEvent
  | ValidateActorDoneEvent;

export const dataValidatorMachine = setup({
  types: {
    context: {} as ValidationMachineContext,
    events: {} as ValidationMachineEvents
  },
  delays: {
    debounceTimeout: 300
  },
  actions: {
    setReturnAddress: assign({
      returnAddress: ({ event }) => (event as ValidateDataCommand).returnAddress
    }),
    setValidationPayload: assign({
      validationPayload: ({ event }) => (event as ValidateDataCommand).data.validationPayload
    }),

    resetValidationPayload: assign({
      validationPayload: null
    }),

    resetValidationResults: assign({
      validationResults: null
    }),
    setValidationResults: assign({
      validationResults: ({ event }) => (event as ValidateActorDoneEvent).output.validationResults
    })
  },
  actors: {
    ValidateActor: fromPromise(async ({ input }: { input: ValidateActorInput }) => {
      console.log('Validating data', input);
      throw new Error('not implemented');
    })
  }
}).createMachine({
  id: 'validationMachine',

  initial: 'idle',

  context: {
    validationResults: null,
    validationPayload: {}, //data to be used in the validation process like the design to validate
    returnAddress: null // the address to send the validation result to
  },

  states: {
    idle: {
      description:
        'when the machine is idle , i.e no process is going on and the machine the ready to accept new request',
      initial: 'waiting',
      on: {
        [DATA_VALIDATOR_COMMANDS.VALIDATE_DATA]: {
          target: '.debouncing',
          actions: ['setValidationPayload', 'setReturnAddress']
        }
      },
      states: {
        waiting: {},
        debouncing: {
          after: {
            debounceTimeout: '#validatingData'
          }
        }
      }
    },

    validatingData: {
      id: 'validatingData',
      invoke: {
        src: 'ValidateActor',
        input: ({ context }: { context: ValidationMachineContext }) => ({
          validationPayload: context.validationPayload as ValidationPayload,
          prevValidationResults: context.validationResults as ValidationResults
        }),
        onDone: {
          target: 'idle',
          actions: [
            'setValidationResults',
            reply(
              ({
                context,
                event
              }: {
                context: ValidationMachineContext;
                event: ValidateActorDoneEvent;
              }) =>
                dataValidatorEvents.dataValidated({
                  validationPayload: context.validationPayload as ValidationPayload,
                  validationResults: event.output.validationResults
                })
            ) as any
          ]
        },
        onError: {
          target: 'idle',
          actions: [
            reply(
              ({ context, event }: { context: ValidationMachineContext; event: ErrorActorEvent }) =>
                dataValidatorEvents.dataValidationFailed({
                  validationPayload: context.validationPayload as ValidationPayload,
                  systemErrors: event.error
                })
            ) as any,
            ({ event }) => console.error('Failed to validate data', event),
            assign({
              validationResults: ({ event }) => `Failed to validate data: ${event.error || ''}`
            })
          ]
        }
      }
    }
  }
});

type ValidationMachineSnapshot = SnapshotFrom<typeof dataValidatorMachine>;

export const selectValidationResults = (state: ValidationMachineSnapshot) =>
  state.context?.validationResults;

export const selectIsValidating = (state: ValidationMachineSnapshot) =>
  state.matches('validatingData');
