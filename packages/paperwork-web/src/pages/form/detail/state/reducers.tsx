import { LayoutNodeTypes } from '@paperwork/ui-widgets';
import { FormDetail, Scope, Status } from '../../../../schema/Form';
import { PageState } from '../../../../store';
import { LOAD_FORM_DETAIL, LoadFormDetailAction, UPDATE_FORM, UpdateFormAction } from './actions';

export interface FormDetailPageState {
  form: FormDetail;
  isPageEdited: boolean;
}

export const defaultState: FormDetailPageState = {
  form: {
    id: '',
    name: 'New Form',
    author: {
      id: '',
      displayName: '',
      username: '',
    },
    heroImage: '',
    theme: undefined,
    layout: [
      { id: 'page', childRefs: [], type: LayoutNodeTypes.PAGE },
    ],
    items: {},
    status: Status.OPEN,
    scope: Scope.PRIVATE,
    createdAt: '',
    closeDate: undefined,
    targetCommits: undefined,
    maxCommits: undefined,
    receivedCommits: 0,
    succeedMessage: {},
    participates: [],
  },
  isPageEdited: false,
};

const loadFormDetail = (
  state: PageState,
  action: LoadFormDetailAction,
) => ({
  ...state,
  formDetail: {
    ...state.formDetail,
    form: action.form,
  },
});

const updateFormLayout = (
  state: PageState,
  action: UpdateFormAction,
) => ({
  ...state,
  formDetail: {
    ...state.formDetail,
    isPageEdited: true,
    form: {
      ...state.formDetail.form,
      ...action.props,
    },
  },
});

export const mapping = {
  [LOAD_FORM_DETAIL]: loadFormDetail,
  [UPDATE_FORM]: updateFormLayout,
};
