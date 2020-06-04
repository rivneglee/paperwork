import { createSelector } from 'reselect';

import { TemplateDetailPageState } from './reducers';
import { getPageSection } from '../../../../store/selectors';

const getPage = createSelector(
  getPageSection,
  page => page.templateDetail,
);

export const getTemplateDetail = createSelector(
  getPage,
  (page: TemplateDetailPageState) => page.template,
);

export const getIsPageEdited = createSelector(
  getPage,
  page => page.isPageEdited,
);
