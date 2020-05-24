import {
  LOAD_TEMPLATE_LIST,
} from '../intents';
import loadTemplateList from './data/loadTemplateList.json';

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
};

export default MemoryMapping;
