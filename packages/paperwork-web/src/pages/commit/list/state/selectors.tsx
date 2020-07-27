import { createSelector } from 'reselect';

import { getPageSection } from '../../../../store/selectors';
import { CommitListPageState } from './reducers';

const getPage = createSelector(
  getPageSection,
  page => page.commitList,
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
  (page: CommitListPageState) => page.filterOptions,
);
