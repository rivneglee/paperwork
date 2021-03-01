import PrettyUI from './DashboardPage';
import SimpleUI from './_DashboardPage';
import getProfile from '../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : SimpleUI;