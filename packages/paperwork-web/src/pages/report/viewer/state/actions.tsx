import { ReportDetail } from '../../../../schema/Report';

export const LOAD_REPORT_DETAIL = 'VIEW_REPORT_LOAD_REPORT';

export interface LoadReportDetailAction {
  report: ReportDetail;
  type: string;
}

export const createLoadReportDetailAction = (report: ReportDetail): LoadReportDetailAction => {
  return {
    report,
    type: LOAD_REPORT_DETAIL,
  };
};
