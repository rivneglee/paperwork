import { createSelector } from 'reselect';

import { getPageSection } from '../../../../store/selectors';

const getPage = createSelector(
  getPageSection,
  page => page.reportDetail,
);

export const getReportDetail = createSelector(
  getPage,
  page => page.report,
);

export const getIsPageEdited = createSelector(
  getPage,
  page => page.isPageEdited,
);
