import { createSelector } from 'reselect';

import { getPageSection } from '../../../../store/selectors';
import { UserCommitListPageState } from './reducers';

const getPage = createSelector(
  getPageSection,
  page => page.userCommitList,
);

export const getEntries = createSelector(
  getPage,
  page => page.entries,
);

export const getPagination = createSelector(
  getPage,
  page => page.pagination,
);

export const getFilterOptions = createSelector(
  getPage,
  (page: UserCommitListPageState) => page.filterOptions,
);
