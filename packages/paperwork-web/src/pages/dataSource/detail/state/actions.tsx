import { DataSource } from '../../../../schema/DataSource';

export const LOAD_DATASOURCE_DETAIL = 'DATASOURCE_DETAIL_LOAD_DATASOURCE';

export interface LoadDataSourceDetailAction {
  data: DataSource;
  type: string;
}

export const createLoadDataSourceDetailAction = (dataSource: DataSource): LoadDataSourceDetailAction => {
  return {
    data: dataSource,
    type: LOAD_DATASOURCE_DETAIL,
  };
};
