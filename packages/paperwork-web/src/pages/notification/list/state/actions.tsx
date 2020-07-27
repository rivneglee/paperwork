import { NotificationList } from '../../../../schema/Notification';
import { FilterOption } from '../components/NotificationListPage';

export const LOAD_NOTIFICATION_LIST = 'NOTIFICATION_LIST_LOAD_NOTIFICATION_LIST';
export const UPDATE_FILTER_OPTION = 'NOTIFICATION_LIST_UPDATE_FILTER_OPTION';

export interface LoadNotificationListAction {
  data: NotificationList;
}

export const createLoadNotificationListAction = (data: NotificationList) => ({
  data,
  type: LOAD_NOTIFICATION_LIST,
});

export interface UpdateFilterOptionAction extends FilterOption {
  type: string;
}

export const createUpdateFilterOptionAction = (option: FilterOption): UpdateFilterOptionAction => {
  return {
    ...option,
    type: UPDATE_FILTER_OPTION,
  };
};
