import { createSelector } from 'reselect';

import { CommitDetailPageState } from './reducers';
import { getPageSection } from '../../../../store/selectors';

const getPage = createSelector(
  getPageSection,
  page => page.commitDetail,
);

export const getCommitDetail = createSelector(
  getPage,
  (page: CommitDetailPageState) => {
    const { commit } = page;
    const { values = {}, items = {} } = commit;
    const newItems = Object.values(items).reduce((acc, current) => (
    {
      ...acc,
      [current.id]: {
        ...current,
        value: values[current.id] ? values[current.id] : current.value,
      },
    }), {});
    return {
      ...commit,
      items: newItems,
    };
  },
);

export const getSucceedMessage = createSelector(
  getPage,
  (page: CommitDetailPageState) => page.succeedMessage,
);
