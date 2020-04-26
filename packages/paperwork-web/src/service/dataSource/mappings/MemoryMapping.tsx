import {
  LOAD_DATASOURCE_LIST,
} from '../intents';
import loadDataSource from './data/loadDataSource.json';

const MemoryMapping = {
  [LOAD_DATASOURCE_LIST]: () => loadDataSource,
};

export default MemoryMapping;
