import { Form } from '../../../../schema/Form';
import { Pagination } from '../../../../schema/Pagination';
import { LOAD_FORM_LIST, UPDATE_FILTER_OPTION, LoadFormListAction, UpdateFilterOptionAction } from './actions';
import { PageState } from '../../../../store';
import { FilterOptions } from '../components/FormListPage';

export interface FormListPageState {
  entries: Form[];
  pagination: Pagination;
  filterOptions: FilterOptions;
}

export const defaultState: FormListPageState = {
  entries: [],
  pagination: { page: 0, total: 0 },
  filterOptions: {},
};

const loadFormList = (
  state: PageState,
  action: LoadFormListAction,
) => {
  const { pagination } = action.data;
  const { page } = pagination;
  if (page > 1) {
    return {
      ...state,
      formList: {
        ...state.formList,
        entries: [
          ...state.formList.entries,
          ...action.data.entries,
        ],
        pagination: action.data.pagination,
      },
    };
  }
  return ({
    ...state,
    formList: {
      ...state.formList,
      ...action.data,
    },
  });
};

const updateFilterOption = (
  state: PageState,
  action: UpdateFilterOptionAction,
) => ({
  ...state,
  formList: {
    ...state.formList,
    filterOptions: {
      ...state.formList.filterOptions,
      [action.key]: action.value,
    },
  },
});

export const mapping = {
  [LOAD_FORM_LIST]: loadFormList,
  [UPDATE_FILTER_OPTION]: updateFilterOption,
};
