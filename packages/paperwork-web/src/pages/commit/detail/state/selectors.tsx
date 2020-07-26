import { createSelector } from 'reselect';
import { FormMode } from '@paperwork/ui-widgets';

import { CommitDetailPageState } from './reducers';
import { getPageSection } from '../../../../store/selectors';
import { CommitDetail } from '../../../../schema/Commit';

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

export const getFormMode = createSelector(
  getCommitDetail,
  (commit: CommitDetail) => commit.id ? FormMode.READONLY : FormMode.EDIT,
);
