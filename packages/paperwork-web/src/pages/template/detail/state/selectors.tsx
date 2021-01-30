import { createSelector } from 'reselect';

import { TemplateDetailPageState } from './reducers';
import { getAuthentication, getPageSection } from '../../../../store/selectors';

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

export const getIsPublic = createSelector(
  getPage,
  page => page.template.visibility === 'public',
);

export const getIsReadOnly = createSelector(
  getPage,
  getAuthentication,
  (page, authentication) => (
    (authentication
      && page.template.author.id !== ''
      && page.template.author.id !== authentication.user.id)
  ),
);
