import {
  LOAD_COLLABORATOR_LIST,
} from '../intents';
import loadCollaborators from './data/loadCollaborators.json';
import { ListOptions } from '../ListProvider';

const MemoryMapping = {
  [LOAD_COLLABORATOR_LIST]: ({ params }: { params: ListOptions }) => {
    const { keyword = '' } = params;
    if (params.keyword) {
      return loadCollaborators.filter(({ displayName }) => displayName.indexOf(keyword) !== -1);
    }
    return [];
  },
};

export default MemoryMapping;
