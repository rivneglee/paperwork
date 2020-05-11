import { LOAD_DATASOURCE_LIST, UPDATE_FILTER_OPTION, UpdateFilterOptionAction , LoadDataSourceAction } from './actions';
import { DataSourceList } from '../../../../schema/DataSource';
import { FilterOptions } from '../components/DataSourceListPage';
import { PageState } from '../../../../store';

export const defaultState: DataSourceListPageState = {
  filterOptions: {},
  data: [],
};

export interface DataSourceListPageState {
  filterOptions: FilterOptions;
  data: DataSourceList;
}

const loadDataSourceList = (
  state: PageState,
  action: LoadDataSourceAction,
) => ({
  ...state,
  dataSourceList: {
    ...state.dataSourceList,
    data: action.data || [],
  },
});

const updateFilterOption = (
  state: PageState,
  action: UpdateFilterOptionAction,
) => ({
  ...state,
  dataSourceList: {
    ...state.dataSourceList,
    filterOptions: {
      ...state.dataSourceList.filterOptions,
      [action.key]: action.value,
    },
  },
});

export const mapping = {
  [LOAD_DATASOURCE_LIST]: loadDataSourceList,
  [UPDATE_FILTER_OPTION]: updateFilterOption,
};
