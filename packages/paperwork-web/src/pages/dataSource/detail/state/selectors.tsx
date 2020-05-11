import { createSelector } from 'reselect';

import { DataSourceDetailPageState } from './reducers';
import { getPageSection } from '../../../../store/selectors';

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
