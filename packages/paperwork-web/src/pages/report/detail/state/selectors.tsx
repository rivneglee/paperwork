import { createSelector } from 'reselect';
import { RouterState } from 'connected-react-router';
import { FormMode } from '@paperwork/ui-widgets';

import { getPageSection, getRoutingState } from '../../../../store/selectors';

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

export const getMode = createSelector(
    getRoutingState,
    (routing: RouterState) => (
        routing.location.search && routing.location.search.indexOf('viewer') !== -1 ? FormMode.READONLY : FormMode.EDIT
    ),
);
