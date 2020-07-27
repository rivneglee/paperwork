import { Notification } from '../../../../schema/Notification';
import { PageState } from '../../../../store';
import { Pagination } from '../../../../schema/Pagination';
import { LoadNotificationListAction, LOAD_NOTIFICATION_LIST, UPDATE_FILTER_OPTION, UpdateFilterOptionAction } from './actions';
import { FilterOptions } from '../components/NotificationListPage';

export interface NotificationListPageState {
  entries: Notification[];
  pagination: Pagination;
  filterOptions: FilterOptions;
}

export const defaultState: NotificationListPageState = {
  entries: [],
  pagination: { page: 0, total: 0 },
  filterOptions: {},
};

const loadNotificationList = (
  state: PageState,
  action: LoadNotificationListAction,
) => {
  const { pagination } = action.data;
  const { page } = pagination;
  if (page > 1) {
    return {
      ...state,
      notificationList: {
        ...state.notificationList,
        entries: [
          ...state.notificationList.entries,
          ...action.data.entries,
        ],
        pagination: action.data.pagination,
      },
    };
  }
  return ({
    ...state,
    notificationList: {
      ...state.notificationList,
      ...action.data,
    },
  });
};

const updateFilterOption = (
  state: PageState,
  action: UpdateFilterOptionAction,
) => ({
  ...state,
  notificationList: {
    ...state.notificationList,
    filterOptions: {
      ...state.notificationList.filterOptions,
      [action.key]: action.value,
    },
  },
});

export const mapping = {
  [LOAD_NOTIFICATION_LIST]: loadNotificationList,
  [UPDATE_FILTER_OPTION]: updateFilterOption,
};
