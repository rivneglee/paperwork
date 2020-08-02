import PrettyUI from './NotificationListPage';
import SimpleUI from './_NotificationListPage';
import getProfile from '../../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : SimpleUI;

export * from './NotificationListPage';
