import { SucceedMessage } from '../../../../schema/Form';
import { CommitDetail } from '../../../../schema/Commit';

export const LOAD_COMMIT_DETAIL = 'COMMIT_DETAIL_LOAD_COMMIT';
export const UPDATE_ITEM_VALUE = 'FORM_VIEWER_UPDATE_INPUT_VALUE';
export const SET_SUCCESS_MESSAGE = 'FORM_VIEWER_SET_SUCCESS_MESSAGE';

export interface LoadCommitDetailAction {
  commit: CommitDetail;
  type: string;
}

export const createLoadCommitDetailAction = (commit: CommitDetail): LoadCommitDetailAction => {
  return {
    commit,
    type: LOAD_COMMIT_DETAIL,
  };
};

export interface UpdateInputValueAction {
  itemId: string;
  value: any;
  type: string;
}

export const createUpdateItemValueAction = (itemId: string, value: any): UpdateInputValueAction => {
  return {
    itemId,
    value,
    type: UPDATE_ITEM_VALUE,
  };
};

export interface SetSucceedMessageAction {
  type: string;
  succeedMessage: SucceedMessage;
}

export const createSetSucceedMessageAction = (succeedMessage: SucceedMessage): SetSucceedMessageAction => {
  return {
    succeedMessage,
    type: SET_SUCCESS_MESSAGE,
  };
};
