import PrettyUI from './ReportDetailPage';
import getProfile from '../../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : PrettyUI;

export * from './ReportDetailPage';
