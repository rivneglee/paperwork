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

const safeGetNumber = (input?: number) => Number(input) || 0;

const getMaxGap = (max?: number, target?: number, received?: number) => {
  if (safeGetNumber(max) > 0) {
    return safeGetNumber(max) - safeGetNumber(target) - safeGetNumber(received);
  }
  return 0;
};

const getTargetGap = (target?: number, received?: number) => {
  if (safeGetNumber(target) > 0) {
    return Math.max(0, safeGetNumber(target) - safeGetNumber(received));
  }
  return 0;
};

export const getEntries = createSelector(
  getPage,
  page => page.entries.map((entry) => {
    const receivedCommits = entry.receivedCommits;
    const maxGap = getMaxGap(entry.maxCommits, entry.targetCommits, entry.receivedCommits);
    const targetGap = getTargetGap(entry.targetCommits, entry.receivedCommits);
    const denominator = entry.targetCommits || entry.maxCommits;
    const progress = denominator ? `${Math.trunc((receivedCommits / denominator) * 100)}%` : '';
    return ({
      ...entry,
      maxGap,
      targetGap,
      progress,
      status: entry.status.toUpperCase(),
      closeDate: entry.closeDate ? entry.closeDate : '--/--/--',
      targetCommits: entry.targetCommits ? entry.targetCommits : '--',
      maxCommits: entry.maxCommits ? entry.maxCommits : '--',
      isPublic: entry.scope === Scope.PUBLIC,
      statusBadgeColor: StatusBadgeColorMapping[entry.status],
    });
  }),
);

export const getPagination = createSelector(
  getPage,
  page => page.pagination,
);

export const getFilterOptions = createSelector(
  getPage,
  (page: FormListPageState) => page.filterOptions,
);
