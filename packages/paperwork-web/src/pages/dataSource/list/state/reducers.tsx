import { LOAD_DATASOURCE_LIST, UPDATE_FILTER_OPTION, UpdateFilterOptionAction , LoadDataSourceAction } from './actions';
import { DataSourceList } from '../../../../schema/DataSource';
import { FilterOptions } from '../components/DataSourceListPage';

export interface DataSourceListPageState {
  filterOptions: FilterOptions;
  data: DataSourceList;
}

const defaultState: DataSourceListPageState = {
  filterOptions: {},
  data: [],
};

const loadDataSourceList = (
  state: DataSourceListPageState = defaultState,
  action: LoadDataSourceAction,
) => ({
  ...state,
  data: action.data || [],
});

const updateFilterOption = (
  state: DataSourceListPageState = defaultState,
  action: UpdateFilterOptionAction,
) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

export const mapping = {
  [LOAD_DATASOURCE_LIST]: loadDataSourceList,
  [UPDATE_FILTER_OPTION]: updateFilterOption,
};
