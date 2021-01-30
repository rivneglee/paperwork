import {
  LOAD_DATASOURCE_LIST,
  LOAD_DATASOURCE_DETAIL,
  DELETE_DATASOURCE,
  CREATE_DATASOURCE,
  UPDATE_DATASOURCE,
} from '../intents';
import { Request } from '../../../integration';
const HttpMapping = {
  [LOAD_DATASOURCE_LIST]: ({ urlParams }: Request) => `/api/${urlParams.userId}/datasources`,
  [CREATE_DATASOURCE]: ({ urlParams }: Request) => `/api/${urlParams.userId}/datasources`,
  [LOAD_DATASOURCE_DETAIL]: ({ urlParams }: Request) => `/api/${urlParams.userId}/datasources/${urlParams.dataSourceId}`,
  [UPDATE_DATASOURCE]: ({ urlParams }: Request) => `/api/${urlParams.userId}/datasources/${urlParams.dataSourceId}`,
  [DELETE_DATASOURCE]: ({ urlParams }: Request) => `/api/${urlParams.userId}/datasources/${urlParams.dataSourceId}`,
};

export default HttpMapping;
