import { TemplateList } from '../../../../schema/Template';

export const LOAD_TEMPLATE_LIST = 'TEMPLATE_LIST_LOAD_TEMPLATE_LIST';

export interface LoadTemplateListAction {
  data: TemplateList;
}

export const createLoadTemplateListAction = (data: TemplateList) => ({
  data,
  type: LOAD_TEMPLATE_LIST,
});
