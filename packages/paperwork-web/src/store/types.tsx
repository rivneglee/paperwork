import { RouterState } from 'connected-react-router';

import { DataSourceListPageState } from '../pages/dataSource/list/state/reducers';
import { DataSourceDetailPageState } from '../pages/dataSource/detail/state/reducers';
import { Authentication } from '../schema/User';
import { TemplateListPageState } from '../pages/template/list/state/reducers';
import { TemplateDetailPageState } from '../pages/template/detail/state/reducers';
import { FormListPageState } from '../pages/form/list/state/reducers';
import { FormDetailPageState } from '../pages/form/detail/state/reducers';
import { CommitDetailPageState } from '../pages/commit/detail/state/reducers';
import { CommitListPageState } from '../pages/commit/list/state/reducers';
import { NotificationListPageState } from '../pages/notification/list/state/reducers';
import { ReportListPageState } from '../pages/report/list/state/reducers';
import { ReportDetailPageState } from '../pages/report/detail/state/reducers';
import { NotificationUpdate } from '../schema/Notification';
import { ViewReportPageState } from '../pages/report/viewer/state/reducers';

export type PageState = {
  dataSourceList: DataSourceListPageState;
  dataSourceDetail: DataSourceDetailPageState;
  templateList: TemplateListPageState;
  templateDetail: TemplateDetailPageState;
  formList: FormListPageState;
  formDetail: FormDetailPageState;
  commitDetail: CommitDetailPageState;
  commitList: CommitListPageState;
  notificationList: NotificationListPageState;
  reportList: ReportListPageState;
  reportDetail: ReportDetailPageState;
  viewReportDetail: ViewReportPageState;
};

export interface StoreState {
  page: PageState;
  navigation: NavigationState;
  authentication?: Authentication;
  router?: RouterState;
  notificationUpdate: NotificationUpdate;
}

export interface NavigationState {
  activeMenuId?: string;
}
