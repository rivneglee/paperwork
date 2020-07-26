import {
  LOAD_COMMIT_DETAIL,
  CREATE_COMMIT,
  LOAD_COMMIT_LIST_BY_COMMITTER,
} from '../intents';
import loadNewCommitDetail from './data/loadNewCommitDetail.json';
import loadCommitDetail from './data/loadCommitDetail.json';
import commitResponse from './data/commitResponse.json';
import loadUserCommitList from './data/loadUserCommitList.json';

const MemoryMapping = {
  [LOAD_COMMIT_DETAIL]: ({ urlParams }: any) => {
    if (urlParams.commitId === 'new') {
      return loadNewCommitDetail;
    }
    return loadCommitDetail;
  },
  [CREATE_COMMIT]: () => Promise.resolve(commitResponse),
  [LOAD_COMMIT_LIST_BY_COMMITTER]: ({ params }: any) => {
    const { keyword = '' } = params;
    const { pagination, entries } = loadUserCommitList;
    const filteredEntries = entries.filter(entry => entry.name.indexOf(keyword) !== -1);
    const page = filteredEntries.length === 0 ? 0 : params.page + 1;
    return ({
      entries: filteredEntries,
      pagination: {
        ...pagination,
        page,
        total: filteredEntries.length > 0 ? pagination.total : 0,
      },
    });
  },
};

export default MemoryMapping;
