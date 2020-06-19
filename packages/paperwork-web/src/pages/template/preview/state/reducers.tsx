import { LayoutNodeTypes } from '@paperwork/ui-widgets';
import { TemplateDetail } from '../../../../schema/Template';
import { LOAD_TEMPLATE_DETAIL, LoadTemplateDetailAction } from './actions';
import { PageState } from '../../../../store';
import { PaperType } from '../../../../schema/Paper';

export interface TemplatePreviewPageState {
  template: TemplateDetail;
}

export const defaultState: TemplatePreviewPageState = {
  template: {
    id: '',
    name: '',
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
      { id: 'page', childRefs: [], type: LayoutNodeTypes.PAGE },
    ],
    items: {},
  },
};

const loadTemplateDetail = (
  state: PageState,
  action: LoadTemplateDetailAction,
) => ({
  ...state,
  templatePreview: {
    ...state.templatePreview,
    template: action.template,
  },
});

export const mapping = {
  [LOAD_TEMPLATE_DETAIL]: loadTemplateDetail,
};
