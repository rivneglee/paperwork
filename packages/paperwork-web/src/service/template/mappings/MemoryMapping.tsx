import {
  LOAD_TEMPLATE_LIST,
} from '../intents';
import loadTemplateList from './data/loadTemplateList.json';

const MemoryMapping = {
  [LOAD_TEMPLATE_LIST]: ({ params }: any) => {
    return ({
      ...loadTemplateList,
      pagination: {
        ...loadTemplateList.pagination,
        page: params.page + 1,
      },
    });
  },
};

export default MemoryMapping;
