import { Pagination } from './Pagination';
import { User } from './User';

export interface Notification {
  id: string;
  subject: string;
  sender: User;
  isUnread: boolean;
  receivedAt: string;
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
