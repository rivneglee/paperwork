import { LayoutNodeTypes } from '@paperwork/ui-widgets';
import { TemplateDetail } from '../../../../schema/Template';
import { LOAD_TEMPLATE_DETAIL, LoadTemplateDetailAction, UPDATE_TEMPLATE, UpdateTemplateAction } from './actions';
import { PageState } from '../../../../store';
import { PaperType } from '../../../../schema/Paper';

export interface TemplateDetailPageState {
  template: TemplateDetail;
  isPageEdited: boolean;
}

export const defaultState: TemplateDetailPageState = {
  template: {
    id: '',
    name: 'New Template',
    author: {
      id: '',
      displayName: '',
      username: '',
    },
    heroImage: '',
    theme: undefined,
    type: PaperType.FORM,
    visibility: 'private',
    tags: [],
    layout: [
      { id: 'page', childRefs: ['list1', 'list2'], type: LayoutNodeTypes.PAGE },
    ],
    items: {},
  },
  isPageEdited: false,
};

const loadTemplateDetail = (
  state: PageState,
  action: LoadTemplateDetailAction,
) => ({
  ...state,
  templateDetail: {
    ...state.templateDetail,
    template: action.template,
  },
});

const updateTemplateLayout = (
  state: PageState,
  action: UpdateTemplateAction,
) => ({
  ...state,
  templateDetail: {
    ...state.templateDetail,
    template: {
      ...state.templateDetail.template,
      ...action.props,
    },
  },
});

export const mapping = {
  [LOAD_TEMPLATE_DETAIL]: loadTemplateDetail,
  [UPDATE_TEMPLATE]: updateTemplateLayout,
};
