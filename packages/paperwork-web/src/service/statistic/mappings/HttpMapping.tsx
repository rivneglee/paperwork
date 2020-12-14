import {
  QUERY_COMMITS,
} from '../intents';

const HttpMapping = {
  [QUERY_COMMITS]: () => (
    '/api/aggregated-commits'
  ),
};

export default HttpMapping;
