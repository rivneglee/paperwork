import { FormList } from '../../../../schema/Form';
import { FilterOption } from '../components/FormListPage';

export const LOAD_FORM_LIST = 'FORM_LIST_LOAD_FORM_LIST';

export const UPDATE_FILTER_OPTION = 'FORM_LIST_UPDATE_FILTER_OPTION';

export interface LoadFormListAction {
  data: FormList;
}

export interface UpdateFilterOptionAction extends FilterOption {
  type: string;
}

export const createLoadFormListAction = (data: FormList) => ({
  data,
  type: LOAD_FORM_LIST,
});

export const createUpdateFilterOptionAction = (option: FilterOption): UpdateFilterOptionAction => {
  return {
    ...option,
    type: UPDATE_FILTER_OPTION,
  };
};
