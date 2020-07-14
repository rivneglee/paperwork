import { createSelector } from 'reselect';

import { FormDetailPageState } from './reducers';
import { getPageSection } from '../../../../store/selectors';

const getPage = createSelector(
  getPageSection,
  page => page.formDetail,
);

export const getFormDetail = createSelector(
  getPage,
  (page: FormDetailPageState) => page.form,
);

export const getIsPageEdited = createSelector(
  getPage,
  page => page.isPageEdited,
);
