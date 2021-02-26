import { LOAD_REMINDER, LOAD_TREND } from '../intents';
import { Request } from '../../../integration';

const HttpMapping = {
  [LOAD_REMINDER]: ({ urlParams }: Request) => (
    `/api/dashboard/${urlParams.userId}/reminder`
  ),
  [LOAD_TREND]: ({ urlParams }: Request) => (
    `/api/dashboard/${urlParams.userId}/trend`
  ),
};

export default HttpMapping;
