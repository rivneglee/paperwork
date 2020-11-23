import { Request } from '../../../integration/types';

import {
  LOAD_REPORT_LIST,
} from '../intents';

const HttpMapping = {
  [LOAD_REPORT_LIST]: ({ urlParams }: Request) => `/api/${urlParams.userId}/reports`,
};

export default HttpMapping;
