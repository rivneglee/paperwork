import { TemplateDetail } from '../../../../schema/Template';

export const LOAD_TEMPLATE_DETAIL = 'TEMPLATE_DETAIL_LOAD_TEMPLATE';

export interface LoadTemplateDetailAction {
  template: TemplateDetail;
  type: string;
}

export const createLoadTemplateDetailAction = (template: TemplateDetail): LoadTemplateDetailAction => {
  return {
    template,
    type: LOAD_TEMPLATE_DETAIL,
  };
};
