import {
  LOAD_TEMPLATE_LIST,
  LOAD_TEMPLATE_DETAIL,
  DELETE_TEMPLATE,
  UPDATE_TEMPLATE,
  CREATE_TEMPLATE,
} from '../intents';
import loadTemplateList from './data/loadTemplateList.json';
import loadTemplateDetail from './data/loadTemplateDetail.json';

const MemoryMapping = {
  [LOAD_TEMPLATE_LIST]: ({ params }: any) => {
    const { keyword = '' } = params;
    const { pagination, entries } = loadTemplateList;
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
  [LOAD_TEMPLATE_DETAIL]: () => loadTemplateDetail,
  [UPDATE_TEMPLATE]: () => {},
  [CREATE_TEMPLATE]: () => {},
  [DELETE_TEMPLATE]: () => {},
};

export default MemoryMapping;
