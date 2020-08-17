import { ReportDetail } from '../../../../schema/Report';

export const LOAD_REPORT_DETAIL = 'REPORT_DETAIL_LOAD_REPORT';
export const UPDATE_REPORT = 'REPORT_DETAIL_UPDATE_REPORT';

export interface LoadReportDetailAction {
  report: ReportDetail;
  type: string;
}

export interface UpdateReportAction {
  props: ReportDetail;
  type: string;
}

export const createLoadReportDetailAction = (report: ReportDetail): LoadReportDetailAction => {
  return {
    report,
    type: LOAD_REPORT_DETAIL,
  };
};

export const createUpdateReportAction = (props: ReportDetail): UpdateReportAction => {
  return {
    props,
    type: UPDATE_REPORT,
  };
};
