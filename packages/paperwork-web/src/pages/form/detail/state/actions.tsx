import { FormDetail } from '../../../../schema/Form';

export const LOAD_FORM_DETAIL = 'FORM_DETAIL_LOAD_FORM';
export const UPDATE_FORM = 'FORM_DETAIL_UPDATE_FORM';

export interface LoadFormDetailAction {
  form: FormDetail;
  type: string;
}

export interface UpdateFormAction {
  props: FormDetail;
  type: string;
}

export const createLoadFormDetailAction = (form: FormDetail): LoadFormDetailAction => {
  return {
    form,
    type: LOAD_FORM_DETAIL,
  };
};

export const createUpdateFormAction = (props: FormDetail): UpdateFormAction => {
  return {
    props,
    type: UPDATE_FORM,
  };
};
