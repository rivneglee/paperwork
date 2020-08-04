import PrettyUI from './ReportListPage';
import LiteUI from './_ReportListPage';
import getProfile from '../../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : LiteUI;

export * from './ReportListPage';
