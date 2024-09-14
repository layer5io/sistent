// import { CAN, getCapabilitiesRegistry, getMesheryEventBus } from '@/globals/mesherySdk';
import React from 'react';
import { EventBus } from '../actors/eventBus';

interface Key {
  subject: string;
  action: string;
}

type InvertAction = 'disable' | 'hide';

export type MissingPermissionReason = {
  type: 'MISSING_PERMISSION';
  data: {
    keyId: string;
  };
};

export type MissingCapabilityReason = {
  type: 'MISSING_CAPABILITY';
  data: {
    capabilityId: string;
  };
};

export type ReasonEvent = MissingPermissionReason | MissingCapabilityReason;

interface HasKeyProps<ReasonEvent> {
  Key?: Key;
  predicate?: (capabilitiesRegistry: unknown) => [boolean, ReasonEvent]; // returns a boolean and an event if the user does not have the permission
  children: React.ReactNode;
  allowClick?: boolean;
  invert_action?: InvertAction[];
}

// returns the children if the user has the permission to view the component or if a key is not provided
// if the user does not have the permission to view the component, it will return null or a disabled version of the component specified by the invert_action prop
export const createCanShow = (
  getCapabilitiesRegistry = () => {},
  CAN: (action: string, subject: string) => boolean,
  eventBus: () => EventBus<ReasonEvent>
) => {
  return ({ Key, children, predicate, invert_action = ['disable'] }: HasKeyProps<ReasonEvent>) => {
    if (!children) {
      return null;
    }

    const hasKey = Key?.subject ? CAN(Key?.action, Key?.subject) : true;
    const predicateRes = predicate && predicate(getCapabilitiesRegistry());

    //WARNING: remove the false from the below line to enable the feature
    const can = predicateRes ? predicateRes[0] && hasKey && false : hasKey && false;

    const reason = predicateRes?.[1] || {
      type: 'MISSING_PERMISSION',
      data: {
        keyId: Key?.action as string
      }
    };

    if (can) {
      return <>{children}</>;
    }

    if (invert_action.includes('hide')) {
      return null;
    }

    const isClickable = children && (children as React.ReactElement).props.onClick;
    const pointerEvents = isClickable ? 'auto' : 'none';

    const onClick = isClickable
      ? () => {
          console.log('cant perform action : reason', reason);
          const mesheryEventBus = eventBus();
          mesheryEventBus.publish(reason);
        }
      : () => {};

    const opacity = invert_action.includes('disable') ? 0.5 : 1;

    return (
      <div
        style={{
          cursor: 'pointer',
          pointerEvents,
          opacity: opacity
        }}
      >
        {React.cloneElement(children as React.ReactElement, {
          style: {
            ...((children as React.ReactElement).props.style as React.CSSProperties),
            cursor: 'pointer',
            pointerEvents,
            opacity: opacity
          },
          onClick: onClick
        })}
      </div>
    );

    return null;
  };
};
