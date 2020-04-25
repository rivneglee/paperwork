import { LOAD_DATASOURCE_LIST, LoadDataSourceAction } from './actions';

export const dataSourceListReducer = (state = [], action: LoadDataSourceAction) => {
  const { type } = action;
  switch (type) {
    case LOAD_DATASOURCE_LIST: {
      const { data = [] } = action;
      return data;
    }
    default:
      return state;
  }
};
