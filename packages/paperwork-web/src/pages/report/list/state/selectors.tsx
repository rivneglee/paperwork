import { createSelector } from 'reselect';

import { getPageSection } from '../../../../store/selectors';
import { ReportListPageState } from './reducers';

export const getPage = createSelector(
  getPageSection,
  page => page.reportList,
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
  (page: ReportListPageState) => page.filterOptions,
);
