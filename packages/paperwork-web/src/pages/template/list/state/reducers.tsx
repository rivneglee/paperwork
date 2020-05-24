import { Template } from '../../../../schema/Template';
import { Pagination } from '../../../../schema/Pagination';
import { LOAD_TEMPLATE_LIST, UPDATE_FILTER_OPTION, LoadTemplateListAction, UpdateFilterOptionAction } from './actions';
import { PageState } from '../../../../store';
import { FilterOptions } from '../components/TemplateListPage';

export interface TemplateListPageState {
  entries: Template[];
  pagination: Pagination;
  filterOptions: FilterOptions;
}

export const defaultState: TemplateListPageState = {
  entries: [],
  pagination: { page: 0, total: 0 },
  filterOptions: {},
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

const updateFilterOption = (
  state: PageState,
  action: UpdateFilterOptionAction,
) => ({
  ...state,
  templateList: {
    ...state.templateList,
    filterOptions: {
      ...state.templateList.filterOptions,
      [action.key]: action.value,
    },
  },
});

export const mapping = {
  [LOAD_TEMPLATE_LIST]: loadTemplateList,
  [UPDATE_FILTER_OPTION]: updateFilterOption,
};
