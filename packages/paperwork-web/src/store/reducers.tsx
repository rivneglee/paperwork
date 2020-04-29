import { mapping as DataSourceListPageActionMapping } from '../pages/dataSource/list/state/reducers';
import { PageState } from './types';

const mapping = {
  ...DataSourceListPageActionMapping,
};

export const authenticationReducer = (state = {}) => state;

export const pageReducer = (state: PageState = {}, action: any) => {
  const { type } = action;
  const handler = mapping[type];
  if (!handler) return state;
  return handler(state, action);
};
