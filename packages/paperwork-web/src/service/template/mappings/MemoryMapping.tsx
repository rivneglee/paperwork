import {
  LOAD_TEMPLATE_LIST,
} from '../intents';
import loadTemplateList from './data/loadTemplateList.json';

const MemoryMapping = {
  [LOAD_TEMPLATE_LIST]: () => loadTemplateList,
};

export default MemoryMapping;
