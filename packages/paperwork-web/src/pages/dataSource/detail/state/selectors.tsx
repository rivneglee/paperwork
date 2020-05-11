import { createSelector } from 'reselect';

import { DataSourceDetailPageState } from './reducers';
import { getAuthentication, getPageSection } from '../../../../store/selectors';

const getPage = createSelector(
  getPageSection,
  page => page.dataSourceDetail,
);

export const getDataSourceDetail = createSelector(
  getPage,
  (page: DataSourceDetailPageState) => page.data,
);

export const getIsPageEdited = createSelector(
  getPage,
  page => page.isPageEdited,
);

export const getGrantField = createSelector(
  getPage,
  getDataSourceDetail,
  (page, dataSource) => {
    if (page.editingGrantsField) {
      return dataSource.fields.find(({ id }) => id === page.editingGrantsField);
    }
    return null;
  },
);

export const getIsOwner = createSelector(
  getDataSourceDetail,
  getAuthentication,
  (dataSource, auth) => {
    if (!auth) return false;
    const { user } = auth;
    const { owner } = dataSource;
    return owner === user.id || owner === '';
  },
);
