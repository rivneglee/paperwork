import {
  LOAD_DATASOURCE_LIST,
  LOAD_DATASOURCE_DETAIL,
  UPDATE_DATASOURCE,
  CREATE_DATASOURCE,
} from '../intents';
import loadDataSource from './data/loadDataSource.json';
import loadDataSourceDetail from './data/loadDataSourceDetail.json';
import { ListOptions } from '../ListProvider';

const MemoryMapping = {
  [LOAD_DATASOURCE_LIST]: ({ params }: { params: ListOptions }) => {
    const { keyword = '' } = params;
    if (params.keyword) {
      return loadDataSource.filter(({ name }) => name.indexOf(keyword) !== -1);
    }
    return loadDataSource;
  },
  [LOAD_DATASOURCE_DETAIL]: () => loadDataSourceDetail,
  [UPDATE_DATASOURCE]: ({ content }: any) => {
    console.log(content);
  },
  [CREATE_DATASOURCE]: () => {},
};

export default MemoryMapping;
