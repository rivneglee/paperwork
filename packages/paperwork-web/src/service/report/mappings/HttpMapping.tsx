import { Request } from '../../../integration/types';

import {
  LOAD_REPORT_LIST,
  CREATE_REPORT,
  LOAD_REPORT_DETAIL,
  UPDATE_REPORT,
  DELETE_REPORT,
} from '../intents';

const HttpMapping = {
  [LOAD_REPORT_LIST]: ({ urlParams }: Request) => `/api/${urlParams.userId}/reports`,
  [CREATE_REPORT]: ({ urlParams }: Request) => `/api/${urlParams.userId}/reports`,
  [LOAD_REPORT_DETAIL]: ({ urlParams }: Request) => `/api/${urlParams.userId}/reports/${urlParams.reportId}`,
  [UPDATE_REPORT]: ({ urlParams }: Request) => `/api/${urlParams.userId}/reports/${urlParams.reportId}`,
  [DELETE_REPORT]: ({ urlParams }: Request) => `/api/${urlParams.userId}/reports/${urlParams.reportId}`,
};

export default HttpMapping;
