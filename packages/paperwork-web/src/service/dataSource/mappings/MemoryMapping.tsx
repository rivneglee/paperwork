import {
  LOAD_DATASOURCE_LIST,
  LOAD_DATASOURCE_DETAIL,
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
};

export default MemoryMapping;
