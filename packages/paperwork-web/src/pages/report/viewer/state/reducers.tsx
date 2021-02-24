import { LayoutNodeTypes } from '@paperwork/ui-widgets';
import { ReportDetail } from '../../../../schema/Report';
import { PageState } from '../../../../store';
import { LOAD_REPORT_DETAIL, LoadReportDetailAction } from './actions';

export interface ViewReportPageState {
  report: ReportDetail;
}

export const defaultState: ViewReportPageState = {
  report: {
    id: '',
    name: 'New Report',
    author: {
      id: '',
      displayName: '',
      username: '',
    },
    theme: undefined,
    layout: [
      { id: 'page', childRefs: [], type: LayoutNodeTypes.PAGE },
    ],
    items: {},
    createdAt: '',
    sharedWith: [],
  },
};

const loadReportDetail = (
    state: PageState,
    action: LoadReportDetailAction,
) => ({
  ...state,
  viewReportDetail: {
    ...state.viewReportDetail,
    report: action.report,
  },
});

export const mapping = {
  [LOAD_REPORT_DETAIL]: loadReportDetail,
};
