import { mapping as DataSourceListPageActionMapping, defaultState as dataSourceList } from '../pages/dataSource/list/state/reducers';
import { mapping as DataSourceDetailPageActionMapping, defaultState as dataSourceDetail } from '../pages/dataSource/detail/state/reducers';
import { mapping as TemplateListPageActionMapping, defaultState as templateList } from '../pages/template/list/state/reducers';
import { PageState } from './types';

const mapping = {
  ...DataSourceListPageActionMapping,
  ...DataSourceDetailPageActionMapping,
  ...TemplateListPageActionMapping,
};

export const defaultPageState = {
  dataSourceList,
  dataSourceDetail,
  templateList,
};

export const authenticationReducer = (state = {}) => state;

export const pageReducer = (state: PageState = defaultPageState, action: any) => {
  const { type } = action;
  if (type === '@@router/LOCATION_CHANGE') return defaultPageState;
  const handler = mapping[type];
  if (!handler) return state;
  return handler(state, action);
};
