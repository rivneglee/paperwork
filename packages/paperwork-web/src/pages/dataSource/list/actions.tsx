import { DataSourceList } from '../../../schema/DataSource';

export interface LoadDataSourceAction {
  data: DataSourceList;
  type: string;
}

export const LOAD_DATASOURCE_LIST = 'LOAD_DATASOURCE_LIST';

export const createLoadDataSourceAction = (dataSourceList: DataSourceList): LoadDataSourceAction => {
  return {
    data: dataSourceList,
    type: LOAD_DATASOURCE_LIST,
  };
};
