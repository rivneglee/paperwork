import { LayoutNodeTypes } from '@paperwork/ui-widgets';
import { ReportDetail } from '../../../../schema/Report';
import { PageState } from '../../../../store';
import { LOAD_REPORT_DETAIL, LoadReportDetailAction, UPDATE_REPORT, UpdateReportAction } from './actions';

export interface ReportDetailPageState {
  report: ReportDetail;
  isPageEdited: boolean;
}

export const defaultState: ReportDetailPageState = {
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
  },
  isPageEdited: false,
};

const loadReportDetail = (
  state: PageState,
  action: LoadReportDetailAction,
) => ({
  ...state,
  reportDetail: {
    ...state.reportDetail,
    report: action.report,
  },
});

const updateReportLayout = (
  state: PageState,
  action: UpdateReportAction,
) => ({
  ...state,
  reportDetail: {
    ...state.reportDetail,
    isPageEdited: true,
    report: {
      ...state.reportDetail.report,
      ...action.props,
    },
  },
});

export const mapping = {
  [LOAD_REPORT_DETAIL]: loadReportDetail,
  [UPDATE_REPORT]: updateReportLayout,
};
