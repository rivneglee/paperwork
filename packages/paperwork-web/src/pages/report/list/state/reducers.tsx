import { Report } from '../../../../schema/Report';
import { Pagination } from '../../../../schema/Pagination';
import { LOAD_REPORT_LIST, UPDATE_FILTER_OPTION, LoadReportListAction, UpdateFilterOptionAction } from './actions';
import { PageState } from '../../../../store';
import { FilterOptions } from '../components/ReportListPage';

export interface ReportListPageState {
  entries: Report[];
  pagination: Pagination;
  filterOptions: FilterOptions;
}

export const defaultState: ReportListPageState = {
  entries: [],
  pagination: { page: 0, total: 0 },
  filterOptions: {},
};

const loadReportList = (
  state: PageState,
  action: LoadReportListAction,
) => {
  const { pagination } = action.data;
  const { page } = pagination;
  if (page > 1) {
    return {
      ...state,
      reportList: {
        ...state.reportList,
        entries: [
          ...state.reportList.entries,
          ...action.data.entries,
        ],
        pagination: action.data.pagination,
      },
    };
  }
  return ({
    ...state,
    reportList: {
      ...state.reportList,
      ...action.data,
    },
  });
};

const updateFilterOption = (
  state: PageState,
  action: UpdateFilterOptionAction,
) => ({
  ...state,
  reportList: {
    ...state.reportList,
    filterOptions: {
      ...state.reportList.filterOptions,
      [action.key]: action.value,
    },
  },
});

export const mapping = {
  [LOAD_REPORT_LIST]: loadReportList,
  [UPDATE_FILTER_OPTION]: updateFilterOption,
};
