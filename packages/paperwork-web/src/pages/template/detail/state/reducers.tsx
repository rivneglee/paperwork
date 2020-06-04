import { TemplateDetail } from '../../../../schema/Template';
import { LOAD_TEMPLATE_DETAIL, LoadTemplateDetailAction } from './actions';
import { PageState } from '../../../../store';
import { PaperType } from '../../../../schema/Paper';

export interface TemplateDetailPageState {
  template: TemplateDetail;
  isPageEdited: boolean;
}

export const defaultState: TemplateDetailPageState = {
  template: {
    id: '',
    name: '',
    author: {
      id: '',
      displayName: '',
      username: '',
    },
    heroImage: '',
    themeColor: 'purple',
    type: PaperType.FORM,
    visibility: 'private',
    tags: [],
    layout: [],
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

export const mapping = {
  [LOAD_TEMPLATE_DETAIL]: loadTemplateDetail,
};
