import { TemplateList } from '../../../../schema/Template';
import { FilterOption } from '../components/TemplateListPage';

export const LOAD_TEMPLATE_LIST = 'TEMPLATE_LIST_LOAD_TEMPLATE_LIST';

export const UPDATE_FILTER_OPTION = 'TEMPLATE_LIST_UPDATE_FILTER_OPTION';

export interface LoadTemplateListAction {
  data: TemplateList;
}

export interface UpdateFilterOptionAction extends FilterOption {
  type: string;
}

export const createLoadTemplateListAction = (data: TemplateList) => ({
  data,
  type: LOAD_TEMPLATE_LIST,
});

export const createUpdateFilterOptionAction = (option: FilterOption): UpdateFilterOptionAction => {
  return {
    ...option,
    type: UPDATE_FILTER_OPTION,
  };
};
