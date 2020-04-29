import { DataSourceListPageState } from '../pages/dataSource/list/state/reducers';
import { Authentication } from '../schema/User';

export type PageState = DataSourceListPageState | {};

export interface StoreState {
  page: PageState;
  authentication?: Authentication;
}
