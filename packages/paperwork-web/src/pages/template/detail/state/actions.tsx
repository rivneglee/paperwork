import { TemplateDetail } from '../../../../schema/Template';

export const LOAD_TEMPLATE_DETAIL = 'TEMPLATE_DETAIL_LOAD_TEMPLATE';
export const UPDATE_TEMPLATE = 'TEMPLATE_DETAIL_UPDATE_TEMPLATE';

export interface LoadTemplateDetailAction {
  template: TemplateDetail;
  type: string;
}

export interface UpdateTemplateAction {
  props: TemplateDetail;
  type: string;
}

export const createLoadTemplateDetailAction = (template: TemplateDetail): LoadTemplateDetailAction => {
  return {
    template,
    type: LOAD_TEMPLATE_DETAIL,
  };
};

export const createUpdateTemplateAction = (props: TemplateDetail): UpdateTemplateAction => {
  return {
    props,
    type: UPDATE_TEMPLATE,
  };
};
