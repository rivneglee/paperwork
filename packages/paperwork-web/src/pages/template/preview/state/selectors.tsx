import { createSelector } from 'reselect';

import { TemplatePreviewPageState } from './reducers';
import { getPageSection, getRoutingState } from '../../../../store/selectors';
import { RouterState } from 'connected-react-router';

const getPage = createSelector(
  getPageSection,
  page => page.templatePreview,
);

export const getTemplateDetail = createSelector(
  getPage,
  (page: TemplatePreviewPageState) => page.template,
);

export const getIsThumbnail = createSelector(
  getRoutingState,
  (router: RouterState) => (
    router.location.search && router.location.search.includes('thumbnail=true')
  ),
);
