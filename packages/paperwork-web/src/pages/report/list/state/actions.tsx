import { ReportList } from '../../../../schema/Report';
import { FilterOption } from '../components/ReportListPage';

export const LOAD_REPORT_LIST = 'REPORT_LIST_LOAD_REPORT_LIST';

export const UPDATE_FILTER_OPTION = 'REPORT_LIST_UPDATE_FILTER_OPTION';

export interface LoadReportListAction {
  data: ReportList;
}

export interface UpdateFilterOptionAction extends FilterOption {
  type: string;
}

export const createLoadReportListAction = (data: ReportList) => ({
  data,
  type: LOAD_REPORT_LIST,
});

export const createUpdateFilterOptionAction = (option: FilterOption): UpdateFilterOptionAction => {
  return {
    ...option,
    type: UPDATE_FILTER_OPTION,
  };
};
