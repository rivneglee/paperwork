import { Commit } from '../../../../schema/Commit';
import { PageState } from '../../../../store';
import { Pagination } from '../../../../schema/Pagination';
import { LoadCommitListAction, LOAD_COMMIT_LIST, UPDATE_FILTER_OPTION, UpdateFilterOptionAction } from './actions';
import { FilterOptions } from '../components/CommitListPage';

export interface UserCommitListPageState {
  entries: Commit[];
  pagination: Pagination;
  filterOptions: FilterOptions;
}

export const defaultState: UserCommitListPageState = {
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
      userCommitList: {
        ...state.userCommitList,
        entries: [
          ...state.userCommitList.entries,
          ...action.data.entries,
        ],
        pagination: action.data.pagination,
      },
    };
  }
  return ({
    ...state,
    userCommitList: {
      ...state.userCommitList,
      ...action.data,
    },
  });
};

const updateFilterOption = (
  state: PageState,
  action: UpdateFilterOptionAction,
) => ({
  ...state,
  userCommitList: {
    ...state.userCommitList,
    filterOptions: {
      ...state.userCommitList.filterOptions,
      [action.key]: action.value,
    },
  },
});

export const mapping = {
  [LOAD_COMMIT_LIST]: loadCommitList,
  [UPDATE_FILTER_OPTION]: updateFilterOption,
};
