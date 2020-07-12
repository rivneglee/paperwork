import { createSelector } from 'reselect';

import { getPageSection } from '../../../../store/selectors';
import { FormListPageState } from './reducers';
import { Scope, Status } from '../../../../schema/Form';

export const getPage = createSelector(
  getPageSection,
  page => page.formList,
);

const StatusBadgeColorMapping = {
  [Status.OPEN]: 'secondary',
  [Status.CLOSED]: 'danger',
};

export const getEntries = createSelector(
  getPage,
  page => page.entries.map(entry => ({
    ...entry,
    status: entry.status.toUpperCase(),
    closeDate: entry.closeDate ? entry.closeDate : '--/--/----',
    targetCommits: entry.targetCommits ? entry.targetCommits : '--',
    maxCommits: entry.maxCommits ? entry.maxCommits : '--',
    isPublic: entry.scope === Scope.PUBLIC,
    statusBadgeColor: StatusBadgeColorMapping[entry.status],
  })),
);

export const getPagination = createSelector(
  getPage,
  page => page.pagination,
);

export const getFilterOptions = createSelector(
  getPage,
  (page: FormListPageState) => page.filterOptions,
);
