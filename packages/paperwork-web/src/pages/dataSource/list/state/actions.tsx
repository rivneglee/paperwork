import { DataSourceList } from '../../../../schema/DataSource';
import { FilterOption } from '../components/DataSourceListPage';

export const LOAD_DATASOURCE_LIST = 'DATASOURCE_LIST_LOAD_DATASOURCE_LIST';
export const UPDATE_FILTER_OPTION = 'DATASOURCE_LIST_UPDATE_FILTER_OPTION';

export interface LoadDataSourceAction {
  data: DataSourceList;
  type: string;
}

export interface UpdateFilterOptionAction extends FilterOption {
  type: string;
}

export const createLoadDataSourceAction = (dataSourceList: DataSourceList): LoadDataSourceAction => {
  return {
    data: dataSourceList,
    type: LOAD_DATASOURCE_LIST,
  };
};

export const createUpdateFilterOptionAction = (option: FilterOption): UpdateFilterOptionAction => {
  return {
    ...option,
    type: UPDATE_FILTER_OPTION,
  };
};
