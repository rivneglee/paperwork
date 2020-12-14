import {
  AUTHENTICATE,
} from '../intents';

const MemoryMapping = {
  [AUTHENTICATE]: () => '/token',
};

export default MemoryMapping;
