import {
  LOAD_NOTIFICATION_LIST,
  CHECK_NOTIFICATION_UPDATE,
  SET_READ_STATE,
} from '../intents';
import loadNotificationList from './data/loadNotificationList.json';
import checkNotificationUpdate from './data/checkNotificationUpdate.json';

const MemoryMapping = {
  [LOAD_NOTIFICATION_LIST]: ({ params }: any) => {
    const { keyword = '' } = params;
    const { pagination, entries } = loadNotificationList;
    const filteredEntries = entries
      .map((entry, id) => ({ ...entry, id }))
      .filter(entry => entry.subject.indexOf(keyword) !== -1);
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
  [CHECK_NOTIFICATION_UPDATE]: () => checkNotificationUpdate,
  [SET_READ_STATE]: () => {},
};

export default MemoryMapping;
