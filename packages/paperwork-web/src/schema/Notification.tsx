import { Pagination } from './Pagination';

export interface Notification {
  id: string;
  subjectTemplate: string;
  subjectVariables: {[key: string]: any};
}

export interface NotificationList {
  entries: Notification[];
  pagination: Pagination;
}

export interface NotificationDetail {
  id: string;
  subjectTemplate: string;
  subjectVariables: {[key: string]: any};
  bodyTemplate: string;
  bodyVariables: {[key: string]: any};
}

export interface NotificationUpdate {
  unread: number;
  latestNotification?: Notification;
}
