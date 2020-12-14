import {
  LOAD_DATASOURCE_LIST,
  LOAD_DATASOURCE_DETAIL,
} from '../intents';
import { Request } from '../../../integration';
const HttpMapping = {
  [LOAD_DATASOURCE_LIST]: ({ urlParams }: Request) => `/api/${urlParams.userId}/datasources`,
  [LOAD_DATASOURCE_DETAIL]: ({ urlParams }: Request) => `/api/${urlParams.userId}/datasources/${urlParams.dataSourceId}`,
};

export default HttpMapping;
