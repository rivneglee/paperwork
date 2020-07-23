import {
  LOAD_COMMIT_DETAIL,
  CREATE_COMMIT,
} from '../intents';
import loadFormDetail from './data/loadFormDetail.json';
import commitResponse from './data/commitResponse.json';

const MemoryMapping = {
  [LOAD_COMMIT_DETAIL]: () => loadFormDetail,
  [CREATE_COMMIT]: () => Promise.resolve(commitResponse),
};

export default MemoryMapping;
