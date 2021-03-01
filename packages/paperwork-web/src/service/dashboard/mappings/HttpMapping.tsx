import { LOAD_REMINDER, LOAD_TREND } from '../intents';
import { Request } from '../../../integration';

const HttpMapping = {
  [LOAD_REMINDER]: ({ urlParams }: Request) => (
    `/api/${urlParams.userId}/dashboard/reminder`
  ),
  [LOAD_TREND]: ({ urlParams }: Request) => (
    `/api/${urlParams.userId}/dashboard/trend`
  ),
};

export default HttpMapping;
