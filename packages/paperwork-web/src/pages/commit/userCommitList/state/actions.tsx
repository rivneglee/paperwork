import { CommitList } from '../../../../schema/Commit';
import { FilterOption } from '../components/CommitListPage';

export const LOAD_COMMIT_LIST = 'USER_COMMIT_LIST_LOAD_COMMIT_LIST';
export const UPDATE_FILTER_OPTION = 'USER_COMMIT_LIST_UPDATE_FILTER_OPTION';

export interface LoadCommitListAction {
  data: CommitList;
}

export const createLoadCommitListAction = (data: CommitList) => ({
  data,
  type: LOAD_COMMIT_LIST,
});

export interface UpdateFilterOptionAction extends FilterOption {
  type: string;
}

export const createUpdateFilterOptionAction = (option: FilterOption): UpdateFilterOptionAction => {
  return {
    ...option,
    type: UPDATE_FILTER_OPTION,
  };
};
