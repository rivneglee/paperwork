import { Request } from '../../../integration/types';

import {
  CHECK_NOTIFICATION_UPDATE,
  LOAD_NOTIFICATION_LIST,
} from '../intents';

const HttpMapping = {
  [CHECK_NOTIFICATION_UPDATE]: ({ urlParams }: Request) => `/api/${urlParams.userId}/notifications/unreads`,
  [LOAD_NOTIFICATION_LIST]: ({ urlParams }: Request) => `/api/${urlParams.userId}/notifications`,
};

export default HttpMapping;
