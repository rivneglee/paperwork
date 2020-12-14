import { Request } from '../../../integration/types';

import {
  CREATE_FORM,
  LOAD_FORM_LIST,
  LOAD_FORM_DETAIL,
  UPDATE_FORM,
  DELETE_FORM,
} from '../intents';

const HttpMapping = {
  [CREATE_FORM]: ({ urlParams }: Request) => `/api/${urlParams.userId}/forms`,
  [LOAD_FORM_LIST]: ({ urlParams }: Request) => `/api/${urlParams.userId}/forms`,
  [LOAD_FORM_DETAIL]: ({ urlParams }: Request) => `/api/${urlParams.userId}/forms/${urlParams.formId}`,
  [UPDATE_FORM]: ({ urlParams }: Request) => `/api/${urlParams.userId}/forms/${urlParams.formId}`,
  [DELETE_FORM]: ({ urlParams }: Request) => `/api/${urlParams.userId}/forms/${urlParams.formId}`,
};

export default HttpMapping;
