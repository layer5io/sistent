/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, Subject, filter } from 'rxjs';

// Generic Event interface
export interface EventBusEvent<Type extends string, Data = unknown> {
  type: Type;
  data: Data;
}

// Helper type to extract event types from a union
export type EventType<T> = T extends EventBusEvent<infer Type, any> ? Type : never;

// Helper type to extract payload type for a given event type
export type DataType<T, Type extends string> =
  T extends EventBusEvent<Type, infer Data> ? Data : never;

// Generic EventBus class
export class EventBus<T extends EventBusEvent<string, any>> {
  private eventSubject: Subject<T>;
  private eventObservable: Observable<T>;

  constructor() {
    this.eventSubject = new Subject<T>();
    this.eventObservable = this.eventSubject.asObservable();
  }

  // Method to publish an event
  publish<E extends T>(event: E): void {
    this.eventSubject.next(event);
  }

  // Method to subscribe to a specific event type
  on(eventType: EventType<T>): Observable<T> {
    return this.eventObservable.pipe(filter((event): event is T => event.type === eventType));
  }

  // Method to subscribe to all events
  onAny(): Observable<T> {
    return this.eventObservable;
  }
}
