import { DataSource } from '../../../../schema/DataSource';
import { LoadDataSourceDetailAction, LOAD_DATASOURCE_DETAIL } from './actions';

export interface DataSourceDetailPageState {
  data: DataSource;
}

const defaultState: DataSourceDetailPageState = {
  data: {
    id: '',
    name: '',
    owner: '',
    fields: [],
    collaborators: [],
  },
};

const loadDataSourceDetail = (
  state: DataSourceDetailPageState = defaultState,
  action: LoadDataSourceDetailAction,
) => ({
  ...state,
  data: action.data,
});

export const mapping = {
  [LOAD_DATASOURCE_DETAIL]: loadDataSourceDetail,
};
