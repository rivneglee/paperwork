import { createSelector } from 'reselect';

import { getPageSection } from '../../../../store/selectors';

export const getPage = createSelector(
  getPageSection,
  page => page.templateList,
);
