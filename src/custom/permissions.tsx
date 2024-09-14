// import { CAN, getCapabilitiesRegistry, getMesheryEventBus } from '@/globals/mesherySdk';
import React from 'react';
import { EventBus } from '../actors/eventBus';

export interface Key {
  subject: string;
  action: string;
}

export type InvertAction = 'disable' | 'hide';

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

export interface HasKeyProps<ReasonEvent> {
  Key?: Key;
  predicate?: (capabilitiesRegistry: unknown) => [boolean, ReasonEvent]; // returns a boolean and an event if the user does not have the permission
  children: React.ReactNode;
  notifyOnclick?: boolean;
  invert_action?: InvertAction[];
}

// returns the children if the user has the permission to view the component or if a key is not provided
// if the user does not have the permission to view the component, it will return null or a disabled version of the component specified by the invert_action prop
export const createCanShow = (
  getCapabilitiesRegistry = () => {},
  CAN: (action: string, subject: string) => boolean,
  eventBus: () => EventBus<ReasonEvent>
) => {
  return ({
    Key,
    children,
    notifyOnclick = true,
    predicate,
    invert_action = ['disable']
  }: HasKeyProps<ReasonEvent>) => {
    if (!children) {
      return null;
    }

    const hasKey = Key?.subject ? CAN(Key?.action, Key?.subject) : true;
    const predicateRes = predicate && predicate(getCapabilitiesRegistry());

    const can = predicateRes ? predicateRes[0] && hasKey : hasKey;

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

    const pointerEvents = notifyOnclick ? 'auto' : 'none';
    console.log('cant perform action ', reason, eventBus);

    const onClick = notifyOnclick
      ? (e: React.MouseEvent<HTMLDivElement | HTMLElement>) => {
          e.stopPropagation();
          console.log('cant perform action : reason', reason, eventBus);
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
        onClick={onClick}
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
