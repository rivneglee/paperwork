import {
  AUTHENTICATE,
} from '../intents';
import authentication from './data/authentication.json';

const MemoryMapping = {
  [AUTHENTICATE]: () => authentication,
};

export default MemoryMapping;
