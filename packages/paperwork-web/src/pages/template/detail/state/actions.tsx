import { FormProps } from '@paperwork/ui-widgets';

import { TemplateDetail } from '../../../../schema/Template';

export const LOAD_TEMPLATE_DETAIL = 'TEMPLATE_DETAIL_LOAD_TEMPLATE';
export const UPDATE_TEMPLATE = 'TEMPLATE_DETAIL_UPDATE_TEMPLATE';

export interface LoadTemplateDetailAction {
  template: TemplateDetail;
  type: string;
}

export interface UpdateTemplateAction {
  props: FormProps;
  type: string;
}

export const createLoadTemplateDetailAction = (template: TemplateDetail): LoadTemplateDetailAction => {
  return {
    template,
    type: LOAD_TEMPLATE_DETAIL,
  };
};

export const createUpdateTemplateAction = (props: FormProps): UpdateTemplateAction => {
  return {
    props,
    type: UPDATE_TEMPLATE,
  };
};
