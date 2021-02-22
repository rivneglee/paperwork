import {
  QUERY_COMMITS, EXPORT_CSV,
} from '../intents';

const HttpMapping = {
  [QUERY_COMMITS]: () => (
    '/api/aggregated-commits'
  ),
  [EXPORT_CSV]: () => (
    '/api/aggregated-commits/export/csv'
  ),
};

export default HttpMapping;
