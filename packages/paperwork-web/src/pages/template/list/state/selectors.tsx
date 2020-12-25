import { createSelector } from 'reselect';

import { getPageSection, getAuthentication } from '../../../../store/selectors';
import { TemplateListPageState } from './reducers';

export const getPage = createSelector(
  getPageSection,
  page => page.templateList,
);

export const getEntries = createSelector(
  getPage,
  getAuthentication,
  (page, authentication) => page.entries.map(entry => ({
    ...entry,
    isOwner: authentication && authentication.user.id === entry.author.id,
  })),
);

export const getPagination = createSelector(
  getPage,
  page => page.pagination,
);

export const getFilterOptions = createSelector(
  getPage,
  (page: TemplateListPageState) => page.filterOptions,
);
