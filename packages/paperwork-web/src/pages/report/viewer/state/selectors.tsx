import { createSelector } from 'reselect';

import { ViewReportPageState } from './reducers';
import { getPageSection } from '../../../../store/selectors';

const getPage = createSelector(
  getPageSection,
  page => page.viewReportDetail,
);

export const getReportDetail = createSelector(
  getPage,
  (page: ViewReportPageState) => page.report,
);