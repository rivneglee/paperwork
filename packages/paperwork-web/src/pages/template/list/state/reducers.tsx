import { Template } from '../../../../schema/Template';
import { Pagination } from '../../../../schema/Pagination';
import { LOAD_TEMPLATE_LIST, LoadTemplateListAction } from './actions';
import { PageState } from '../../../../store';

export interface TemplateListPageState {
  entries: Template[];
  pagination: Pagination;
}

export const defaultState: TemplateListPageState = {
  entries: [],
  pagination: { page: 0, total: 0 },
};

const loadTemplateList = (
  state: PageState,
  action: LoadTemplateListAction,
) => {
  const { pagination } = action.data;
  const { page } = pagination;
  if (page > 1) {
    return {
      ...state,
      templateList: {
        ...state.templateList,
        entries: [
          ...state.templateList.entries,
          ...action.data.entries,
        ],
        pagination: action.data.pagination,
      },
    };
  }
  return ({
    ...state,
    templateList: {
      ...state.templateList,
      ...action.data,
    },
  });
};

export const mapping = {
  [LOAD_TEMPLATE_LIST]: loadTemplateList,
};
