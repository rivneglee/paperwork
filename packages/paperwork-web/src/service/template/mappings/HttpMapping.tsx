import { Request } from '../../../integration/types';

import {
  LOAD_TEMPLATE_LIST,
  LOAD_TEMPLATE_DETAIL,
  CREATE_TEMPLATE,
  UPDATE_TEMPLATE,
  DELETE_TEMPLATE,
} from '../intents';

const HttpMapping = {
  [LOAD_TEMPLATE_LIST]: ({ urlParams }: Request) => `/api/${urlParams.userId}/templates`,
  [CREATE_TEMPLATE]: ({ urlParams }: Request) => `/api/${urlParams.userId}/templates`,
  [LOAD_TEMPLATE_DETAIL]: ({ urlParams }: Request) => `/api/${urlParams.userId}/templates/${urlParams.templateId}`,
  [UPDATE_TEMPLATE]: ({ urlParams }: Request) => `/api/${urlParams.userId}/templates/${urlParams.templateId}`,
  [DELETE_TEMPLATE]: ({ urlParams }: Request) => `/api/${urlParams.userId}/templates/${urlParams.templateId}`,
};

export default HttpMapping;
