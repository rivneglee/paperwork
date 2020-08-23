import PrettyUI from './ReportDetailPage';
import LiteUI from './_ReportDetailPage';
import getProfile from '../../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : LiteUI;

export * from './ReportDetailPage';
