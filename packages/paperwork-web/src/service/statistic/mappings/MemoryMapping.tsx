import {
  QUERY_COMMITS,
} from '../intents';
import queryCommitsResponse from './data/queryCommitsResponse.json';

const MemoryMapping = {
  [QUERY_COMMITS]: () => queryCommitsResponse,
};

export default MemoryMapping;
