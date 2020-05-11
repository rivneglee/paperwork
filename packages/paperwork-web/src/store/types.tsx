import { RouterState } from 'connected-react-router';

import { DataSourceListPageState } from '../pages/dataSource/list/state/reducers';
import { DataSourceDetailPageState } from '../pages/dataSource/detail/state/reducers';
import { Authentication } from '../schema/User';

export type PageState = {
  dataSourceList: DataSourceListPageState;
  dataSourceDetail: DataSourceDetailPageState;
};

export interface StoreState {
  page: PageState;
  authentication?: Authentication;
  router?: RouterState;
}
