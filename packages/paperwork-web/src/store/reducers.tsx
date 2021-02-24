import { mapping as DataSourceListPageActionMapping, defaultState as dataSourceList } from '../pages/dataSource/list/state/reducers';
import { mapping as DataSourceDetailPageActionMapping, defaultState as dataSourceDetail } from '../pages/dataSource/detail/state/reducers';
import { mapping as TemplateListPageActionMapping, defaultState as templateList } from '../pages/template/list/state/reducers';
import { mapping as TemplateDetailPageActionMapping, defaultState as templateDetail } from '../pages/template/detail/state/reducers';
import { mapping as FormListPageActionMapping, defaultState as formList } from '../pages/form/list/state/reducers';
import { mapping as FormDetailPageActionMapping, defaultState as formDetail } from '../pages/form/detail/state/reducers';
import { mapping as CommitDetailPageActionMapping, defaultState as commitDetail } from '../pages/commit/detail/state/reducers';
import { mapping as CommitListPageActionMapping, defaultState as commitList } from '../pages/commit/list/state/reducers';
import { mapping as NotificationListPageActionMapping, defaultState as notificationList } from '../pages/notification/list/state/reducers';
import { mapping as ReportListPageActionMapping, defaultState as reportList } from '../pages/report/list/state/reducers';
import { mapping as ReportDetailPageActionMapping, defaultState as reportDetail } from '../pages/report/detail/state/reducers';
import { mapping as ViewReportPageActionMapping, defaultState as viewReportDetail } from '../pages/report/viewer/state/reducers';
import { PageState } from './types';
import {
  SetActiveMenuAction,
  SET_ACTIVE_MENU_ID,
  LoadNotificationUpdateAction,
  LOAD_NOTIFICATION_UPDATE,
} from './actions';

const mapping = {
  ...DataSourceListPageActionMapping,
  ...DataSourceDetailPageActionMapping,
  ...TemplateListPageActionMapping,
  ...TemplateDetailPageActionMapping,
  ...FormListPageActionMapping,
  ...FormDetailPageActionMapping,
  ...CommitDetailPageActionMapping,
  ...CommitListPageActionMapping,
  ...NotificationListPageActionMapping,
  ...ReportListPageActionMapping,
  ...ReportDetailPageActionMapping,
  ...ViewReportPageActionMapping,
};

export const defaultPageState = {
  dataSourceList,
  dataSourceDetail,
  templateList,
  templateDetail,
  formList,
  formDetail,
  commitDetail,
  commitList,
  notificationList,
  reportList,
  reportDetail,
  viewReportDetail,
};

export const authenticationReducer = (state = {}) => state;

export const pageReducer = (state: PageState = defaultPageState, action: any) => {
  const { type } = action;
  if (type === '@@router/LOCATION_CHANGE') return defaultPageState;
  const handler = mapping[type];
  if (!handler) return state;
  return handler(state, action);
};

export const navigationReducer = (state = {}, action: SetActiveMenuAction) => {
  const { type } = action;
  switch (type) {
    case SET_ACTIVE_MENU_ID:
      return ({
        ...state,
        activeMenuId: action.menuId,
      });
      break;
  }
  return state;
};

export const notificationUpdateReducer = (state = {}, action: LoadNotificationUpdateAction) => {
  const { type } = action;
  switch (type) {
    case LOAD_NOTIFICATION_UPDATE:
      return ({
        ...state,
        ...action.notificationUpdate,
      });
      break;
  }
  return state;
};
