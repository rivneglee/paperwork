import { Pagination } from './Pagination';
import { User } from './User';

export enum NotificationEventType {
  FILLING_FORM_INVITATION = 'FILLING_FORM_INVITATION',
  SHARED_REPORT = 'SHARED_REPORT',
}

export interface NotificationEvent {
  type: NotificationEventType;
  refId?: string;
}

export interface Notification {
  id: string;
  subject: string;
  sender: User;
  isUnread: boolean;
  receivedAt: string;
  event: NotificationEvent;
}

export interface NotificationList {
  entries: Notification[];
  pagination: Pagination;
}

export interface NotificationDetail extends Notification{
  bodyTemplate: string;
  bodyVariables: {[key: string]: any};
}

export interface NotificationUpdate {
  unread: number;
  latestNotification?: Notification;
}
