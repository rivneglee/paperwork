import { createSelector } from 'reselect';

import { getPageSection } from '../../../../store/selectors';

export const getPage = createSelector(
  getPageSection,
  page => page.templateList,
);

export const getEntries = createSelector(
  getPage,
  page => page.entries,
);

export const getPagination = createSelector(
  getPage,
  page => page.pagination,
);
