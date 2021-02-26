import { LOAD_REMINDER, LOAD_TREND } from '../intents';
import reminderResponse from './data/reminderResponse.json';
import trendResponse from './data/trendResponse.json';

const MemoryMapping = {
  [LOAD_REMINDER]: () => reminderResponse,
  [LOAD_TREND]: () => trendResponse,
};

export default MemoryMapping;
