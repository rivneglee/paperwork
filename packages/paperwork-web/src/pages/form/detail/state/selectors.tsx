import { createSelector } from 'reselect';

import { RouterState } from 'connected-react-router';
import { FormDetailPageState } from './reducers';
import { getPageSection, getRoutingState } from '../../../../store/selectors';
import { Scope } from '../../../../schema/Form';

const getPage = createSelector(
  getPageSection,
  page => page.formDetail,
);

export const getIsCreatingDefaultDs = createSelector(
  getRoutingState,
  (routing: RouterState) => (
    routing.location.search && routing.location.search.indexOf('withDefaultDs=true') !== -1
  ),
);

export const getFormDetail = createSelector(
  getPage,
  getIsCreatingDefaultDs,
  (page: FormDetailPageState, isCreatingDefaultDs) => {
    const newItems = Object.values(page.form.items).reduce((acc, current) => {
      let newItem = current;
      if (current.itemType !== 'text' && isCreatingDefaultDs && !current.creatingDataSource) {
        newItem = {
          ...current,
          creatingDataSource: {},
        };
      }
      return {
        ...acc,
        [current.id]: newItem,
      };
    }, {});
    return {
      ...page.form,
      items: newItems,
    };
  },
);

export const getIsPageEdited = createSelector(
  getPage,
  page => page.isPageEdited,
);

export const getIsPublic = createSelector(
  getFormDetail,
  form => form.scope === Scope.PUBLIC,
);
