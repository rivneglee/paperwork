import { Commit } from '../../../../schema/Commit';
import { PageState } from '../../../../store';
import { Pagination } from '../../../../schema/Pagination';
import { LoadCommitListAction, LOAD_COMMIT_LIST, UPDATE_FILTER_OPTION, UpdateFilterOptionAction } from './actions';
import { FilterOptions } from '../components/CommitListPage';

export interface CommitListPageState {
  entries: Commit[];
  pagination: Pagination;
  filterOptions: FilterOptions;
}

export const defaultState: CommitListPageState = {
  entries: [],
  pagination: { page: 0, total: 0 },
  filterOptions: {},
};

const loadCommitList = (
  state: PageState,
  action: LoadCommitListAction,
) => {
  const { pagination } = action.data;
  const { page } = pagination;
  if (page > 1) {
    return {
      ...state,
      commitList: {
        ...state.commitList,
        entries: [
          ...state.commitList.entries,
          ...action.data.entries,
        ],
        pagination: action.data.pagination,
      },
    };
  }
  return ({
    ...state,
    commitList: {
      ...state.commitList,
      ...action.data,
    },
  });
};

const updateFilterOption = (
  state: PageState,
  action: UpdateFilterOptionAction,
) => ({
  ...state,
  commitList: {
    ...state.commitList,
    filterOptions: {
      ...state.commitList.filterOptions,
      [action.key]: action.value,
    },
  },
});

export const mapping = {
  [LOAD_COMMIT_LIST]: loadCommitList,
  [UPDATE_FILTER_OPTION]: updateFilterOption,
};
