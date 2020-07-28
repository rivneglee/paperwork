import { createSelector } from 'reselect';

import { getPageSection } from '../../../../store/selectors';
import { NotificationListPageState } from './reducers';

const getPage = createSelector(
  getPageSection,
  page => page.notificationList,
);

export const getEntries = createSelector(
  getPage,
  page => page.entries.map(entry => ({
    ...entry,
    sender: entry.sender ? entry.sender.displayName : 'SYSTEM',
  })),
);

export const getPagination = createSelector(
  getPage,
  page => page.pagination,
);

export const getFilterOptions = createSelector(
  getPage,
  (page: NotificationListPageState) => page.filterOptions,
);
