import { TemplateList } from '../../../../schema/Template';
import { LOAD_TEMPLATE_LIST, LoadTemplateListAction } from './actions';
import { PageState } from '../../../../store';

export interface TemplateListPageState {
  entries: TemplateList;
}

export const defaultState: TemplateListPageState = {
  entries: [],
};

const loadTemplateList = (
  state: PageState,
  action: LoadTemplateListAction,
) => ({
  ...state,
  templateList: {
    ...state.templateList,
    entries: action.data || [],
  },
});

export const mapping = {
  [LOAD_TEMPLATE_LIST]: loadTemplateList,
};
