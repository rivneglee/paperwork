import { LayoutNodeTypes } from '@paperwork/ui-widgets';
import { SucceedMessage } from '../../../../schema/Form';
import { PageState } from '../../../../store';
import {
  LOAD_COMMIT_DETAIL,
  LoadCommitDetailAction,
  UPDATE_ITEM_VALUE,
  UpdateInputValueAction,
  SET_SUCCESS_MESSAGE,
  SetSucceedMessageAction,
} from './actions';
import { CommitDetail } from '../../../../schema/Commit';

export interface CommitDetailPageState {
  commit: CommitDetail;
  succeedMessage?: SucceedMessage;
}

export const defaultState: CommitDetailPageState = {
  commit: {
    id: '',
    sourceFormId: '',
    name: 'New Form',
    theme: undefined,
    layout: [
      { id: 'page', childRefs: [], type: LayoutNodeTypes.PAGE },
    ],
    items: {},
    values: {},
  },
};

const loadCommitDetail = (
  state: PageState,
  action: LoadCommitDetailAction,
) => ({
  ...state,
  commitDetail: {
    ...state.commitDetail,
    commit: action.commit,
  },
});

const updateItemValue = (
  state: PageState,
  action: UpdateInputValueAction,
) => ({
  ...state,
  commitDetail: {
    ...state.commitDetail,
    commit: {
      ...state.commitDetail.commit,
      values: {
        ...state.commitDetail.commit.values,
        [action.itemId]: action.value,
      },
    },
  },
});

const setSucceedMessage = (
  state: PageState,
  action: SetSucceedMessageAction,
) => ({
  ...state,
  commitDetail: {
    ...state.commitDetail,
    succeedMessage: action.succeedMessage,
  },
});

export const mapping = {
  [LOAD_COMMIT_DETAIL]: loadCommitDetail,
  [UPDATE_ITEM_VALUE]: updateItemValue,
  [SET_SUCCESS_MESSAGE]: setSucceedMessage,
};
