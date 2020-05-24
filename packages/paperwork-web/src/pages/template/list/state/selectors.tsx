import { createSelector } from 'reselect';

import { getPageSection } from '../../../../store/selectors';
import { TemplateListPageState } from './reducers';

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

export const getFilterOptions = createSelector(
  getPage,
  (page: TemplateListPageState) => page.filterOptions,
);
