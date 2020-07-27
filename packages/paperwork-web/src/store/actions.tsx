import { NotificationUpdate } from '../schema/Notification';

export const SET_ACTIVE_MENU_ID = 'SET_ACTIVE_MENU_ID';
export const LOAD_NOTIFICATION_UPDATE = 'LOAD_NOTIFICATION_UPDATE';

export interface SetActiveMenuAction {
  menuId: string;
  type: string;
}

export const createSetActiveMenuAction = (menuId: string): SetActiveMenuAction => ({
  menuId,
  type: SET_ACTIVE_MENU_ID,
});

export interface LoadNotificationUpdateAction {
  notificationUpdate: NotificationUpdate;
  type: string;
}

export const createLoadNotificationUpdateAction
  = (notificationUpdate: NotificationUpdate): LoadNotificationUpdateAction => ({
    notificationUpdate,
    type: LOAD_NOTIFICATION_UPDATE,
  });
