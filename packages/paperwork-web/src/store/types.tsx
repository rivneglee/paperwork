import { RouterState } from 'connected-react-router';

import { DataSourceListPageState } from '../pages/dataSource/list/state/reducers';
import { DataSourceDetailPageState } from '../pages/dataSource/detail/state/reducers';
import { Authentication } from '../schema/User';
import { TemplateListPageState } from '../pages/template/list/state/reducers';
import { TemplateDetailPageState } from '../pages/template/detail/state/reducers';
import { FormListPageState } from '../pages/form/list/state/reducers';
import { FormDetailPageState } from '../pages/form/detail/state/reducers';

export type PageState = {
  dataSourceList: DataSourceListPageState;
  dataSourceDetail: DataSourceDetailPageState;
  templateList: TemplateListPageState;
  templateDetail: TemplateDetailPageState;
  formList: FormListPageState;
  formDetail: FormDetailPageState;
};

export interface StoreState {
  page: PageState;
  navigation: NavigationState;
  authentication?: Authentication;
  router?: RouterState;
}

export interface NavigationState {
  activeMenuId?: string;
}
