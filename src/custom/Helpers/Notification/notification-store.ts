import { OptionsObject } from 'notistack';
import React from 'react';

export type NotificationVariant = OptionsObject['variant'];

export interface NotificationRecord {
  id: string;
  message: string;
  variant: NotificationVariant;
  createdAt: number;
  read: boolean;
}

type Listener = () => void;

/**
 * Module-level store (outside React) that aggregates every notification
 * dispatched through `useNotificationHandler` so a persistent surface like
 * `NotificationCenter` can render history after a toast disappears.
 *
 * This intentionally does not replace notification-handler.ts / notistack -
 * it just mirrors what already flows through that pipeline.
 */
class NotificationStore {
  private records: NotificationRecord[] = [];
  private listeners = new Set<Listener>();

  private emit = (): void => {
    this.listeners.forEach((listener) => listener());
  };

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): NotificationRecord[] => this.records;

  add = (message: string, variant?: NotificationVariant): void => {
    const record: NotificationRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      message,
      variant: variant ?? 'default',
      createdAt: Date.now(),
      read: false
    };
    this.records = [record, ...this.records];
    this.emit();
  };

  markRead = (id: string): void => {
    this.records = this.records.map((record) =>
      record.id === id ? { ...record, read: true } : record
    );
    this.emit();
  };

  markAllRead = (): void => {
    this.records = this.records.map((record) => ({ ...record, read: true }));
    this.emit();
  };

  dismiss = (id: string): void => {
    this.records = this.records.filter((record) => record.id !== id);
    this.emit();
  };

  clear = (): void => {
    this.records = [];
    this.emit();
  };
}

export const notificationStore = new NotificationStore();

/**
 * Subscribes a component to the notification history so it re-renders
 * whenever a new notification is added, read, dismissed, or cleared.
 */
export const useNotificationStore = (): {
  notifications: NotificationRecord[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
  clear: () => void;
} => {
  const notifications = React.useSyncExternalStore(
    notificationStore.subscribe,
    notificationStore.getSnapshot,
    notificationStore.getSnapshot
  );

  const unreadCount = React.useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  return {
    notifications,
    unreadCount,
    markRead: notificationStore.markRead,
    markAllRead: notificationStore.markAllRead,
    dismiss: notificationStore.dismiss,
    clear: notificationStore.clear
  };
};
