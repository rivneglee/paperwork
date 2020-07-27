import {
  LOAD_NOTIFICATION_DETAIL,
  LOAD_NOTIFICATION_LIST,
  CHECK_NOTIFICATION_UPDATE,
} from '../intents';
import loadNotificationList from './data/loadNotificationList.json';
import loadNotificationDetail from './data/loadNotificationDetail.json';
import checkNotificationUpdate from './data/checkNotificationUpdate.json';

const MemoryMapping = {
  [LOAD_NOTIFICATION_LIST]: ({ params }: any) => {
    const { keyword = '' } = params;
    const { pagination, entries } = loadNotificationList;
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
  [LOAD_NOTIFICATION_DETAIL]: () => loadNotificationDetail,
  [CHECK_NOTIFICATION_UPDATE]: () => checkNotificationUpdate,
};

export default MemoryMapping;
