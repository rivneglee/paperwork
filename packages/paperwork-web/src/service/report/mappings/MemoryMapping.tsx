import {
  LOAD_REPORT_LIST,
  LOAD_REPORT_DETAIL,
  UPDATE_REPORT,
  DELETE_REPORT,
  CREATE_REPORT,
} from '../intents';
import loadReportList from './data/loadReportList.json';
import loadReportDetail from './data/loadReportDetail.json';

const MemoryMapping = {
  [LOAD_REPORT_LIST]: ({ params }: any) => {
    const { keyword = '' } = params;
    const { pagination, entries } = loadReportList;
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
  [LOAD_REPORT_DETAIL]: () => loadReportDetail,
  [UPDATE_REPORT]: () => {},
  [CREATE_REPORT]: () => {},
  [DELETE_REPORT]: () => {},
};

export default MemoryMapping;
