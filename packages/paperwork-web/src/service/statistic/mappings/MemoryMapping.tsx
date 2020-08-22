import {
  QUERY_COMMITS,
} from '../intents';
import queryCommitsResponse from './data/queryCommitsResponse.json';

const MemoryMapping = {
  [QUERY_COMMITS]: ({ params }: any) => {
    const { pagination, entries } = queryCommitsResponse;
    return {
      entries,
      pagination: {
        total: pagination.total,
        page: params.page || pagination.page,
      },
    };
  },
};

export default MemoryMapping;
